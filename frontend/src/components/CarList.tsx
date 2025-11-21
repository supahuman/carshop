"use client";

import React, { useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import useDebounce from "../hooks/useDebounce";
import useLocalStorage from "../hooks/useLocalStorage";
import { useGetCarsQuery } from "../redux/carApi";
import { Car, CarFilters as CarFiltersType } from "@/types";
import CarFilters from "./CarFilters";
import SortDropdown from "./SortDropdown";
import Pagination from "./Pagination";
import { parseFiltersFromURL } from "@/lib/url";

export default function CarList() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize filters from URL
  const [filters, setFilters] = React.useState<CarFiltersType>(() => ({
    ...parseFiltersFromURL(searchParams),
    page: parseFiltersFromURL(searchParams).page || 1,
    limit: parseFiltersFromURL(searchParams).limit || 10,
  }));

  // Debounce filters for API calls
  const debouncedFilters = useDebounce(filters, 400);

  // favorites stored as Set of ids persisted to localStorage
  const [favIds, setFavIds] = useLocalStorage<string[]>("favorites", []);
  const favSet = useMemo(() => new Set(favIds), [favIds]);

  // Sync filters to URL
  useEffect(() => {
    const validEntries = Object.entries(filters)
      .filter(([, value]) => value !== undefined && value !== "")
      .map(([key, value]) => [key, String(value)]);

    const params = new URLSearchParams(validEntries);
    router.push(params.toString() ? `/?${params}` : "/", { scroll: false });
  }, [filters, router]);
  // RTK Query call uses the debounced filters
  const hasFilters = Object.values(debouncedFilters).some(
    (v) => v !== undefined
  );
  const { data, isLoading, error, refetch } = useGetCarsQuery(
    hasFilters ? debouncedFilters : undefined
  );

  const cars = data?.cars || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / (filters.limit || 10));

  const toggleFavorite = (id: string) => {
    setFavIds((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const handleFilterChange = (newFilters: CarFiltersType) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 1 })); // Reset to page 1 on filter change
  };

  const handleResetFilters = () => {
    setFilters({ page: 1, limit: 10 });
  };

  const handleSortChange = (sortBy: string, order: string) => {
    const sortByTyped = sortBy as "price" | "year" | "mileage";
    const orderTyped = order as "asc" | "desc";
    setFilters((prev) => ({
      ...prev,
      sortBy: sortByTyped,
      order: orderTyped,
      page: 1,
    }));
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  return (
    <div>
      {/* Header with controls */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Available Cars
            </h2>
            <p className="text-gray-600">
              Showing {cars.length} of {total} cars
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <SortDropdown
              value={{ sortBy: filters.sortBy, order: filters.order }}
              onChange={handleSortChange}
            />
            <button
              onClick={() => refetch()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <CarFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleResetFilters}
        />
      </div>

      {/* Loading/Error States */}
      {isLoading && (
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading cars...</p>
          </div>
        </div>
      )}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <div className="text-red-600 text-lg font-medium mb-2">
            Error loading cars
          </div>
          <p className="text-red-500">Please try again later.</p>
        </div>
      )}

      {/* Empty State */}
      {cars.length === 0 && !isLoading && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🚗</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            No cars found
          </h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your filters to see more results.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Car Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {cars.map((c: Car) => {
          const isFav = favSet.has(c.id);
          return (
            <div
              key={c.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-300 hover:-translate-y-1"
            >
              {/* Car Image Section */}
              <div className="relative h-56 bg-linear-to-br from-blue-400 via-purple-500 to-pink-500 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 left-4 w-20 h-20 bg-white rounded-full"></div>
                  <div className="absolute bottom-4 right-4 w-16 h-16 bg-white rounded-full"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white rounded-full"></div>
                </div>

                {/* Car Emoji */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-7xl group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">
                    🚗
                  </div>
                </div>

                {/* Favorite Badge */}
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => toggleFavorite(c.id)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg ${
                      isFav
                        ? "bg-yellow-400 hover:bg-yellow-500 text-yellow-900"
                        : "bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white"
                    }`}
                    aria-pressed={isFav}
                  >
                    <span className="text-lg">{isFav ? "★" : "☆"}</span>
                  </button>
                </div>

                {/* Year Badge */}
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium border border-white/20">
                  {c.year}
                </div>
              </div>

              {/* Car Details */}
              <div className="p-6 space-y-4">
                {/* Title and Price */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                      {c.make} {c.model}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {c.year} • {c.mileage.toLocaleString()} miles
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">
                      ${c.price.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">per day</div>
                  </div>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-4 py-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 text-sm">📏</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {c.mileage.toLocaleString()} miles
                      </div>
                      <div className="text-xs text-gray-500">Mileage</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span className="text-purple-600 text-sm">🏁</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {c.year}
                      </div>
                      <div className="text-xs text-gray-500">Year</div>
                    </div>
                  </div>

                  {c.color && (
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <span className="text-green-600 text-sm">🎨</span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {c.color}
                        </div>
                        <div className="text-xs text-gray-500">Color</div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                      <span className="text-orange-600 text-sm">💰</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        ${c.price.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">Price</div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                {c.description && (
                  <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                    {c.description}
                  </p>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-2">
                  <Link
                    href={`/cars/${c.id}`}
                    className="flex-1 bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl text-center"
                  >
                    Book Now
                  </Link>
                  <Link
                    href={`/cars/${c.id}`}
                    className="flex-1 border-2 border-gray-200 hover:border-blue-300 text-gray-700 hover:text-blue-600 font-semibold py-3 px-4 rounded-xl transition-all duration-200 hover:bg-blue-50 text-center"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={filters.page || 1}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
