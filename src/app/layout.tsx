import './globals.css';
import SessionAuthProvider from '../context/SessionAuthProvider';
import ReactQueryProvider from '@/lib/query-provider';
import { Toaster } from 'react-hot-toast';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="">
        <SessionAuthProvider>
          <ReactQueryProvider>
            <Toaster position="top-right" reverseOrder={false} />
            {children}
          </ReactQueryProvider>
        </SessionAuthProvider>
      </body>
    </html>
  );
}
