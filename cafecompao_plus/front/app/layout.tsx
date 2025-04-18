import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Messages from '@/components/Messages';
import 'bootstrap-icons/font/bootstrap-icons.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Café com Pão',
  description: 'Assinatura de cestas para café da manhã',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br" data-theme="caramellatte">
      <head>
      </head>
      <body>
        <Header />
        <Messages />
        {children}
        <Footer />
      </body>
    </html>
  );
}
