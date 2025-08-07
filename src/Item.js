import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom'; // ✅ fixed navigate import
import api from './axiosConfig';
import './Item.css';

function Item() {
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null); // ✅ Add user state
  const navigate = useNavigate(); // ✅ Use react-router-dom navigate

  const { id } = useParams();
  const productId = Number(id);

  useEffect(() => {
    const fetching = async () => {
      try {
        const response = await api.get(`/api/products/get/${productId}`);
        const fetchedData = await api.get(`/api/products/get`);

        const allData = fetchedData.data;
        setProduct(response.data);

        const obj = allData.map((i) => ({
          id: i.id,
          name: i.name,
          price: i.price,
          showcase: i.showcase,
          blouse: i.blouse,
          pallu: i.pallu,
          border: i.border,
          main: i.main,
          description: i.description,
        }));
        setProducts(obj);
      } catch (err) {
        console.log("error from api : ", err);
      }
    };

    fetching();
    console.log('single product ',product)
    console.log("all products ",products)

    // ✅ Load user from localStorage
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, [productId]);

  const handleOrder = (e) => {
    e.preventDefault(); // Stop link from navigating before check
    if (!user) {
      navigate("/login");
    } else {
      navigate(`/book/${product.id}`);
    }
  };
  console.log('sigle product names: ',product)

  if (!product)
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  return (
    <>
      <div className="images">
      <div id="carouselExampleIndicators" className="carousel slide">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="4" aria-label="Slide 5"></button>

  </div>
  <div class="carousel-inner">
    <div id='box' class="carousel-item active border border-5">
      <img src={product.main} class="d-block" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src={product.blouse} class="d-block" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src={product.border} class="d-block" alt="..."/>
    </div>
    
    <div class="carousel-item">
      <img src={product.showcase} class="d-block" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src={product.pallu} class="d-block" alt="..."/>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>







        <div className="d-flex flex-column align-items-center justify-content-center w-50">
          <h1>{product.name}</h1>
          <h2>₹{product.price}</h2>
          <p>{product.description}</p>
          <button className="btn btn-primary" onClick={handleOrder}>Order Now</button>
        </div>
      </div>

      <br />
      <h1 className="text-start">Similar Products</h1>
      {products.map((prod, index) => (
        <div key={index}>
          <div className="product d-flex flex-column align-items-center justify-content-center p-2 border border-1 rounded-3 shadow-sm h-100">
            <div className="imgBox d-flex align-items-center justify-content-center">
              <img
                src={prod.showcase}
                alt="product"
                width="100%"
                height="280px"
                style={{ objectFit: 'contain' }}
              />
            </div>
            <span className="name fw-bold mt-2">{prod.name}</span>
            <span className="price fw-bold">₹ {prod.price}</span>
            <div className="buttons d-flex justify-content-center w-100 mt-2 px-1">
              {/* <button className="btn btn-warning">Cart</button> */}
              <Link to={`/product/${prod.id}`}>
                <button className="btn btn-primary">Buy Now</button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default Item;
