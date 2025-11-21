"use client";

import React from "react";
import { useGetCarsQuery } from "@/redux/carApi";
import {
  useGetAppointmentsQuery,
  useDeleteAppointmentMutation,
} from "@/redux/appointmentApi";
import Link from "next/link";

export default function AppointmentList() {
  const { data: appointments, isLoading, refetch } = useGetAppointmentsQuery();

  const { data: carsResponse } = useGetCarsQuery();

  const [deleteAppointment, { isLoading: isDeleting }] =
    useDeleteAppointmentMutation();

  const cancel = async (id: string) => {
    if (!confirm("Cancel this appointment?")) return;
    try {
      await deleteAppointment(id).unwrap();
      refetch();
      alert("Appointment canceled");
    } catch {
      alert("Error canceling appointment");
    }
  };

  if (isLoading) return <p>Loading appointments...</p>;

  if (!appointments || appointments.length === 0) {
    return <p>No appointments yet. Book one on a car page.</p>;
  }

  return (
    <div className="space-y-4">
      {appointments.map((a) => {
        const car = carsResponse?.cars?.find((c) => c.id === a.carId);
        return (
          <div key={a.id} className="border p-4 rounded flex justify-between">
            <div>
              <div className="text-sm text-gray-600">
                {new Date(a.date).toLocaleDateString()}
              </div>
              <div className="font-semibold">
                {car ? (
                  <Link
                    href={`/cars/${car.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {car.make} {car.model}
                  </Link>
                ) : (
                  <span>Car {a.carId}</span>
                )}
              </div>
              <div className="text-sm text-gray-700">
                {a.name} — {a.email}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => cancel(a.id)}
                disabled={isDeleting}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
