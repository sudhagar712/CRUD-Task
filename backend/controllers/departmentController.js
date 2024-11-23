
const departmentModel = require("../models/Department.js");
const asyncHandler = require("express-async-handler");

const addDepartment = asyncHandler(async (req, res) => {
    const { name, description } = req.body;
    if (!name) {
        return res.status(400).json("Name is required.");
    }
    const department = new departmentModel({ name, description });
    await department.save();
    res.json({ message: "Department added successfully", department });
});

const getDepartments = asyncHandler(async (req, res) => {
    const departments = await departmentModel.find();
    res.json({ message: "Departments fetched successfully", departments });
});

const updateDepartment = asyncHandler(async (req, res) => {
    const { name, description } = req.body;
    const updatedDepartment = await departmentModel.findByIdAndUpdate(
        req.params.id, { name, description }, 
    );
    res.json({ message: "Department updated successfully", updatedDepartment });
});

const deleteDepartment = asyncHandler(async (req, res) => {
    await departmentModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Department deleted successfully" });
});

module.exports = { addDepartment, getDepartments, updateDepartment, deleteDepartment };
