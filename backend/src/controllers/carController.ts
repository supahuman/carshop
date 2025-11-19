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
  } = req.query;

  let filtered = cars;

  if (make) {
    filtered = filtered.filter((c) =>
      c.make.toLowerCase().includes((make as string).toLowerCase())
    );
  }

  if (model) {
    filtered = filtered.filter((c) =>
      c.model.toLowerCase().includes((model as string).toLowerCase())
    );
  }

  if (minPrice) {
    filtered = filtered.filter((c) => c.price >= Number(minPrice));
  }

  if (maxPrice) {
    filtered = filtered.filter((c) => c.price <= Number(maxPrice));
  }

  if (minYear) {
    filtered = filtered.filter((c) => c.year >= Number(minYear));
  }

  if (maxYear) {
    filtered = filtered.filter((c) => c.year <= Number(maxYear));
  }

  if (minMileage) {
    filtered = filtered.filter((c) => c.mileage >= Number(minMileage));
  }

  if (maxMileage) {
    filtered = filtered.filter((c) => c.mileage <= Number(maxMileage));
  }

  res.json(filtered);
};

// GET /cars/:id
export const getCarById = async (req: Request, res: Response) => {
  const car = cars.find((c) => c.id === req.params.id);
  if (!car) return res.status(404).json({ message: "Not found" });
  res.json(car);
};
