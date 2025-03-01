import ReportsService from "./reports.service.js";
import fs from "fs";
import path from "path";

class ReportsController {
  static async generateReport(req, res) {
    try {
      const filePath = await ReportsService.generateExcelReport();

      // Verificamos si el archivo existe antes de enviarlo
      if (!fs.existsSync(filePath)) {
        return res.status(500).json({ message: "File not found" });
      }

      res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
      res.setHeader("Content-Disposition", `attachment; filename=${path.basename(filePath)}`);

      res.download(filePath, (err) => {
        if (err) {
          console.error("Error sending file:", err);
          res.status(500).json({ message: "Error sending file" });
        } else {
          // Eliminamos el archivo después de enviarlo para evitar acumular archivos innecesarios
          fs.unlinkSync(filePath);
        }
      });
    } catch (error) {
      console.error("Error generating report:", error);
      res.status(500).json({ message: "Error generating report", error: error.message });
    }
  }
}

export default ReportsController;