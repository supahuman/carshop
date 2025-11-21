import { Request, Response } from "express";
import { cars } from "../data/cars";

// GET /cars
export const getCars = async (req: Request, res: Response) => {
  const {
    make,
    model,
    minPrice,
    maxPrice,
    minYear,
    maxYear,
    minMileage,
    maxMileage,
    sortBy,
    order,
    page,
    limit,
  } = req.query;

  let filtered = cars;

  if (make)
    filtered = filtered.filter((c) =>
      c.make.toLowerCase().includes((make as string).toLowerCase())
    );

  if (model)
    filtered = filtered.filter((c) =>
      c.model.toLowerCase().includes((model as string).toLowerCase())
    );

  if (minPrice) filtered = filtered.filter((c) => c.price >= Number(minPrice));

  if (maxPrice) filtered = filtered.filter((c) => c.price <= Number(maxPrice));

  if (minYear) filtered = filtered.filter((c) => c.year >= Number(minYear));

  if (maxYear) filtered = filtered.filter((c) => c.year <= Number(maxYear));

  if (minMileage)
    filtered = filtered.filter((c) => c.mileage >= Number(minMileage));

  if (maxMileage)
    filtered = filtered.filter((c) => c.mileage <= Number(maxMileage));

  // Sorting
  if (sortBy) {
    const sortKey = sortBy as "price" | "year" | "mileage";
    const sortOrder = order === "desc" ? -1 : 1;
    filtered = filtered.sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return -1 * sortOrder;
      if (a[sortKey] > b[sortKey]) return 1 * sortOrder;
      return 0;
    });
  }

  // Pagination
  const total = filtered.length;
  const pageNum = Number(page) || 1;
  const limitNum = Number(limit) || 10;
  const offset = (pageNum - 1) * limitNum;
  const paginated = filtered.slice(offset, offset + limitNum);

  res.json({ cars: paginated, total });
};

// GET /cars/:id
export const getCarById = async (req: Request, res: Response) => {
  const car = cars.find((c) => c.id === req.params.id);
  if (!car) return res.status(404).json({ message: "Not found" });
  res.json(car);
};
