"use client";

import React, { useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import useDebounce from "../hooks/useDebounce";
import useLocalStorage from "../hooks/useLocalStorage";
import { useGetCarsQuery } from "../redux/carsApi";
import { Car, CarFilters as CarFiltersType } from "@/types";
import CarFilters from "./CarFilters";
import { parseFiltersFromURL } from "@/lib/url";

export default function CarList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Initialize filters from URL
  const [filters, setFilters] = React.useState<CarFiltersType>(() =>
    parseFiltersFromURL(searchParams)
  );

  // Debounce filters for API calls
  const debouncedFilters = useDebounce(filters, 400);

  // favorites stored as Set of ids persisted to localStorage
  const [favIds, setFavIds] = useLocalStorage<string[]>("favorites", []);
  const favSet = useMemo(() => new Set(favIds), [favIds]);

  // Sync filters to URL
  useEffect(() => {
    const validEntries = Object.entries(filters)
      .filter(([_, value]) => value !== undefined && value !== "")
      .map(([key, value]) => [key, String(value)]);

    const params = new URLSearchParams(validEntries);
    router.push(params.toString() ? `/?${params}` : "/", { scroll: false });
  }, [filters, router]);
  // RTK Query call uses the debounced filters
  const hasFilters = Object.values(debouncedFilters).some(
    (v) => v !== undefined
  );
  const {
    data: cars,
    isLoading,
    error,
    refetch,
  } = useGetCarsQuery(hasFilters ? debouncedFilters : undefined);

  const toggleFavorite = (id: string) => {
    setFavIds((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const handleFilterChange = (newFilters: CarFiltersType) => {
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    setFilters({});
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Cars</h2>
        <div className="flex gap-4 items-center">
          <button
            onClick={() => refetch()}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Refresh
          </button>
        </div>
      </div>

      <CarFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
      />

      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-600">Error loading cars.</p>}

      {cars && cars.length === 0 && (
        <p className="text-center text-gray-600 py-8">
          No cars found matching your filters.
        </p>
      )}

      <ul className="space-y-4">
        {cars?.map((c: Car) => {
          const isFav = favSet.has(c.id);
          return (
            <li
              key={c.id}
              className="border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between hover:shadow-lg transition-shadow"
            >
              <div>
                <Link
                  href={`/cars/${c.id}`}
                  className="font-bold text-blue-600 hover:underline text-lg"
                >
                  {c.make} {c.model} ({c.year})
                </Link>
                <div className="text-xl font-semibold text-green-600 mt-1">
                  ${c.price.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {c.mileage.toLocaleString()} miles
                  {c.color && ` • ${c.color}`}
                </div>
                {c.description && (
                  <div className="text-sm text-gray-500 mt-2">
                    {c.description}
                  </div>
                )}
              </div>

              <div className="mt-4 sm:mt-0 flex gap-2 items-center">
                <button
                  onClick={() => toggleFavorite(c.id)}
                  className={`px-4 py-2 rounded transition-colors ${
                    isFav
                      ? "bg-yellow-400 hover:bg-yellow-500"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                  aria-pressed={isFav}
                >
                  {isFav ? "★ Favorited" : "☆ Favorite"}
                </button>

                <Link
                  href={`/cars/${c.id}`}
                  className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
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
