const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const User = require("./models/User");

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const exists = await User.findOne({
      email: "internationalgogaji@gmail.com",
    });

    if (exists) {
      console.log("Admin already exists");
      process.exit();
    }

    const admin = await User.create({
      name: "Gogaji Admin",
      email: "internationalgogaji@gmail.com",
      password: "International@ji",
      role: "admin",
    });

    console.log("Admin Created");
    console.log(admin.email);

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

createAdmin();