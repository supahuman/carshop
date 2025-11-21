"use client";

import useLocalStorage from "@/hooks/useLocalStorage";
import { useGetCarsQuery } from "@/redux/carApi";
import FavoritesCarItem from "./FavoritesCarItem";
import Link from "next/link";

export default function Favorites() {
  const [favIds, setFavIds] = useLocalStorage<string[]>("favorites", []);

  // Fetch all cars to filter favorites
  const { data: allCars, isLoading } = useGetCarsQuery();

  const removeFavorite = (id: string) => {
    setFavIds((prev) => prev.filter((favId) => favId !== id));
  };

  const clearAllFavorites = () => {
    if (confirm("Are you sure you want to remove all favorites?")) {
      setFavIds([]);
    }
  };

  if (favIds.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">❤️</div>
        <p className="text-xl text-gray-600 mb-4">No favorite cars yet.</p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Browse Cars
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Filter cars that are in favorites
  const favoriteCars =
    allCars?.cars?.filter((car) => favIds.includes(car.id)) || [];

  // Calculate total value
  const totalValue = favoriteCars.reduce(
    (sum: number, car) => sum + car.price,
    0
  );

  return (
    <div>
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex justify-between items-center">
          <div className="text-lg">
            <span className="font-semibold text-gray-900">{favIds.length}</span>{" "}
            favorite{favIds.length !== 1 ? "s" : ""}
            <span className="ml-4 text-gray-600">
              Total Value:{" "}
              <span className="font-semibold text-green-600">
                ${totalValue.toLocaleString()}
              </span>
            </span>
          </div>
          <button
            onClick={clearAllFavorites}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
          >
            Clear All
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {favoriteCars.map((car) => (
          <FavoritesCarItem key={car.id} car={car} onRemove={removeFavorite} />
        ))}
      </div>
    </div>
  );
}
