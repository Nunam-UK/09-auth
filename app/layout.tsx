import type { Metadata } from "next";
import { Header } from "@/components/Header/Header";
import { AuthProvider } from "@/components/AuthProvider/AuthProvider";
import TanStackProvider from "@/components/Providers/TanStackProvider";
import "./globals.css"; 

export const metadata: Metadata = {
  title: "NoteHub",
  description: "Застосунок для ваших нотаток",
};

export default function RootLayout({
  children,
  modal, 
}: {
  children: React.ReactNode;
  modal: React.ReactNode; 
}) {
  return (
    <html lang="uk">
      <body>
        <TanStackProvider>
          <AuthProvider>
            <Header />
            <main>
              {children}
            </main>
            {modal} 
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}