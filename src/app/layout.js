import "./globals.css";

import Navbar from "@/components/Navbar";

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
      </body>
    </html>
  );
}