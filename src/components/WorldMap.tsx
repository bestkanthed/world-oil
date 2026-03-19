'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import maplibregl from 'maplibre-gl';
import { refineries } from '@/data/refineries';
import { oilFields } from '@/data/oil-fields';
import { tradeFlows } from '@/data/trade-flows';
import { newsEvents } from '@/data/news-events';

function createArc(
  start: [number, number],
  end: [number, number],
  numPoints = 64
): [number, number][] {
  const points: [number, number][] = [];

  // Handle date line crossing
  let endLng = end[0];
  if (Math.abs(start[0] - end[0]) > 180) {
    endLng = end[0] > 0 ? end[0] - 360 : end[0] + 360;
  }

  const midLng = (start[0] + endLng) / 2;
  const midLat = (start[1] + end[1]) / 2;

  const dx = endLng - start[0];
  const dy = end[1] - start[1];
  const distance = Math.sqrt(dx * dx + dy * dy);
  const curveHeight = Math.min(distance * 0.15, 15);

  const angle = Math.atan2(dy, dx);
  const controlLng = midLng - Math.sin(angle) * curveHeight;
  const controlLat = midLat + Math.cos(angle) * curveHeight;

  for (let i = 0; i <= numPoints; i++) {
    const t = i / numPoints;
    const lng = (1 - t) * (1 - t) * start[0] + 2 * (1 - t) * t * controlLng + t * t * endLng;
    const lat = (1 - t) * (1 - t) * start[1] + 2 * (1 - t) * t * controlLat + t * t * end[1];
    points.push([lng, lat]);
  }

  return points;
}

interface MapTooltipData {
  type: 'refinery' | 'field' | 'event';
  name: string;
  details: Record<string, string>;
}

