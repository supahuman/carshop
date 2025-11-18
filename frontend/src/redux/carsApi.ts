import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Car, CarFilters } from "@/types";

export const carsApi = createApi({
  reducerPath: "carsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000" }),
  endpoints: (builder) => ({
    getCars: builder.query<Car[], CarFilters | void>({
      query: (params) => {
        if (!params) return "/cars";

        const qs = new URLSearchParams();

        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            qs.set(key, String(value));
          }
        });
        return `/cars${qs.toString() ? `?${qs.toString()}` : ""}`;
      },
    }),
    getCarById: builder.query<Car, string>({
      query: (id) => `/cars/${id}`,
    }),
    createAppointment: builder.mutation<
      { success: boolean; appointmentId: string },
      { carId: string; name: string; email: string; date: string }
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
