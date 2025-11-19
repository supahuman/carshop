import express from "express";
import {
  createAppointment,
  getAppointments,
  deleteAppointment,
} from "../controllers/appointmentController";

const router = express.Router();

// POST / (mounted at /api/appointments)
router.post("/", createAppointment);

// GET / (mounted at /api/appointments)
router.get("/", getAppointments);

// DELETE /:id (mounted at /api/appointments/:id)
router.delete("/:id", deleteAppointment);

export default router;
