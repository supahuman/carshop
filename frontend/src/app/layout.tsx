// app/layout.tsx
import "./globals.css";
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
      <body className="bg-gray-50 min-h-screen">
        <nav className="bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center">
                <Link href="/" className="flex items-center space-x-3 group">
                  <div className="w-10 h-10 bg-linear-to-br from-card-start to-card-end rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                    <span className="text-white text-xl">🚗</span>
                  </div>
                  <div>
                    <span className="text-2xl font-bold bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                      CarShop
                    </span>
                    <div className="text-xs text-gray-500 -mt-1">
                      Premium Vehicles
                    </div>
                  </div>
                </Link>
              </div>
              <div className="hidden md:flex items-center space-x-1">
                <Link
                  href="/"
                  className="relative px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium group"
                >
                  <span className="relative z-10">Home</span>
                  <div className="absolute inset-0 bg-linear-to-r from-card-start to-card-end rounded-lg opacity-0 group-hover:opacity-10 transition-opacity"></div>
                </Link>
                <Link
                  href="/favorites"
                  className="relative px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium group"
                >
                  <span className="relative z-10 flex items-center space-x-1">
                    <span>❤️</span>
                    <span>Favorites</span>
                  </span>
                  <div className="absolute inset-0 bg-linear-to-r from-card-start to-card-end rounded-lg opacity-0 group-hover:opacity-10 transition-opacity"></div>
                </Link>
                <Link
                  href="/appointments"
                  className="relative px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium group"
                >
                  <span className="relative z-10">Appointments</span>
                  <div className="absolute inset-0 bg-linear-to-r from-card-start to-card-end rounded-lg opacity-0 group-hover:opacity-10 transition-opacity"></div>
                </Link>
              </div>
              {/* Mobile menu button */}
              <div className="md:hidden">
                <button className="p-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </nav>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
