import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Mock data
type Car = {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  color?: string;
  description?: string;
};

const cars: Car[] = [
  {
    id: "1",
    make: "Tesla",
    model: "Model 3",
    year: 2022,
    price: 35000,
    mileage: 12000,
    color: "red",
    description: "Electric sedan",
  },
  {
    id: "2",
    make: "Toyota",
    model: "RAV4",
    year: 2020,
    price: 22000,
    mileage: 30000,
    color: "blue",
    description: "Compact SUV",
  },
  {
    id: "3",
    make: "Honda",
    model: "Civic",
    year: 2019,
    price: 18000,
    mileage: 40000,
    color: "black",
    description: "Reliable compact",
  },
];

// GET /cars
// Update the GET /cars endpoint
app.get("/cars", (req, res) => {
  const { make, model, minPrice, maxPrice, minYear, maxYear, minMileage, maxMileage } = req.query;

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
});

// GET /cars/:id
app.get("/cars/:id", (req, res) => {
  const car = cars.find((c) => c.id === req.params.id);
  if (!car) return res.status(404).json({ message: "Not found" });
  res.json(car);
});

// POST /appointments
app.post("/appointments", (req, res) => {
  const { carId, name, email, date } = req.body;
  if (!carId || !name || !email || !date)
    return res.status(400).json({ message: "Missing fields" });
  // In real app: save to DB. Here return success.
  return res.json({
    success: true,
    appointmentId: Math.random().toString(36).slice(2),
  });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
});
