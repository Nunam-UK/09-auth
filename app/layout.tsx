import { Toaster } from 'react-hot-toast';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import AuthProvider from '@/components/AuthProvider/AuthProvider';
import './globals.css';

export default function RootLayout({
  children,
  modal
}: {
  children: React.ReactNode;
  modal?: React.ReactNode; 
}) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <AuthProvider>
            <Header />
            <main>{children}</main>
            {modal}
            <Footer />
            <Toaster position="top-right" reverseOrder={false} />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}