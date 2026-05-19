import "./globals.css";
import { Toaster } from "react-hot-toast";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "SportNest",
  description:
    "Sports Facility Booking Platform",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body>

        <Navbar />

       
          <main>
          {children}
        </main>
        <Footer />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}