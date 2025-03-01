import Company from "./company.model.js";

export const createCompany = async (req, res) => {
  try {
    const { name, email, phone, foundedYear, impactLevel, category } = req.body;

    const existingCompany = await Company.findOne({ email });
    if (existingCompany) return res.status(400).json({ message: "Company already registered" });

    const newCompany = new Company({ name, email, phone, foundedYear, impactLevel, category });
    await newCompany.save();

    res.status(201).json({ message: "Company registered successfully", company: newCompany });
  } catch (error) {
    res.status(500).json({ message: "Error creating company", error: error.message });
  }
};

export const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: "Error fetching companies", error: error.message });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCompany = await Company.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedCompany) return res.status(404).json({ message: "Company not found" });

    res.json({ message: "Company updated successfully", company: updatedCompany });
  } catch (error) {
    res.status(500).json({ message: "Error updating company", error: error.message });
  }
};
