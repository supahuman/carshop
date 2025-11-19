import { Request, Response } from "express";
import { Appointment } from "../types";

// In-memory appointments store
const appointments: Appointment[] = [];

// POST /appointments
export const createAppointment = (req: Request, res: Response) => {
  const { carId, name, email, date } = req.body;
  if (!carId || !name || !email || !date)
    return res.status(400).json({ message: "Missing fields" });
  // Save to in-memory list
  const newAppointment = {
    id: Math.random().toString(36).slice(2),
    carId,
    name,
    email,
    date,
    createdAt: new Date().toISOString(),
  };
  appointments.push(newAppointment);

  return res.json({ success: true, appointment: newAppointment });
};

// GET /appointments
export const getAppointments = (req: Request, res: Response) => {
  res.json(appointments);
};

// DELETE /appointments/:id
export const deleteAppointment = (req: Request, res: Response) => {
  const idx = appointments.findIndex((a) => a.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: "Not found" });
  const [removed] = appointments.splice(idx, 1);
  res.json({ success: true, removed });
};
