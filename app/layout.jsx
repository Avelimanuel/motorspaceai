import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Motorspace",
  description: "Drive Your Dream Vehicle",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.variable} antialiased`}>
          <Header />
          <main className="min-h-screen py-12">{children}</main>
          <footer className="bg-blue-50">
            <div className="container mx-auto px-4 text-center text-gray-600">
              <p className="text-red-600">Crafted By Webcrafters Kenya</p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
