// frontend/src/components/CarList.tsx
"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import useDebounce from "../hooks/useDebounce";
import useLocalStorage from "../hooks/useLocalStorage";
import { useGetCarsQuery, Car } from "../redux/carsApi";

export default function CarList() {
  const [make, setMake] = React.useState("");
  const debouncedMake = useDebounce(make, 400);

  // favorites stored as Set of ids persisted to localStorage
  const [favIds, setFavIds] = useLocalStorage<string[]>("favorites", []);
  const favSet = useMemo(() => new Set(favIds), [favIds]);

  // RTK Query call uses the debounced value
  const {
    data: cars,
    isLoading,
    error,
    refetch,
  } = useGetCarsQuery(debouncedMake ? { make: debouncedMake } : undefined);

  const toggleFavorite = (id: string) => {
    setFavIds((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Cars</h2>

      <div className="mb-4 flex gap-2 items-center">
        <input
          value={make}
          onChange={(e) => setMake(e.target.value)}
          placeholder="Filter by make (debounced)"
          className="border p-2"
        />
        <button
          onClick={() => refetch()}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Search
        </button>
        <div className="ml-auto">
          <strong>Favorites:</strong> {favIds.length}
        </div>
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading cars.</p>}

      <ul>
        {cars?.map((c: Car) => {
          const isFav = favSet.has(c.id);
          return (
            <li
              key={c.id}
              className="mb-2 border-b pb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <Link
                  href={`/cars/${c.id}`}
                  className="font-bold text-blue-600"
                >
                  {c.make} {c.model} ({c.year})
                </Link>
                <div className="text-sm text-gray-600">
                  ${c.price.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500">{c.description}</div>
              </div>

              <div className="mt-2 sm:mt-0 flex gap-2 items-center">
                <button
                  onClick={() => toggleFavorite(c.id)}
                  className={`px-3 py-1 rounded ${
                    isFav ? "bg-yellow-400" : "bg-gray-200"
                  }`}
                  aria-pressed={isFav}
                >
                  {isFav ? "★ Favorited" : "☆ Favorite"}
                </button>

                <Link
                  href={`/cars/${c.id}`}
                  className="px-3 py-1 rounded bg-green-500 text-white"
                >
                  View
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
