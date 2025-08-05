import React, { useEffect, useState} from 'react';
// import axios from 'axios';
import api from './axiosConfig';

import './items.css';
import { Link,useNavigate  } from 'react-router-dom';

function Items() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  // const[t,setT]=useState()


  useEffect(() => {
    const fetching = async () => {
      try {
        // const response = await axios.get('http://localhost:8080/api/products/get');
        // const fetchedData = response.data;
        // const obj = fetchedData.map((i) => ({
        //   name: i.name,
        //   price: i.price,
        //   main: i.main,
        //   blouse: i.blouse,
        //   pallu: i.pallu,
        //   showcase: i.showcase,
        //   border: i.border,
        //   description: i.description,
        //   id:i.id
        // }));
        // setProducts(obj);


        const response = await api.get('/api/products/get');
console.log("Fetched Data:", response.data);

// adjust based on what you see in the console
// const fetchedData = Array.isArray(response.data) ? response.data : [];
const fetchedData=response.data
// setT(fetchedData)

console.log("fetched data is ",fetchedData)
// if (Array.isArray(fetchedData) && fetchedData.length > 0) {
const obj = fetchedData.map((i) => ({
  name: i.name,
  price: i.price,
  main: i.main,
  blouse: i.blouse,
  pallu: i.pallu,
  showcase: i.showcase,
  border: i.border,
  description: i.description,
  id: i.id
}));
console.log("obj is: ",obj)
setProducts(obj);
// }
// else{
//   console.log("fetched data is null")
// }

      } catch (err) {
        console.log("Error from API:", err);
        // console.log("data type is: ",typeof(t))
      }
    };
    fetching();
  }, []);



  useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser);
            // if (parsedUser?.id) {
            //   setUId(parsedUser.id);
            //   console.log('uid is:', parsedUser.id);
            // }
            console.log("parsed data : ",parsedUser)
            console.log("parsed useris : ",parsedUser)
  
          } catch (e) {
            console.error("Failed to parse user from localStorage", e);
          }
        }
      }, []);


  return (
    <div className="container mt-4">
      <h2 className="text-center text-primary mb-4">🛒 Product List</h2>
      <div className="row">
        {products.map((prod, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div
              className="product d-flex flex-column align-items-center justify-content-center p-2 border border-1 rounded-3 shadow-sm h-100" onClick={() => navigate(`/product/${prod.id}`)}
            >
              <div className="imgBox d-flex align-items-center justify-content-center">
                <img src={prod.showcase} alt="product" width="100%" height="280px" style={{ objectFit: 'contain' }} />
              </div>
              <span className="name fw-bold mt-2">{prod.name}</span>
              <span className="price fw-bold">₹ {prod.price}</span>
              <div className="buttons d-flex justify-content-center w-100 mt-2 px-1">
                <Link to={`/product/${prod.id}`}>
                <button className="btn btn-primary" >Buy Now</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Items;
