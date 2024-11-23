const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes.js");
const employeeRoutes = require("./routes/employeeRoutes.js");
const departmentRoutes = require("./routes/departmentRoutes.js");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE",
  allowedHeaders: "Content-Type, Authorization",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/departments", departmentRoutes);

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
