const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
require("dotenv").config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

const AdminSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const Admin =
  mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

async function createAdmin() {
  try {
    await mongoose.connect(MONGODB_URI);

    const hashedPassword = await bcrypt.hash("admin123", 10);

    await Admin.create({
      email: "admin@kingstruck.com",
      password: hashedPassword,
    });

    console.log("✅ Admin created successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

createAdmin();