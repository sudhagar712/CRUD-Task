import React, { useState, useEffect } from "react";
import DepartmentList from "../Components/DepartmentList";
import { useNavigate } from "react-router-dom";

const Departmentpage = () => {
  const [departments, setDepartments] = useState(() => {
    const savedDepartments = localStorage.getItem("departments");
    return savedDepartments ? JSON.parse(savedDepartments) : [];
  });

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
      if (!localStorage.getItem("token")) {
        navigate("/");
      }
    }, [navigate]);
  useEffect(() => {
    localStorage.setItem("departments", JSON.stringify(departments));
  }, [departments]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      setError("Name is required");
      return;
    }
    setError("");

    if (isEditing) {
      const updatedDepartments = departments.map((dept) =>
        dept.id === editId ? { ...dept, name, description } : dept
      );
      setDepartments(updatedDepartments);
    } else {
      const newDepartment = {
        id: Date.now(), 
        name,
        description,
      };
      setDepartments((prevDepartments) => [...prevDepartments, newDepartment]);
    }

    
    setName("");
    setDescription("");
    setIsEditing(false);
    setEditId(null);
  };

  const handleEdit = (id) => {
    const departmentToEdit = departments.find((dept) => dept.id === id);
    if (departmentToEdit) {
      setName(departmentToEdit.name);
      setDescription(departmentToEdit.description);
      setIsEditing(true);
      setEditId(id);
    }
  };

  const handleDelete = (id) => {
    const filteredDepartments = departments.filter((dept) => dept.id !== id);
    setDepartments(filteredDepartments);
  };

  return (
    <div className="container-fluid">
      <div className="row mt-4">
        <div className="col-md-12">
          <h3>{isEditing ? "Edit" : "Add"} Department</h3>
          <div className="row mt-4">
            <div className="col-md-4">
              <div className="card p-3">
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label>Name:</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Description:</label>
                      <textarea
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter description"
                      />
                    </div>

                    {error && (
                      <div className="alert alert-danger mt-2">{error}</div>
                    )}

                    <div className="d-grid mt-3">
                      <button type="submit" className="btn btn-outline-success">
                        {isEditing ? "Update Department" : "Add Department"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="col-md-8">
              <DepartmentList
                departments={departments}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Departmentpage;
