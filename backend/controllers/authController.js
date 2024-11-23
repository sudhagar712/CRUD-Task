const userModel = require("../models/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { use } = require("../routes/authRoutes");
const dotenv = require("dotenv").config();

const login = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  
  const normalizedEmail = email.toLowerCase();

  let user = await userModel.findOne({ email: normalizedEmail });

  if (!user) {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Password being hashed:", password);
console.log("Generated hash:", hashedPassword);

    user = new userModel({
      name,
      email: normalizedEmail,
      password: hashedPassword,
    });

    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "8h",
    });

    return res
      .status(201)
      .json({ message: "User created successfully", token, user });
  } else {
    
    if(user &&user.matchPassword(password)){
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "8h",
      });
      return res.status(200).json({ message: "Login successful", token, user });
    }
  }
});

module.exports = { login };
