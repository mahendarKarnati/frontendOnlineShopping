

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from './AuthContext';
import api from "./axiosConfig";


const Login = () => {
  const { login } = useAuth(); //addtionsal
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
const[loading,setLoading]=useState(false)


  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true)
      const formData = new URLSearchParams();
      formData.append("username", credentials.username);
      formData.append("password", credentials.password);

      const response = await api.post("/api/auth/login", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        withCredentials: true
      });
      //additional
     
      
      const { token } = response.data;
      const {user}=response.data
        login(user,token); 
        navigate(-1)

  // this triggers Header to update
  // navigate('/dashboard');
  //add close

      console.log("Login response:", response.data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify({ username: response.data.username }));


      // alert("Login successful");
      // navigate("/dashboard");

    } catch (err) {
      console.error("Login error:", err);
      setLoading(false)
      // Show better error messages
      if (err.response?.status === 401) {
        setError("Invalid username or password");
      } else if (err.response?.status === 403) {
        setError("Access denied");
      } else {
        setError("Login failed. Please try again later.");
      }
    }
  };
  return (
    <>
    {loading && (
                <div className="text-center mb-3 position-absolute bg-dark h-100 w-100 d-flex align-items-center justify-content-center opacity-50">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
    )}
    <form onSubmit={handleSubmit} className="container mt-5 p-5 bg-warning rounded-4 shadow" style={{ maxWidth: "400px" }}>
      <h2 className="mb-4">Login</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="form-group mb-3 d-flex align-items-center ">
       
        <svg className="position-absolute m-1" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
</svg>
        <input
          type="text"
          name="username"
          autoComplete="username"
          className="form-control"
          placeholder="   Username "
          value={credentials.username}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group mb-4 d-flex align-items-center ">
        <svg  className="position-absolute m-1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lock-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 0a4 4 0 0 1 4 4v2.05a2.5 2.5 0 0 1 2 2.45v5a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 13.5v-5a2.5 2.5 0 0 1 2-2.45V4a4 4 0 0 1 4-4m0 1a3 3 0 0 0-3 3v2h6V4a3 3 0 0 0-3-3"/>
</svg>
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          className="form-control"
          placeholder="   Password"
          value={credentials.password}
          onChange={handleChange}
          required
        />
      </div>
<a href='/forgetPassword' className='p-4'>forget password?</a> <br></br><br></br>
<p>don't an have account?<a href="/register"> Register</a></p>
      <button type="submit" className="btn btn-primary w-100">Login</button>
    </form>

    </>
  );
};

export default Login;

