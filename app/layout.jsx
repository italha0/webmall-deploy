import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Webmall - Best Deals on Electronics, Fashion & More",
  description:
    "Shop the latest electronics, fashion, home & kitchen products at unbeatable prices. Free delivery, easy returns, and 24/7 customer support.",
  keywords:
    "online shopping, electronics, fashion, deals, discounts, free delivery",
  openGraph: {
    title: "webmall - Your Trusted Shopping Destination",
    description:
      "Discover amazing deals on top brands with fast delivery and easy returns.",
    type: "website",
  },
  icons: {
    icon: "/favicon.png", // or .png, .svg
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="max-w-[100vw] overflow-x-hidden">
          <Header />
          <div className="container mx-auto px-2">
            <main>{children}</main>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
