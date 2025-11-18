"use client";

import React from "react";
import { CarFilters as CarFiltersType } from "@/types";

interface CarFiltersProps {
  filters: CarFiltersType;
  onFilterChange: (filters: CarFiltersType) => void;
  onReset: () => void;
}

export default function CarFilters({
  filters,
  onFilterChange,
  onReset,
}: CarFiltersProps) {
  const handleChange = (key: keyof CarFiltersType, value: string) => {
    const numValue = value ? Number(value) : undefined;
    onFilterChange({ ...filters, [key]: numValue });
  };

  const handleTextChange = (key: keyof CarFiltersType, value: string) => {
    onFilterChange({ ...filters, [key]: value || undefined });
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg mb-6 space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Filters</h3>
        <button
          onClick={onReset}
          className="text-sm text-blue-600 hover:underline"
        >
          Reset All
        </button>
      </div>

      {/* Make and Model */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Make</label>
          <input
            type="text"
            value={filters.make || ""}
            onChange={(e) => handleTextChange("make", e.target.value)}
            placeholder="e.g., Toyota"
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Model</label>
          <input
            type="text"
            value={filters.model || ""}
            onChange={(e) => handleTextChange("model", e.target.value)}
            placeholder="e.g., Camry"
            className="w-full border rounded px-3 py-2"
          />
        </div>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-sm font-medium mb-2">Price Range</label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="number"
              value={filters.minPrice || ""}
              onChange={(e) => handleChange("minPrice", e.target.value)}
              placeholder="Min"
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <input
              type="number"
              value={filters.maxPrice || ""}
              onChange={(e) => handleChange("maxPrice", e.target.value)}
              placeholder="Max"
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>
      </div>

      {/* Year Range */}
      <div>
        <label className="block text-sm font-medium mb-2">Year Range</label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="number"
              value={filters.minYear || ""}
              onChange={(e) => handleChange("minYear", e.target.value)}
              placeholder="Min Year"
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <input
              type="number"
              value={filters.maxYear || ""}
              onChange={(e) => handleChange("maxYear", e.target.value)}
              placeholder="Max Year"
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>
      </div>

      {/* Mileage Range */}
      <div>
        <label className="block text-sm font-medium mb-2">Mileage Range</label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="number"
              value={filters.minMileage || ""}
              onChange={(e) => handleChange("minMileage", e.target.value)}
              placeholder="Min Miles"
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <input
              type="number"
              value={filters.maxMileage || ""}
              onChange={(e) => handleChange("maxMileage", e.target.value)}
              placeholder="Max Miles"
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
