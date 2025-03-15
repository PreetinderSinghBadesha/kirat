import { Kanit } from "next/font/google";
import "./globals.css";
import Sidebar from "./dashboard/components/side_bar";

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-kanit",
});

export const metadata = {
  title: "Kirat",
  description: "App made to manage your tasks",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${kanit.variable} antialiased bg-[#f6f6f6] flex flex-col sm:flex-row h-screen w-screen overflow-x-hidden`}
      >
        <Sidebar />
        <main className="w-full sm:w-[70%] h-full">
          {children}
        </main>
      </body>
    </html>
  );
}
