"use client";

import React from "react";
import { useGetCarByIdQuery } from "../redux/carApi";
import { useCreateAppointmentMutation } from "../redux/appointmentApi";
import useLocalStorage from "../hooks/useLocalStorage";

export default function CarDetail({ id }: { id: string }) {
  const { data: car, isLoading, error } = useGetCarByIdQuery(id);
  const [favIds, setFavIds] = useLocalStorage<string[]>("favorites", []);
  const isFav = favIds.includes(id);

  const toggleFav = () =>
    setFavIds((prev) => {
      const set = new Set(prev);
      if (set.has(id)) set.delete(id);
      else set.add(id);
      return Array.from(set);
    });

  const [createAppointment, { isLoading: isCreating }] =
    useCreateAppointmentMutation();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [date, setDate] = React.useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createAppointment({ carId: id, name, email, date }).unwrap();
      alert("Appointment created!");
      setName("");
      setEmail("");
      setDate("");
    } catch (err) {
      alert("Error creating appointment");
    }
  };

  if (isLoading) return <p>Loading car...</p>;
  if (error || !car) return <p>Car not found</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">
        {car.make} {car.model}
      </h1>
      <p>{car.description}</p>
      <div className="my-2">
        <button
          onClick={toggleFav}
          className={`px-3 py-1 rounded ${
            isFav ? "bg-yellow-400" : "bg-gray-200"
          }`}
        >
          {isFav ? "★ Favorited" : "☆ Favorite"}
        </button>
      </div>

      <form onSubmit={submit} className="mt-4 space-y-2">
        <h2 className="font-semibold">Book an appointment</h2>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="border p-2 w-full"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border p-2 w-full"
        />
        <input
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="Date (YYYY-MM-DD)"
          className="border p-2 w-full"
        />
        <button
          type="submit"
          disabled={isCreating}
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          {isCreating ? "Booking..." : "Book"}
        </button>
      </form>
    </div>
  );
}
