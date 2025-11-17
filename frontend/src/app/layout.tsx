// app/layout.tsx
// import '@/globals.css';
import { ReduxProvider } from "../provider/ReduxProvider";

export const metadata = { title: "CarShop", description: "Car shopping app" };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
