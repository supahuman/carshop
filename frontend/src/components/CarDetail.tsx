"use client";

import React from "react";
import Link from "next/link";
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
    } catch {
      alert("Error creating appointment");
    }
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  if (error || !car)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Car Not Found
          </h1>
          <Link
            href="/"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Cars
          </Link>
        </div>
      </div>
    );

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors font-medium"
        >
          ← Back to Cars
        </Link>

        {/* Car Header */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          {/* Placeholder for car image - you can add actual images later */}
          <div className="h-64 bg-linear-to-r from-card-start to-card-end flex items-center justify-center">
            <div className="text-white text-center">
              <div className="text-6xl mb-2">🚗</div>
              <p className="text-lg opacity-90">Car Image</p>
            </div>
          </div>

          <div className="p-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {car.make} {car.model}
                </h1>
                <p className="text-xl text-green-600 font-semibold">
                  ${car.price.toLocaleString()}
                </p>
              </div>
              <button
                onClick={toggleFav}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  isFav
                    ? "bg-yellow-400 hover:bg-yellow-500 text-yellow-900"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                }`}
              >
                {isFav ? "★ Favorited" : "☆ Add to Favorites"}
              </button>
            </div>

            {/* Car Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-sm text-gray-600 uppercase tracking-wide">
                  Year
                </div>
                <div className="text-xl font-semibold text-gray-900">
                  {car.year}
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-sm text-gray-600 uppercase tracking-wide">
                  Mileage
                </div>
                <div className="text-xl font-semibold text-gray-900">
                  {car.mileage.toLocaleString()}
                </div>
              </div>
              {car.color && (
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-sm text-gray-600 uppercase tracking-wide">
                    Color
                  </div>
                  <div className="text-xl font-semibold text-gray-900">
                    {car.color}
                  </div>
                </div>
              )}
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-sm text-gray-600 uppercase tracking-wide">
                  Price
                </div>
                <div className="text-xl font-semibold text-green-600">
                  ${car.price.toLocaleString()}
                </div>
              </div>
            </div>

            {car.description && (
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Description
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {car.description}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Booking Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Book a Test Drive
          </h2>
          <form onSubmit={submit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                min={new Date().toISOString().split("T")[0]}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={isCreating}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isCreating ? (
                <span className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Booking...
                </span>
              ) : (
                "Book Test Drive"
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
