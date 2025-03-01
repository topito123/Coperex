import Company from "./company.model.js";

export const createCompanyService = async (data) => {
  const newCompany = new Company(data);
  return await newCompany.save();
};

export const getCompaniesService = async () => {
  return await Company.find();
};

export const updateCompanyService = async (id, data) => {
  return await Company.findByIdAndUpdate(id, data, { new: true });
};
