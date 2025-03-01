import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./src/auth/auth.routes.js";
import companyRoutes from "./src/company/company.routes.js";
import { createAdminIfNotExists } from "./src/auth/admin.setup.js";
import reportRoutes from "./src/reports/report.routes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api", reportRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Database connected");
    await createAdminIfNotExists();
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.log("Database connection error:", err));