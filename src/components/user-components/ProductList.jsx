
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router-dom';
import './style/ProductStyle.css';

const ProductList = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [userId, setUserId] = useState('');
    const history = useHistory();


    const [showGoTop, setShowGoTop] = useState(false)

    const handleVisibleButton = () => {
      console.log(window.pageYOffset > 30)
      setShowGoTop(window.pageYOffset > 30)
    }

    const handleScrollUp = () => {
	    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' })
    }


    useEffect(() => {
        refreshToken();
	getProducts();
	window.addEventListener('scroll', handleVisibleButton)
    }, []);

    const refreshToken = async () => {
        try {
            const response = await axios.get('https://adelicias-backend-app.azurewebsites.net/token');
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
	    setUserId(decoded.userId);
	    window.localStorage.setItem('userID', JSON.stringify(decoded.userId));
	    setSurname(decoded.surname);
            setName(decoded.name);
            setExpire(decoded.exp);
        } catch (error) {
            if (error.response) {
                history.push("/");
		console.log(error.response);
            }
        }
    }

    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
            const response = await axios.get('https://adelicias-backend-app.azurewebsites.net/token');
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    const getProducts = async () => {
        const response = await axios.get('https://adelicias-backend-app.azurewebsites.net/products');
        setProducts(response.data);
    }


    const handleAdd = (e, prd)=>{
      e.preventDefault();
      const newArr = orders.slice();
      newArr.push(prd)
      setOrders(newArr);
    }


    const verPedidos = ()=>{
      window.localStorage.setItem('orders', JSON.stringify(orders));
      history.push("/orders");
    }
 

    return (
      <>
	<div className="container mt-5">
	<button className="btn btn-success"  onClick={verPedidos}
	  style={{position: 'absolute', right: 30, top: 90}}> 
	  <i className="fas fa-cart-shopping mr-2"></i> 
	  Pedidos: {orders.length}
	</button>

            <h4>
		Bienvenido a Adelicia's Restaurant: 
		<b>{name} {surname}</b>
	    </h4>

	    <div className="row row-cols-1 row-cols-md-3" 
	      style={{marginTop: 100, marginBottom: 20}}>
		      {products.map((prd, index) => (
			<div className="col mb-4" key={prd.id+index}>
			  <div className="card"  
			  style={{width:18 + "rem"}}>
			  <img src={prd.imagen} 
			  style={{height: 200, objectFit: 'cover'}} 
			  className="card-img-top" alt="..." />
			    <div className="card-body">
			      <h5 className="card-title">{prd.nombre}</h5>
			      <p className="card-text text-justify">
				{prd.descripcion}
			      </p>
			      <h3 >Q.{prd.precio}</h3>
			      <button onClick={event => handleAdd(event,prd)}
				className="btn btn-warning btn-block">
				  Agregar  
				<i className="fas fa-cart-shopping"></i> 
			      </button>
			    </div>
			  </div>
			</div>
		      ))}
	      </div>
        </div>
      <button className={`btn btn-warning ${showGoTop ? 'show': 'hide'}`} 
	  onClick={handleScrollUp}
      style={{position: 'fixed', bottom: 10, right:10}}>
	  <i className="fas fa-angle-up"></i>
	</button>
      </>
        
    )
}

export default ProductList;

