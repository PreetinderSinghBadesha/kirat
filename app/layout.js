import { Kanit } from "next/font/google";
import "./globals.css";
import Sidebar from "./dashboard/components/side_bar";
import { TasksProvider } from "./dashboard/tasks_context";

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
        className={`${kanit.variable} antialiased bg-[#f6f6f6] flex flex-col sm:flex-row min-h-screen w-full overflow-x-hidden`}
      >
        <TasksProvider>
          <Sidebar />
          <main className="w-full min-w-0 flex-1">
            {children}
          </main>
        </TasksProvider>
      </body>
    </html>
  );
}
