
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import api from './axiosConfig';

function Header() {
  const { token, logout, name } = useAuth();

  const handleLogout = async () => {
    try {
      await api.post("/api/auth/logout");
      logout();
      alert("Logged out!");
      window.location.href = '/login';
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          // if (parsedUser?.id) {
          //   setUId(parsedUser.id);
          //   console.log('uid is:', parsedUser.id);
          // }
          console.log("parsed useris : ",parsedUser)
          console.log("stored useris : ",storedUser)

        } catch (e) {
          console.error("Failed to parse user from localStorage", e);
        }
      }
    }, []);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Mahendar</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>

            {!token ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            ) : (
              <>
                  <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">Dashboard</Link>
                </li>
                <li className="nav-item nav-link" style={{ cursor: 'pointer' }} onClick={handleLogout}>
                  Logout
                </li>
              </>
            )}
          </ul>

          {token && (
            <span className="navbar-text">Welcome, {name || "User"}</span>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
