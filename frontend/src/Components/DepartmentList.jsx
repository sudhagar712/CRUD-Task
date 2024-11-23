import React from "react";

const DepartmentList = ({ departments, onEdit, onDelete }) => {
  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr key={department.id}>
              <th scope="row">{department.name}</th>
              <td>{department.description || "No description available"}</td>
              <td>
                <div className="d-flex gap-3">
                  <button
                    type="button"
                    className="btn btn-primary px-2"
                    onClick={() => onEdit(department.id)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => onDelete(department.id)}
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

export default DepartmentList;
