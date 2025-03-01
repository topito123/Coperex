import Company from "./company.model.js";

export const checkCompanyExists = async (req, res, next) => {
  try {
    const { email } = req.body;
    const existingCompany = await Company.findOne({ email });

    if (existingCompany) return res.status(400).json({ message: "Company already exists" });

    next();
  } catch (error) {
    res.status(500).json({ message: "Error checking company existence", error: error.message });
  }
};
