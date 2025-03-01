import { Router } from "express";
import { getReport } from "./report.controller.js";

const router = Router();

/**
 * @swagger
 * /reports:
 *   get:
 *     summary: Generate and download a report
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: Report generated successfully
 *       500:
 *         description: Error generating report
 */
router.get("/reports", getReport);

export default router;