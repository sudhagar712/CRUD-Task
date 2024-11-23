import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmployeeList from "../Components/EmployeeList";
import { useNavigate } from "react-router-dom";

const Employeepage = () => {
  const [getdepartment, setGetDepartment] = useState([]);
  const [editEmployee, setEditEmployee] = useState(null);
  const [employees, setEmployees] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  
  useEffect(() => {
    const departmentsFromStorage = localStorage.getItem("departments");
    if (departmentsFromStorage) {
      setGetDepartment(JSON.parse(departmentsFromStorage));
    }
  }, []);

  
  useEffect(() => {
    const employeeData = localStorage.getItem("employees");
    if (employeeData) {
      setEmployees(JSON.parse(employeeData));
    }
  }, []);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    age: Yup.number()
      .required("Age is required")
      .positive("Age must be positive")
      .integer("Age must be a whole number"),
    departmentId: Yup.string().required("DepartmentId is required"),
    gender: Yup.string().required("Gender is required"),
    nationality: Yup.string().required("Nationality is required"),
    isActive: Yup.boolean(),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      age: "",
      departmentId: "",
      gender: "",
      nationality: "",
      isActive: false,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const employeeData = localStorage.getItem("employees");
      const storedEmployees = employeeData ? JSON.parse(employeeData) : [];

      if (editEmployee) {
        
        const updatedEmployees = employees.map((emp) =>
          emp.id === editEmployee.id ? { ...values, id: emp.id } : emp
        );
        setEmployees(updatedEmployees);

        
        const updatedStorageEmployees = storedEmployees.map((emp) =>
          emp.id === editEmployee.id ? { ...values, id: emp.id } : emp
        );
        localStorage.setItem("employees", JSON.stringify(updatedStorageEmployees));

        toast.success("Employee updated successfully");
        setEditEmployee(null);
      } else {
        
        const newEmployee = { ...values, id: Date.now() };
        const newEmployeesList = [...storedEmployees, newEmployee];

        setEmployees(newEmployeesList);

        
        localStorage.setItem("employees", JSON.stringify(newEmployeesList));

        toast.success("Employee added successfully");
      }
      resetForm();
    },
  });

  useEffect(() => {
    if (editEmployee) {
      formik.setValues({
        name: editEmployee.name || "",
        age: editEmployee.age || "",
        departmentId: editEmployee.departmentId || "",
        gender: editEmployee.gender || "",
        nationality: editEmployee.nationality || "",
        isActive: editEmployee.isActive || false,
      });
    }
  }, [editEmployee]);

  const handleEditEmployee = (employee) => {
    setEditEmployee(employee);
  };

  return (
    <div className="container-fluid">
      <div className="row mt-4">
        <div className="col-md-12">
          <h3>Employee Management</h3>
          <div className="row mt-4">
            <div className="col-md-3">
              <div className="card p-3">
                <div className="card-body">
                  <form onSubmit={formik.handleSubmit}>
                    <div className="form-group">
                      <label>Name:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter name"
                      />
                      {formik.touched.name && formik.errors.name && (
                        <p className="text-danger">{formik.errors.name}</p>
                      )}
                    </div>
                    <div className="form-group">
                      <label>Age:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="age"
                        value={formik.values.age}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter age"
                      />
                      {formik.touched.age && formik.errors.age && (
                        <p className="text-danger">{formik.errors.age}</p>
                      )}
                    </div>
                    <div className="form-group">
                      <label>Department:</label>
                      {getdepartment.length > 0 ? (
                        <select
                          className="form-control"
                          name="departmentId"
                          value={formik.values.departmentId}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        >
                          <option value="">Select Department</option>
                          {getdepartment.map((dep) => (
                            <option key={dep.id} value={dep.name}>
                              {dep.name}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <p>No departments available</p>
                      )}
                      {formik.touched.departmentId &&
                        formik.errors.departmentId && (
                          <p className="text-danger">
                            {formik.errors.departmentId}
                          </p>
                        )}
                    </div>
                    <div className="form-group">
                      <input
                        type="checkbox"
                        name="isActive"
                        checked={formik.values.isActive}
                        onChange={formik.handleChange}
                      />
                      <span className="mx-2">IsActive</span>
                    </div>
                    <div className="form-group">
                      <label>Gender:</label>
                      <select
                        className="form-control"
                        name="gender"
                        value={formik.values.gender}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Others</option>
                      </select>
                      {formik.touched.gender && formik.errors.gender && (
                        <p className="text-danger">{formik.errors.gender}</p>
                      )}
                    </div>
                    <div className="form-group">
                      <label>Nationality:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="nationality"
                        value={formik.values.nationality}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter nationality"
                      />
                      {formik.touched.nationality &&
                        formik.errors.nationality && (
                          <p className="text-danger">
                            {formik.errors.nationality}
                          </p>
                        )}
                    </div>
                    <div className="d-grid mt-3">
                      <button type="submit" className="btn btn-outline-success">
                        {editEmployee ? "Update Employee" : "Add Employee"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <EmployeeList
                employees={employees}
                setEmployees={setEmployees}
                onEdit={handleEditEmployee}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employeepage;
