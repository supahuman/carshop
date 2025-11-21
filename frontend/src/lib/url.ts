// src/lib/url.ts
import { CarFilters } from "@/types";

const stringFields = ["make", "model", "sortBy", "order"] as const;
const numericFields = [
  "minPrice",
  "maxPrice",
  "minYear",
  "maxYear",
  "minMileage",
  "maxMileage",
  "page",
  "limit",
] as const;

export const parseFiltersFromURL = (
  searchParams: URLSearchParams
): CarFilters => {
  const filters: Record<string, string | number> = {};

  stringFields.forEach((key) => {
    const value = searchParams.get(key);
    if (value) filters[key] = value;
  });

  numericFields.forEach((key) => {
    const value = searchParams.get(key);
    if (value) filters[key] = Number(value);
  });

  return filters as CarFilters;
};
