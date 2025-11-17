// app/cars/[id]/page.tsx (server component)
import { notFound } from "next/navigation";

type Car = {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  description?: string;
};

async function fetchCar(id: string): Promise<Car | null> {
  const res = await fetch(`http://localhost:4000/cars/${id}`);
  if (!res.ok) return null;
  return res.json();
}

export default async function CarPage({ params }: { params: { id: string } }) {
  const car = await fetchCar(params.id);
  if (!car) notFound();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">
        {car.make} {car.model}
      </h1>
      <p>{car.description}</p>
      <div>Year: {car.year}</div>
      <div>Price: ${car.price}</div>
    </div>
  );
}
