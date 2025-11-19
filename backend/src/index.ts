import express from "express";
import cors from "cors";

import carRoutes from "./routes/carRoutes";
import appointmentRoutes from "./routes/appointmentRoutes";

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/cars", carRoutes);
app.use("/api/appointments", appointmentRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
});
