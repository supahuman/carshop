// app/favorites/page.tsx
import Favorites from "@/components/favorites/Favorites";

export default function FavoritesPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-linear-to-br from-blue-500 via-purple-600 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-6xl mb-4">❤️</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Your Favorite Cars
          </h1>
          <p className="text-xl text-orange-100 max-w-2xl mx-auto">
            Keep track of the cars you love and easily compare your options.
          </p>
        </div>
      </section>

      {/* Favorites Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Favorites />
        </div>
      </section>
    </main>
  );
}
