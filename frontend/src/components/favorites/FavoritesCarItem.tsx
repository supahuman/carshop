"use client";

import Link from "next/link";
import { Car } from "@/types";

interface FavoritesCarItemProps {
  car: Car;
  onRemove: (id: string) => void;
}

export default function FavoritesCarItem({
  car,
  onRemove,
}: FavoritesCarItemProps) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
      <Link href={`/cars/${car.id}`} className="block mb-3">
        <h3 className="text-xl font-bold text-blue-600 hover:underline">
          {car.make} {car.model} ({car.year})
        </h3>
      </Link>

      <div className="space-y-2 mb-4">
        <p className="text-2xl font-semibold text-green-600">
          ${car.price.toLocaleString()}
        </p>
        <p className="text-sm text-gray-600">
          {car.mileage.toLocaleString()} miles
        </p>
        {car.color && (
          <p className="text-sm text-gray-600">Color: {car.color}</p>
        )}
        {car.description && (
          <p className="text-sm text-gray-700 line-clamp-2">
            {car.description}
          </p>
        )}
      </div>

      <div className="flex gap-2">
        <Link
          href={`/cars/${car.id}`}
          className="flex-1 text-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          View Details
        </Link>
        <button
          onClick={() => onRemove(car.id)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          aria-label="Remove from favorites"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
