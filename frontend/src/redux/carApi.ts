import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Car, CarFilters, CarsResponse } from "@/types";

export const carApi = createApi({
  reducerPath: "carApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/api" }),
  endpoints: (builder) => ({
    getCars: builder.query<CarsResponse, CarFilters | void>({
      query: (params) => {
        // Return all cars if no filters are provided
        if (!params) return "/cars";

        // Functional programming way
        const queryString = new URLSearchParams(
          Object.entries(params)
            .filter(([_, value]) => value !== undefined && value !== null)
            .map(([key, value]) => [key, String(value)])
        );
        return `/cars${
          queryString.toString() ? `?${queryString.toString()}` : ""
        }`;
      },
    }),
    getCarById: builder.query<Car, string>({
      query: (id) => `/cars/${id}`,
    }),
  }),
});

export const { useGetCarsQuery, useGetCarByIdQuery } = carApi;
