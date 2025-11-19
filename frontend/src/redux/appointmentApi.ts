import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Appointment } from "@/types";

export const appointmentApi = createApi({
  reducerPath: "appointmentApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/api" }),
  endpoints: (builder) => ({
    createAppointment: builder.mutation<
      { success: boolean; appointment: Appointment },
      { carId: string; name: string; email: string; date: string }
    >({
      query: (body) => ({ url: "/appointments", method: "POST", body }),
    }),
    getAppointments: builder.query<Appointment[], void>({
      query: () => "/appointments",
    }),
    deleteAppointment: builder.mutation<
      { success: boolean; removed?: Appointment },
      string
    >({
      query: (id) => ({ url: `/appointments/${id}`, method: "DELETE" }),
    }),
  }),
});

export const {
  useCreateAppointmentMutation,
  useGetAppointmentsQuery,
  useDeleteAppointmentMutation,
} = appointmentApi;
