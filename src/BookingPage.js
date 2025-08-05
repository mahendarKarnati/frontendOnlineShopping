import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
// import axios from 'axios';
import api from './axiosConfig';

import BookingForm from './BookingForm';  // The form I gave earlier

function BookingPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
const handleOrder = () => {
  const user = localStorage.getItem("user");

  if (!user) {
    alert("Please log in to order.");
    Navigate("/login");
    return;
  }

  // Proceed with ordering logic...
};

    useEffect(() => {
        api.get(`/api/products/get/${id}`)
            .then(res => setProduct(res.data))
            .catch(err => console.log(err));
    }, [id]);

    if (!product) return <p>Loading...</p>;

    return (
        <div>
            <h2 className="text-center my-4">Booking for: {product.name}</h2>
            <BookingForm product={product} />
        </div>
    );
}

export default BookingPage;