export default function WorldMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const animationRef = useRef<number>(0);
  const [tooltip, setTooltip] = useState<MapTooltipData | null>(null);
  const [selectedLayer, setSelectedLayer] = useState({
    refineries: true,
    oilFields: true,
    tradeFlows: true,
    conflicts: true,
  });

  const initMap = useCallback(() => {
    if (!mapContainer.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
      center: [40, 20],
      zoom: 2.3,
      minZoom: 1.5,
      maxZoom: 12,
      attributionControl: false,
    });

    mapRef.current = map;

    map.on('load', () => {
      addRefineryLayers(map);
      addOilFieldLayers(map);
      addTradeFlowLayers(map);
      addConflictLayers(map);
      startFlowAnimation(map);
      addInteractions(map);
    });
  }, []);

  function addRefineryLayers(map: maplibregl.Map) {
    map.addSource('refineries', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: refineries.map((r) => ({
          type: 'Feature' as const,
          geometry: { type: 'Point' as const, coordinates: [r.lng, r.lat] },
          properties: {
            name: r.name,
            company: r.company,
            country: r.country,
            capacity: r.capacity,
            capacityStr: `${(r.capacity / 1000).toFixed(0)}K bpd`,
            region: r.region,
          },
        })),
      },
    });

    // Outer glow
    map.addLayer({
      id: 'refineries-glow',
      type: 'circle',
      source: 'refineries',
      paint: {
        'circle-radius': [
          'interpolate', ['linear'], ['get', 'capacity'],
          100000, 10,
          600000, 18,
          1300000, 28,
        ],
        'circle-color': '#ff6b35',
        'circle-opacity': 0.15,
        'circle-blur': 1,
      },
    });

    // Core dot
    map.addLayer({
      id: 'refineries-core',
      type: 'circle',
      source: 'refineries',
      paint: {
        'circle-radius': [
          'interpolate', ['linear'], ['get', 'capacity'],
          100000, 3,
          600000, 6,
          1300000, 10,
        ],
        'circle-color': '#ff6b35',
        'circle-opacity': 0.9,
        'circle-stroke-width': 1,
        'circle-stroke-color': '#ff9b6b',
        'circle-stroke-opacity': 0.6,
      },
    });

    // Labels at higher zoom
    map.addLayer({
      id: 'refineries-labels',
      type: 'symbol',
      source: 'refineries',
      minzoom: 5,
      layout: {
        'text-field': ['get', 'name'],
        'text-size': 11,
        'text-offset': [0, 1.5],
        'text-anchor': 'top',
        'text-max-width': 12,
      },
      paint: {
        'text-color': '#ff9b6b',
        'text-halo-color': '#0a0e17',
        'text-halo-width': 2,
      },
    });
  }

  function addOilFieldLayers(map: maplibregl.Map) {
    map.addSource('oil-fields', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: oilFields.map((f) => ({
          type: 'Feature' as const,
          geometry: { type: 'Point' as const, coordinates: [f.lng, f.lat] },
          properties: {
            name: f.name,
            country: f.country,
            production: f.production,
            productionStr: `${(f.production / 1000000).toFixed(1)}M bpd`,
            type: f.type,
            reserves: `${f.reserves}B bbl`,
          },
        })),
      },
    });

    map.addLayer({
      id: 'fields-glow',
      type: 'circle',
      source: 'oil-fields',
      paint: {
        'circle-radius': [
          'interpolate', ['linear'], ['get', 'production'],
          100000, 8,
          1000000, 15,
          6200000, 30,
        ],
        'circle-color': [
          'match', ['get', 'type'],
          'onshore', '#00ff88',
          'offshore', '#06b6d4',
          'deepwater', '#3b82f6',
          '#00ff88',
        ],
        'circle-opacity': 0.12,
        'circle-blur': 1,
      },
    });

    map.addLayer({
      id: 'fields-core',
      type: 'circle',
      source: 'oil-fields',
      paint: {
        'circle-radius': [
          'interpolate', ['linear'], ['get', 'production'],
          100000, 2.5,
          1000000, 5,
          6200000, 9,
        ],
        'circle-color': [
          'match', ['get', 'type'],
          'onshore', '#00ff88',
          'offshore', '#06b6d4',
          'deepwater', '#3b82f6',
          '#00ff88',
        ],
        'circle-opacity': 0.85,
        'circle-stroke-width': 1,
        'circle-stroke-color': 'rgba(255,255,255,0.3)',
      },
    });

    map.addLayer({
      id: 'fields-labels',
      type: 'symbol',
      source: 'oil-fields',
      minzoom: 4,
      layout: {
        'text-field': ['get', 'name'],
        'text-size': 11,
        'text-offset': [0, 1.5],
        'text-anchor': 'top',
        'text-max-width': 12,
      },
      paint: {
        'text-color': '#86efac',
        'text-halo-color': '#0a0e17',
        'text-halo-width': 2,
      },
    });
  }

  function addTradeFlowLayers(map: maplibregl.Map) {
    // Create arc geometries
    const flowFeatures = tradeFlows.map((flow) => {
      const arc = createArc(
        [flow.source.lng, flow.source.lat],
        [flow.dest.lng, flow.dest.lat]
      );
      return {
        type: 'Feature' as const,
        geometry: {
          type: 'LineString' as const,
          coordinates: arc,
        },
        properties: {
          id: flow.id,
          source: flow.source.name,
          dest: flow.dest.name,
          volume: flow.volume,
          commodity: flow.commodity,
        },
      };
    });

    map.addSource('trade-flows', {
      type: 'geojson',
      data: { type: 'FeatureCollection', features: flowFeatures },
    });

    // Flow lines - base
    map.addLayer({
      id: 'flows-base',
      type: 'line',
      source: 'trade-flows',
      paint: {
        'line-color': [
          'match', ['get', 'commodity'],
          'crude', '#fbbf24',
          'refined', '#fb923c',
          'lng', '#22d3ee',
          '#fbbf24',
        ],
        'line-width': [
          'interpolate', ['linear'], ['get', 'volume'],
          200, 0.5,
          1000, 1.5,
          4000, 3,
        ],
        'line-opacity': 0.25,
      },
    });

    // Animated dots source (will be updated each frame)
    map.addSource('flow-dots', {
      type: 'geojson',
      data: { type: 'FeatureCollection', features: [] },
    });

    map.addLayer({
      id: 'flow-dots-glow',
      type: 'circle',
      source: 'flow-dots',
      paint: {
        'circle-radius': [
          'interpolate', ['linear'], ['get', 'volume'],
          200, 4,
          1000, 6,
          4000, 9,
        ],
        'circle-color': [
          'match', ['get', 'commodity'],
          'crude', '#fbbf24',
          'refined', '#fb923c',
          'lng', '#22d3ee',
          '#fbbf24',
        ],
        'circle-opacity': 0.3,
        'circle-blur': 1,
      },
    });

    map.addLayer({
      id: 'flow-dots-core',
      type: 'circle',
      source: 'flow-dots',
      paint: {
        'circle-radius': [
          'interpolate', ['linear'], ['get', 'volume'],
          200, 2,
          1000, 3,
          4000, 4.5,
        ],
        'circle-color': [
          'match', ['get', 'commodity'],
          'crude', '#fbbf24',
          'refined', '#fb923c',
          'lng', '#22d3ee',
          '#fbbf24',
        ],
        'circle-opacity': 0.9,
      },
    });
  }

  function addConflictLayers(map: maplibregl.Map) {
    const conflictEvents = newsEvents.filter(
      (e) => (e.category === 'conflict' || e.category === 'geopolitical') && e.lat && e.lng
    );

    map.addSource('conflicts', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: conflictEvents.map((e) => ({
          type: 'Feature' as const,
          geometry: { type: 'Point' as const, coordinates: [e.lng!, e.lat!] },
          properties: {
            title: e.title,
            severity: e.severity,
            impact: e.impact,
            summary: e.summary,
          },
        })),
      },
    });

    // Pulsing outer ring
    map.addLayer({
      id: 'conflicts-pulse',
      type: 'circle',
      source: 'conflicts',
      paint: {
        'circle-radius': [
          'interpolate', ['linear'], ['get', 'severity'],
          1, 15, 5, 35,
        ],
        'circle-color': '#ff3366',
        'circle-opacity': 0.08,
        'circle-blur': 1,
      },
    });

    // Inner ring
    map.addLayer({
      id: 'conflicts-inner',
      type: 'circle',
      source: 'conflicts',
      paint: {
        'circle-radius': [
          'interpolate', ['linear'], ['get', 'severity'],
          1, 6, 5, 12,
        ],
        'circle-color': '#ff3366',
        'circle-opacity': 0.4,
        'circle-stroke-width': 2,
        'circle-stroke-color': '#ff3366',
        'circle-stroke-opacity': 0.6,
      },
    });

    // Conflict icon/marker
    map.addLayer({
      id: 'conflicts-core',
      type: 'circle',
      source: 'conflicts',
      paint: {
        'circle-radius': 4,
        'circle-color': '#ff3366',
        'circle-opacity': 1,
      },
    });
  }

  function startFlowAnimation(map: maplibregl.Map) {
    // Pre-compute arcs for each flow
    const flowArcs = tradeFlows.map((flow) => ({
      arc: createArc(
        [flow.source.lng, flow.source.lat],
        [flow.dest.lng, flow.dest.lat],
        80
      ),
      volume: flow.volume,
      commodity: flow.commodity,
      // Create multiple dots per flow, spaced evenly
      dots: Array.from({ length: Math.max(2, Math.floor(flow.volume / 400)) }, (_, j) => ({
        progress: j / Math.max(2, Math.floor(flow.volume / 400)),
      })),
    }));

    const speed = 0.003;

    function animate() {
      const features: GeoJSON.Feature[] = [];

      flowArcs.forEach((flow) => {
        flow.dots.forEach((dot) => {
          dot.progress = (dot.progress + speed) % 1;
          const arcIndex = Math.min(
            Math.floor(dot.progress * (flow.arc.length - 1)),
            flow.arc.length - 1
          );
          const pos = flow.arc[arcIndex];
          if (pos) {
            features.push({
              type: 'Feature',
              geometry: { type: 'Point', coordinates: pos },
              properties: { volume: flow.volume, commodity: flow.commodity },
            });
          }
        });
      });

      const source = map.getSource('flow-dots') as maplibregl.GeoJSONSource;
      if (source) {
        source.setData({ type: 'FeatureCollection', features });
      }

      // Animate conflict pulse
      const pulseRadius = 15 + Math.sin(Date.now() / 500) * 8;
      if (map.getLayer('conflicts-pulse')) {
        map.setPaintProperty('conflicts-pulse', 'circle-radius', [
          'interpolate', ['linear'], ['get', 'severity'],
          1, pulseRadius, 5, pulseRadius * 2,
        ]);
        map.setPaintProperty('conflicts-pulse', 'circle-opacity', 0.05 + Math.sin(Date.now() / 600) * 0.05);
      }

      animationRef.current = requestAnimationFrame(animate);
    }

    animate();
  }

  function addInteractions(map: maplibregl.Map) {
    // Refinery hover
    map.on('mouseenter', 'refineries-core', (e) => {
      map.getCanvas().style.cursor = 'pointer';
      if (e.features?.[0]) {
        const p = e.features[0].properties!;
        const popup = new maplibregl.Popup({ closeButton: false, offset: 15 })
          .setLngLat(e.lngLat)
          .setHTML(`
            <div style="font-family: Inter, sans-serif;">
              <div style="font-weight: 700; color: #ff6b35; font-size: 14px; margin-bottom: 4px;">
                ${p.name}
              </div>
              <div style="color: #94a3b8; font-size: 12px; margin-bottom: 6px;">${p.company} — ${p.country}</div>
              <div style="display: flex; align-items: center; gap: 6px;">
                <span style="color: #fbbf24; font-weight: 600; font-size: 16px;">${p.capacityStr}</span>
                <span style="color: #64748b; font-size: 11px;">capacity</span>
              </div>
            </div>
          `)
          .addTo(map);

        map.once('mouseleave', 'refineries-core', () => {
          popup.remove();
          map.getCanvas().style.cursor = '';
        });
      }
    });

    // Oil field hover
    map.on('mouseenter', 'fields-core', (e) => {
      map.getCanvas().style.cursor = 'pointer';
      if (e.features?.[0]) {
        const p = e.features[0].properties!;
        const typeColor = p.type === 'onshore' ? '#00ff88' : p.type === 'offshore' ? '#06b6d4' : '#3b82f6';
        const popup = new maplibregl.Popup({ closeButton: false, offset: 15 })
          .setLngLat(e.lngLat)
          .setHTML(`
            <div style="font-family: Inter, sans-serif;">
              <div style="font-weight: 700; color: ${typeColor}; font-size: 14px; margin-bottom: 4px;">
                ${p.name}
              </div>
              <div style="color: #94a3b8; font-size: 12px; margin-bottom: 6px;">
                ${p.country} — <span style="text-transform: uppercase; color: ${typeColor};">${p.type}</span>
              </div>
              <div style="display: flex; gap: 16px;">
                <div>
                  <span style="color: #fbbf24; font-weight: 600; font-size: 16px;">${p.productionStr}</span>
                  <span style="color: #64748b; font-size: 11px;"> production</span>
                </div>
                <div>
                  <span style="color: #fb923c; font-weight: 600; font-size: 14px;">${p.reserves}</span>
                  <span style="color: #64748b; font-size: 11px;"> reserves</span>
                </div>
              </div>
            </div>
          `)
          .addTo(map);

        map.once('mouseleave', 'fields-core', () => {
          popup.remove();
          map.getCanvas().style.cursor = '';
        });
      }
    });

    // Conflict hover
    map.on('mouseenter', 'conflicts-core', (e) => {
      map.getCanvas().style.cursor = 'pointer';
      if (e.features?.[0]) {
        const p = e.features[0].properties!;
        const popup = new maplibregl.Popup({ closeButton: true, offset: 15, maxWidth: '350px' })
          .setLngLat(e.lngLat)
          .setHTML(`
            <div style="font-family: Inter, sans-serif;">
              <div style="font-weight: 700; color: #ff3366; font-size: 14px; margin-bottom: 6px;">
                ${p.title}
              </div>
              <div style="color: #cbd5e1; font-size: 12px; line-height: 1.5; margin-bottom: 8px;">
                ${p.summary}
              </div>
              <div style="display: flex; gap: 8px; align-items: center;">
                <span style="background: #ff3366; color: white; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 600;">
                  SEVERITY ${p.severity}/5
                </span>
              </div>
            </div>
          `)
          .addTo(map);
      }
    });

    // Trade flow hover
    map.on('mouseenter', 'flows-base', (e) => {
      map.getCanvas().style.cursor = 'pointer';
      if (e.features?.[0]) {
        const p = e.features[0].properties!;
        const commodityColor = p.commodity === 'crude' ? '#fbbf24' : p.commodity === 'lng' ? '#22d3ee' : '#fb923c';
        const popup = new maplibregl.Popup({ closeButton: false, offset: 15 })
          .setLngLat(e.lngLat)
          .setHTML(`
            <div style="font-family: Inter, sans-serif;">
              <div style="font-weight: 600; color: ${commodityColor}; font-size: 13px; margin-bottom: 4px;">
                ${p.source} → ${p.dest}
              </div>
              <div style="display: flex; gap: 10px; align-items: center;">
                <span style="color: #e2e8f0; font-weight: 700; font-size: 16px;">${p.volume}K</span>
                <span style="color: #64748b; font-size: 11px;">bpd</span>
                <span style="text-transform: uppercase; color: ${commodityColor}; font-size: 10px; font-weight: 600; border: 1px solid ${commodityColor}; padding: 1px 6px; border-radius: 3px;">${p.commodity}</span>
              </div>
            </div>
          `)
          .addTo(map);

        map.once('mouseleave', 'flows-base', () => {
          popup.remove();
          map.getCanvas().style.cursor = '';
        });
      }
    });
  }

  useEffect(() => {
    initMap();
    return () => {
      cancelAnimationFrame(animationRef.current);
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [initMap]);

  // Layer toggle
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.isStyleLoaded()) return;

    const toggle = (layers: string[], visible: boolean) => {
      layers.forEach((l) => {
        if (map.getLayer(l)) {
          map.setLayoutProperty(l, 'visibility', visible ? 'visible' : 'none');
        }
      });
    };

    toggle(['refineries-glow', 'refineries-core', 'refineries-labels'], selectedLayer.refineries);
    toggle(['fields-glow', 'fields-core', 'fields-labels'], selectedLayer.oilFields);
    toggle(['flows-base', 'flow-dots-glow', 'flow-dots-core'], selectedLayer.tradeFlows);
    toggle(['conflicts-pulse', 'conflicts-inner', 'conflicts-core'], selectedLayer.conflicts);
  }, [selectedLayer]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute inset-0" />

      {/* Layer controls */}
      <div className="absolute top-4 left-4 glass-panel p-3 z-10">
        <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-2 font-semibold">Layers</div>
        {[
          { key: 'refineries' as const, label: 'Refineries', color: '#ff6b35' },
          { key: 'oilFields' as const, label: 'Oil Fields', color: '#00ff88' },
          { key: 'tradeFlows' as const, label: 'Trade Flows', color: '#fbbf24' },
          { key: 'conflicts' as const, label: 'Conflicts', color: '#ff3366' },
        ].map((item) => (
          <label key={item.key} className="flex items-center gap-2 cursor-pointer py-1 text-xs hover:bg-white/5 px-1 rounded">
            <input
              type="checkbox"
              checked={selectedLayer[item.key]}
              onChange={() => setSelectedLayer((s) => ({ ...s, [item.key]: !s[item.key] }))}
              className="sr-only"
            />
            <span
              className="w-3 h-3 rounded-sm border transition-colors"
              style={{
                backgroundColor: selectedLayer[item.key] ? item.color : 'transparent',
                borderColor: item.color,
                opacity: selectedLayer[item.key] ? 1 : 0.4,
              }}
            />
            <span className={selectedLayer[item.key] ? 'text-slate-200' : 'text-slate-500'}>
              {item.label}
            </span>
          </label>
        ))}
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 glass-panel p-3 z-10 text-[11px]">
        <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-2 font-semibold">Legend</div>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-oil-amber" />
            <span className="text-slate-400">Refineries</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-oil-green" />
            <span className="text-slate-400">Onshore Fields</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-oil-cyan" />
            <span className="text-slate-400">Offshore Fields</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-oil-blue" />
            <span className="text-slate-400">Deepwater Fields</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-0.5 bg-oil-gold rounded" />
            <span className="text-slate-400">Crude Flow</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-0.5 bg-cyan-400 rounded" />
            <span className="text-slate-400">LNG Flow</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-oil-red" />
            <span className="text-slate-400">Conflict Zone</span>
          </div>
        </div>
      </div>

      {/* Stats overlay */}
      <div className="absolute top-4 right-[340px] glass-panel px-3 py-2 z-10 text-[11px] flex gap-4">
        <div>
          <span className="text-slate-500">Refineries</span>
          <span className="ml-1.5 text-oil-amber font-bold">{refineries.length}</span>
        </div>
        <div>
          <span className="text-slate-500">Oil Fields</span>
          <span className="ml-1.5 text-oil-green font-bold">{oilFields.length}</span>
        </div>
        <div>
          <span className="text-slate-500">Trade Routes</span>
          <span className="ml-1.5 text-oil-gold font-bold">{tradeFlows.length}</span>
        </div>
      </div>
    </div>
  );
}
