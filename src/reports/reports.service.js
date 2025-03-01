import excelJS from "exceljs";
import path from "path";
import CompanyModel from "../company/company.model.js";

class ReportsService {
  static async generateExcelReport() {
    const companies = await CompanyModel.find();
    const workbook = new excelJS.Workbook();
    const worksheet = workbook.addWorksheet("Companies");

    worksheet.columns = [
      { header: "Name", key: "name", width: 25 },
      { header: "Email", key: "email", width: 30 },
      { header: "Phone", key: "phone", width: 15 },
      { header: "Founded Year", key: "foundedYear", width: 15 },
      { header: "Impact Level", key: "impactLevel", width: 15 },
      { header: "Category", key: "category", width: 20 }
    ];

    companies.forEach(company => {
      worksheet.addRow({
        name: company.name,
        email: company.email,
        phone: company.phone,
        foundedYear: company.foundedYear,
        impactLevel: company.impactLevel,
        category: company.category
      });
    });

    const filePath = path.join(process.cwd(), "companies_report.xlsx");
    try {
      await workbook.xlsx.writeFile(filePath);
      console.log(`File generated at: ${filePath}`); // Agrega este log para verificar la ruta del archivo
    } catch (error) {
      console.error("Error generating file:", error);
    }
    return filePath;
  }
}

export default ReportsService;