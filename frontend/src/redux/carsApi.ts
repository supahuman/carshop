import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the Car type
export type Car = {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  color?: string;
  description?: string;
};

export const carsApi = createApi({
  reducerPath: "carsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000" }),
  endpoints: (builder) => ({
    getCars: builder.query<
      Car[],
      {
        make?: string;
        model?: string;
        minPrice?: number;
        maxPrice?: number;
      } | void
    >({
      query: (params) => {
        const qs = new URLSearchParams(params as Record<string, string>);
        return `/cars${qs.toString() ? `?${qs.toString()}` : ""}`;
      },
    }),
    getCarById: builder.query<Car, string>({
      query: (id) => `/cars/${id}`,
    }),
    createAppointment: builder.mutation<
      { success: boolean; appointmentId: string }, // Response type
      { carId: string; name: string; email: string; date: string } // Argument type
    >({
      query: (body) => ({ url: "/appointments", method: "POST", body }),
    }),
  }),
});

export const {
  useGetCarsQuery,
  useGetCarByIdQuery,
  useCreateAppointmentMutation,
} = carsApi;
