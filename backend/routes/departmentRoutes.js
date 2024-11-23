const express = require("express");
const {addDepartment, getDepartments, updateDepartment, deleteDepartment} = require("../controllers/departmentController.js");

const router = express.Router();

router.post("/add", addDepartment);
router.get("/", getDepartments);
router.put("/update/:id", updateDepartment);
router.delete("/delete/:id", deleteDepartment);


module.exports = router;
