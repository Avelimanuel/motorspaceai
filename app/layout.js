import { Inter } from "next/font/google";
import "./globals.css";
import HeaderComponent from "@/components/header";
import FooterComponent from "@/components/footer";
import { ClerkProvider } from "@clerk/nextjs";

const interFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Motorspace Car Market Place",
  description: "Discover & Drive Your Dream Car",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${interFont.variable} antialiased`}>
          <HeaderComponent />
          <main>{children}</main>
          <FooterComponent />
        </body>
      </html>
    </ClerkProvider>
  );
}
