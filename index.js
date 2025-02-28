import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./src/auth/auth.routes.js";
import { createAdminIfNotExists } from "./src/auth/admin.setup.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ Database connected");
    await createAdminIfNotExists();
    app.listen(process.env.PORT, () =>
      console.log(`🚀 Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.log("❌ Database connection error:", err));
