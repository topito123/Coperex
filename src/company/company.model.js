import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    foundedYear: { type: Number, required: true },
    trajectoryYears: { type: Number, default: function () {
      return new Date().getFullYear() - this.foundedYear;
    }},
    impactLevel: { type: String, enum: ["LOW", "MEDIUM", "HIGH"], required: true },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Company", companySchema);
