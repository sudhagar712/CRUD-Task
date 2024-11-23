import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/");
    
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand text-white" to="/">
          Crud Task
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto ">
            <li className="nav-item ">
              <Link className="nav-link text-white" to="/employee">
                Employees
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/department">
                Departments
              </Link>
            </li>
            <li className="nav-item">
              {localStorage.getItem("token") ? (
                <button className="btn btn-danger" onClick={logout}>
                  Logout
                </button>
              ) : (
                <Link className="nav-link text-white" to="/">
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
