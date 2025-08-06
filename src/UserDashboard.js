import React, { useEffect, useState } from 'react';
import api from './axiosConfig';
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import './d.css';

function UserDashboard() {
  const token = localStorage.getItem('token');
  const { logout } = useAuth();
  const navigate = useNavigate(); 
  // const userinfo = localStorage.getItem('user');
  
  const [user, setUser] = useState({});
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [bookings, setBookings] = useState([]);
  // const [uId, setUId] = useState(null);

  // Get user ID from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser?.id) {
          // setUId(parsedUser.id);
          console.log('uid is:', parsedUser.id);
        }
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
      }
    }
  }, []);

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        });
        console.log("dashboard response:", response.data);
        setUser(response.data);
      } catch (err) {
        console.error("Not authenticated", err);
        navigate("/login");
      }
    };

    fetchProfile();
  }, [token, navigate]);

  // Sync edit form when user is updated
  useEffect(() => {
    if (user) {
      setEditForm(user);
    }
  }, [user]);

  // Fetch bookings when user.id is available
  useEffect(() => {
    const bookingHistory = async () => {
      try {
        if (user.id) {
          const response = await api.get(`/api/bookings/${user.id}`);
          const data = response.data;
          const singleData = data.map((i) => ({
            id: i.id,
            name: i.customerName,
            phone: i.customerPhone,
            price: i.productPrice,
            quantity: i.quantity,
            totalPrice: i.totalPrice,
            bookingStatus:i.bookingStatus,
            deviveredDate:i.deviveredDate,
            status:i.status,
            productName:i.productName,
            bookingDate:i.bookingDate
          }));
          setBookings(singleData);
          console.log("Booking data:", singleData);
        }
      } catch (e) {
        console.error("Failed to fetch bookings", e);
      }
    };

    bookingHistory();
  }, [user.id]);

  const fetchUser = async () => {
    try {
      const res = await api.get("/api/user/profile", {
        withCredentials: true
      });
      setUser(res.data);
    } catch (err) {
      console.error("❌ Failed to load user", err);
      if (err.response && err.response.status === 401) {
        logout();
        navigate("/login");
      }
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await api.put("/api/user/update", editForm, {
        withCredentials: true
      });
      console.log("Profile updated:", response.data);
      alert("✅ Profile updated!");
      setEditing(false);
      fetchUser();
    } catch (err) {
      console.error("❌ Update failed", err);
    }
  };

  return (
    <div className="container mt-4">
  <h2 className="mb-4 text-primary">User Dashboard</h2>

  {/* Profile Section */}
  <div className="card mb-4">
    <div className="card-body">
      {editing ? (
        <div className="row g-3">
          <div className="col-md-6">
            <input
              className="form-control"
              value={editForm.name || ''}
              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              placeholder="Name"
            />
          </div>
          <div className="col-md-6">
            <input
              className="form-control"
              value={editForm.mobile || ''}
              onChange={(e) => setEditForm({ ...editForm, mobile: e.target.value })}
              placeholder="Mobile"
            />
          </div>
          <div className="col-md-6">
            <input
              className="form-control"
              value={editForm.email || ''}
              onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
              placeholder="Email"
            />
          </div>
          <div className="col-md-6">
            <input
              className="form-control"
              value={editForm.username || ''}
              onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
              placeholder="Username"
            />
          </div>
          <div className="col-12">
            <button onClick={handleUpdate} className="btn btn-success">Save</button>
          </div>
        </div>
      ) : (
        <>
          <div className="row g-3">
            <div className="col-md-6"><h5>Name: {user.name}</h5></div>
            <div className="col-md-6"><h6>Mobile Number: {user.mobile}</h6></div>
            <div className="col-md-6"><h6>Email: {user.email}</h6></div>
            <div className="col-md-6"><h6>Username: {user.username}</h6></div>
          </div>
          <button onClick={() => setEditing(true)} className="btn btn-primary mt-3">Edit</button>
        </>
      )}
    </div>
  </div>

  {/* Bookings Table */}
  <div className="card">
    <div className="card-body">
      <h4 className='text-primary'>My Bookings</h4>
      {bookings.length === 0 ? (
        <p>No bookings available.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-primary">
              <tr>
                <th>ID</th>
                <th>Customer Name</th>
                <th>Phone</th>
                <ht>product name</ht>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th>bookingDate</th>
                <th>bookingStatus</th>
                <th>deliveredDate</th>
                <th>status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b, index) => (
                <tr key={index}>
                   <td>{b.id}</td>
                  <td>{b.name}</td>
                  <td>{b.phone}</td>
                  <td>{b.productName}</td>
                  <td>{b.price}</td>
                  <td>{b.quantity}</td>
                  <td>{b.totalPrice}</td>
                  <td>{b.bookingDate}</td>
                  <td>{b.bookingStatus}</td>
                  <td>{b.deviveredDate}</td>
                  <td>{b.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  </div>
</div>

  );
}

export default UserDashboard;
