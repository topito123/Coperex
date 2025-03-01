import { body } from "express-validator";

export const validateCompany = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("phone").notEmpty().withMessage("Phone number is required"),
  body("foundedYear")
    .isInt({ min: 1950, max: new Date().getFullYear() })
    .withMessage(`Founded year must be between 1800 and ${new Date().getFullYear()}`),
  body("impactLevel")
    .isIn(["LOW", "MEDIUM", "HIGH"])
    .withMessage("Impact level must be LOW, MEDIUM, or HIGH"),
  body("category").notEmpty().withMessage("Category is required"),
];
