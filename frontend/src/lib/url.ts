// src/lib/url.ts
import { CarFilters } from "@/types";

const stringFields = ["make", "model"] as const;
const numericFields = [
  "minPrice",
  "maxPrice",
  "minYear",
  "maxYear",
  "minMileage",
  "maxMileage",
] as const;

export const parseFiltersFromURL = (
  searchParams: URLSearchParams
): CarFilters => {
  const filters: CarFilters = {};

  stringFields.forEach((key) => {
    const value = searchParams.get(key);
    if (value) filters[key] = value;
  });

  numericFields.forEach((key) => {
    const value = searchParams.get(key);
    if (value) filters[key] = Number(value);
  });

  return filters;
};
