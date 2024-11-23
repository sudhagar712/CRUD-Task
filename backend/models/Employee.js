const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  isActive: { type: Boolean, default: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  nationality: { type: String, required: true },
});

module.exports = mongoose.model("Employee", EmployeeSchema);
