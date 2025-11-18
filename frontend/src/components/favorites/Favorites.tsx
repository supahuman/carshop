"use client";

import { useState, useEffect } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useGetCarsQuery } from "@/redux/carsApi";
import FavoritesCarItem from "./FavoritesCarItem";
import Link from "next/link";

export default function FavoritesClient() {
  const [favIds, setFavIds] = useLocalStorage<string[]>("favorites", []);
  const [mounted, setMounted] = useState(false);

  // Fetch all cars to filter favorites
  const { data: allCars, isLoading } = useGetCarsQuery();

  useEffect(() => {
    setMounted(true);
  }, []);

  const removeFavorite = (id: string) => {
    setFavIds((prev) => prev.filter((favId) => favId !== id));
  };

  const clearAllFavorites = () => {
    if (confirm("Are you sure you want to remove all favorites?")) {
      setFavIds([]);
    }
  };

  if (!mounted) {
    return <p>Loading favorites...</p>;
  }

  if (favIds.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-600 mb-4">No favorite cars yet.</p>
        <Link href="/" className="text-blue-600 hover:underline">
          Browse cars to add favorites
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return <p>Loading cars...</p>;
  }

  // Filter cars that are in favorites
  const favoriteCars = allCars?.filter((car) => favIds.includes(car.id)) || [];

  // Calculate total value
  const totalValue = favoriteCars.reduce((sum, car) => sum + car.price, 0);

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <div className="text-lg">
          <span className="font-semibold">{favIds.length}</span> favorite
          {favIds.length !== 1 ? "s" : ""}
          <span className="ml-4 text-gray-600">
            Total Value:{" "}
            <span className="font-semibold">
              ${totalValue.toLocaleString()}
            </span>
          </span>
        </div>
        <button
          onClick={clearAllFavorites}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Clear All
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {favoriteCars.map((car) => (
          <FavoritesCarItem key={car.id} car={car} onRemove={removeFavorite} />
        ))}
      </div>
    </div>
  );
}
