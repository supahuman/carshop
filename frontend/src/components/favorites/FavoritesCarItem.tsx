"use client";

import Link from "next/link";
import { useGetCarByIdQuery } from "@/redux/carsApi";

export default function FavoriteCarItem({
  id,
  removeFavorite,
}: {
  id: string;
  removeFavorite: (id: string) => void;
}) {
  const { data: car, isLoading, error } = useGetCarByIdQuery(id);

  if (isLoading) return <p>Loading {id}...</p>;
  if (error || !car) return <p>Car not found ({id})</p>;

  return (
    <div className="border p-4 rounded flex justify-between">
      <div>
        <Link href={`/cars/${car.id}`}>
          <span className="text-blue-600 font-bold text-lg cursor-pointer">
            {car.make} {car.model} ({car.year})
          </span>
        </Link>
        <p>${car.price.toLocaleString()}</p>
      </div>

      <button
        onClick={() => removeFavorite(car.id)}
        className="px-3 py-1 bg-red-500 text-white rounded"
      >
        Remove
      </button>
    </div>
  );
}
