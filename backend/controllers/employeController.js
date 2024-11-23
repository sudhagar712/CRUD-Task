const Employee = require("../models/Employee.js");
const Department = require("../models/Department.js");
const asyncHandler = require("express-async-handler");

const addEmployee = asyncHandler(async (req, res) => {
    const { name, age, departmentId, isActive, gender, nationality } = req.body;
    if (!name || !age  || !gender || !nationality  || !departmentId) {
        return res.status(400).json({ error: "All fields are required." });
    }
    const employee = new Employee({ name, age,  isActive, gender, nationality, departmentId });
    await employee.save();
    res.status(201).json({ message: "Employee added successfully", employee });
});

const getEmployees = asyncHandler(async (req, res) => {
    const employees = await Employee.find().populate("departmentId");
    res.status(200).json({ employees });
});

const updateEmployee = asyncHandler(async (req, res) => {
    const { name, age, departmentId, isActive, gender, nationality } = req.body;
    const employee = await Employee.findByIdAndUpdate(
        req.params.id,
        { name, age, departmentId, isActive, gender, nationality },
        { new: true }
    );
    res.status(200).json({ message: "Employee updated successfully", employee });
});

const deleteEmployee = asyncHandler(async (req, res) => {
    await Employee.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Employee deleted successfully" });
});

module.exports = { addEmployee, getEmployees, updateEmployee, deleteEmployee };
