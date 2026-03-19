import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Oil Supply Intelligence | World Energy Map & Price Predictor',
  description: 'Real-time global oil supply chain visualization, geopolitical risk analysis, and AI-powered price predictions.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-oil-dark text-slate-200 antialiased">
        {children}
      </body>
    </html>
  );
}
