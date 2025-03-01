import ExcelJS from 'exceljs';
import path from 'path';
import CompanyModel from '../company/company.model.js';

const generateExcelReport = async () => {
    const companies = await CompanyModel.find();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Companies Report');

    worksheet.columns = [
        { header: 'Company Name', key: 'name', width: 30 },
        { header: 'Category', key: 'category', width: 20 },
        { header: 'Years of Experience', key: 'yearsOfExperience', width: 20 },
        { header: 'Impact Level', key: 'impactLevel', width: 15 }
    ];

    companies.forEach(company => {
        worksheet.addRow({
            name: company.name,
            category: company.category,
            yearsOfExperience: company.yearsOfExperience,
            impactLevel: company.impactLevel
        });
    });

    const filePath = path.join(process.cwd(), 'companies_report.xlsx');
    await workbook.xlsx.writeFile(filePath);
    return filePath;
};

export default { generateExcelReport };