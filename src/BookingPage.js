import React, { useEffect, useState } from 'react';
import { Navigate, useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
import api from './axiosConfig';

import BookingForm from './BookingForm';  // The form I gave earlier
import { useAuth } from './AuthContext';
import SuccessPopUp from './SuccessPopUp';

function BookingPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const{role}=useAuth();
    const back=useNavigate();
    

      useEffect(()=>{
    const nonUser= async ()=>{
        if(role!=='ROLE_USER'){
    back(-1)

    alert("Hey you are not user. you don't have permission to book")
}
    }
    nonUser();

  },[role])
  


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




