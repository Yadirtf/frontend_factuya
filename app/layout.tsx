import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import ReactQueryProvider from '@/lib/providers/react-query.provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FacturaYa - SaaS de Facturación',
  description: 'Sistema integral de facturación electrónica validada por la DIAN Colombia',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <ReactQueryProvider>
          {children}
          <Toaster position="top-right" richColors />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
