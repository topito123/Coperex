import { Router } from "express";
import ReportsController from "./reports.controller.js";

const router = Router();
router.get("/reports", ReportsController.generateReport);

export default router;