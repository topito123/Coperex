import User from "../user/user.model.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const isPasswordValid = await argon2.verify(user.password, password);
  if (!isPasswordValid) throw new Error("Invalid credentials");

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return { token, userId: user._id };
};
