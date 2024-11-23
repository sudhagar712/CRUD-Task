const express = require("express");
const { addEmployee, getEmployees, updateEmployee, deleteEmployee } = require("../controllers/employeController.js");

const router = express.Router();

router.post("/add", addEmployee);
router.get("/", getEmployees);
router.put("/update/:id", updateEmployee);
router.delete("/delete/:id", deleteEmployee);

module.exports = router;
