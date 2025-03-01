import express from "express";
import { createCompany, getCompanies, updateCompany } from "./company.controller.js";
import { authenticate } from "../auth/auth.middleware.js"; // Cambiar authMiddleware a authenticate
import { checkCompanyExists } from "./company.middleware.js";
import { validateCompany } from "./company.validations.js";

const router = express.Router();

router.post("/", authenticate, validateCompany, checkCompanyExists, createCompany);
router.get("/", authenticate, getCompanies);
router.put("/:id", authenticate, validateCompany, updateCompany);

export default router;