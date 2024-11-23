import React from "react";
import { toast } from "react-toastify";

const EmployeeList = ({ employees, setEmployees, onEdit }) => {
  const handleDelete = (id) => {
    console.log("Deleting employee with ID:", id);
    
    const updatedEmployees = employees.filter((employee) => employee.id !== id);

    if (updatedEmployees.length === employees.length) {
      toast.error("Employee not found");
      return;
    }

    
    setEmployees(updatedEmployees);

   
    try {
      localStorage.setItem("employees", JSON.stringify(updatedEmployees));
      toast.success("Employee deleted successfully");
    } catch (error) {
      toast.error("Failed to update local storage");
      console.error("LocalStorage Error:", error);
    }
  };

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Age</th>
            <th scope="col">Department</th>
            <th scope="col">isActive</th>
            <th scope="col">Gender</th>
            <th scope="col">Nationality</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <th scope="row">{employee.name}</th>
              <td>{employee.age}</td>
              <td>{employee.departmentId}</td>
              <td>{employee.isActive ? "true" : "false"}</td>
              <td>{employee.gender}</td>
              <td>{employee.nationality}</td>
              <td>
                <div className="d-flex gap-3">
                  <button
                    type="button"
                    className="btn btn-primary px-2"
                    onClick={() => onEdit(employee)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDelete(employee.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
