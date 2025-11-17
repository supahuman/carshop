"use client";
import React, { useState } from "react";
import { useGetCarsQuery, Car } from "../redux/carsApi";

export default function CarList() {
  const [make, setMake] = useState("");
  const {
    data: cars,
    isLoading,
    error,
    refetch,
  } = useGetCarsQuery(make ? { make } : undefined);

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Cars</h2>

      <div className="mb-4">
        <input
          value={make}
          onChange={(e) => setMake(e.target.value)}
          placeholder="Filter by make"
          className="border p-2 mr-2"
        />
        <button
          onClick={() => refetch()}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Search
        </button>
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading cars.</p>}

      <ul>
        {cars?.map((c: Car) => (
          <li key={c.id} className="mb-2 border-b pb-2">
            <div className="font-bold">
              {c.make} {c.model} ({c.year})
            </div>
            <div>${c.price.toLocaleString()}</div>
            <div className="text-sm text-gray-600">{c.description}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
