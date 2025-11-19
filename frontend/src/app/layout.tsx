// app/layout.tsx
// import '@/globals.css';
import { ReduxProvider } from "../provider/ReduxProvider";
import Link from "next/link";

export const metadata = { title: "CarShop", description: "Car shopping app" };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav className="flex gap-4">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/favorites" className="hover:underline">
            Favorites
          </Link>
          <Link href="/appointments" className="hover:underline">
            Appointments
          </Link>
        </nav>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
