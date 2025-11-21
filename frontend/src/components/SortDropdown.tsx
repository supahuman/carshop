"use client";

import React from "react";

type SortOption = {
  label: string;
  sortBy: "price" | "year" | "mileage";
  order: "asc" | "desc";
};

const sortOptions: SortOption[] = [
  { label: "Price: Low to High", sortBy: "price", order: "asc" },
  { label: "Price: High to Low", sortBy: "price", order: "desc" },
  { label: "Year: Newest First", sortBy: "year", order: "desc" },
  { label: "Year: Oldest First", sortBy: "year", order: "asc" },
  { label: "Mileage: Low to High", sortBy: "mileage", order: "asc" },
  { label: "Mileage: High to Low", sortBy: "mileage", order: "desc" },
];

interface SortDropdownProps {
  value?: { sortBy?: string; order?: string };
  onChange: (sortBy: string, order: string) => void;
}

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  const currentValue = `${value?.sortBy || ""}-${value?.order || ""}`;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [sortBy, order] = e.target.value.split("-");
    onChange(sortBy, order);
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort" className="text-sm font-medium">
        Sort by:
      </label>
      <select
        id="sort"
        value={currentValue}
        onChange={handleChange}
        className="border rounded px-3 py-1"
      >
        <option value="">Default</option>
        {sortOptions.map((option) => (
          <option
            key={`${option.sortBy}-${option.order}`}
            value={`${option.sortBy}-${option.order}`}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
