import ReportService from "./report.service.js";
import fs from 'fs';

export const getReport = async (req, res) => {
  try {
    const filePath = await ReportService.generateExcelReport();

    // Verificamos si el archivo existe antes de enviarlo
    if (!fs.existsSync(filePath)) {
      return res.status(500).json({ message: "File not found" });
    }

    // Configurar los headers para descargar el archivo
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Disposition", `attachment; filename=${filePath}`);

    // Enviar el archivo como respuesta
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
    res.status(500).json({ message: "Error generating report" });
  }
};