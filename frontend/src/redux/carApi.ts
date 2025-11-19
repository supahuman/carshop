import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Car, CarFilters } from "@/types";

export const carApi = createApi({
  reducerPath: "carApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/api" }),
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
  }),
});

export const { useGetCarsQuery, useGetCarByIdQuery } = carApi;
