import express from "express";
import { createCompany, getCompanies, updateCompany } from "./company.controller.js";
import { authenticate } from "../auth/auth.middleware.js";
import { checkCompanyExists } from "./company.middleware.js";
import { validateCompany } from "./company.validations.js";

const router = express.Router();

/**
 * @swagger
 * /companies:
 *   post:
 *     summary: Create a new company
 *     tags: [Company]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Company'
 *     responses:
 *       201:
 *         description: Company created successfully
 *       400:
 *         description: Company already registered
 *       500:
 *         description: Error creating company
 */
router.post("/", authenticate, validateCompany, checkCompanyExists, createCompany);

/**
 * @swagger
 * /companies:
 *   get:
 *     summary: Get all companies
 *     tags: [Company]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of companies
 *       500:
 *         description: Error fetching companies
 */
router.get("/", authenticate, getCompanies);

/**
 * @swagger
 * /companies/{id}:
 *   put:
 *     summary: Update a company
 *     tags: [Company]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Company ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Company'
 *     responses:
 *       200:
 *         description: Company updated successfully
 *       404:
 *         description: Company not found
 *       500:
 *         description: Error updating company
 */
router.put("/:id", authenticate, validateCompany, updateCompany);

export default router;