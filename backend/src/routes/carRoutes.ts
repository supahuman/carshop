import express from "express";
import { getCars, getCarById } from "../controllers/carController";

const router = express.Router();

// GET / (mounted at /api/cars)
router.get("/", getCars);

// GET /:id (mounted at /api/cars/:id)
router.get("/:id", getCarById);

export default router;
