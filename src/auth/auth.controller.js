import { loginUser } from "./auth.service.js";

export const login = async (req, res) => {
  try {
    const response = await loginUser(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
