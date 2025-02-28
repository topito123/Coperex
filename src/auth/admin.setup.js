import User from "../user/user.model.js";
import argon2 from "argon2";

export const createAdminIfNotExists = async () => {
  try {
    const existingAdmin = await User.findOne({ role: "ADMIN" });

    if (existingAdmin) {
      console.log("Admin already exists");
      return;
    }

    const hashedPassword = await argon2.hash("Admin123"); 
    const adminUser = new User({
      name: "First Admin",
      email: "admin@interfer.com",
      password: hashedPassword,
      role: "ADMIN",
    });

    await adminUser.save();
    console.log("Admin created successfully | Email: admin@interfer.com | Password: Admin123");
  } catch (error) {
    console.error("Error creating admin:", error.message);
  }
};
