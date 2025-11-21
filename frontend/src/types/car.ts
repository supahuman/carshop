export type Car = {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  color?: string;
  description?: string;
};

export type CarFilters = {
  make?: string;
  model?: string;
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
  minMileage?: number;
  maxMileage?: number;
  sortBy?: "price" | "year" | "mileage";
  order?: "asc" | "desc";
  page?: number;
  limit?: number;
};

export type CarsResponse = {
  cars: Car[];
  total: number;
};
