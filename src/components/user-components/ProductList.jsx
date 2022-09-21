
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router-dom';

const ProductList = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const history = useHistory();

    useEffect(() => {
        refreshToken();
	getProducts();
    });

    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:5000/token');
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
	    setSurname(decoded.surname);
            setName(decoded.name);
            setExpire(decoded.exp);
        } catch (error) {
            if (error.response) {
                history.push("/");
            }
        }
    }

    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
            const response = await axios.get('http://localhost:5000/token');
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
        const response = await axiosJWT.get('http://localhost:5000/products', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setProducts(response.data);
    }


    const handleAdd = (e, prd)=>{
      e.preventDefault();
      const newArr = orders.slice();
      newArr.push(prd)
      setOrders(newArr);
    }


    return (
      <>
	<div className="container mt-5">
	<button className="btn btn-success" 
	  style={{position: 'absolute', right: 30, top: 90}}> 
	  <i className="fas fa-cart-shopping mr-2"></i> 
	  Pedidos: {orders.length}
	</button>

            <h4>
		Bienvenido a Adelicia's Restaurant: 
		<b>{name} {surname}</b>
	    </h4>

	    <div className="card-deck" 
	      style={{marginTop: 100, marginBottom: 20}}>
		      {products.map((prd, index) => (
			<div className="card" key={prd.id} 
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
		      ))}
	      </div>
        </div>
      </>
        
    )
}

export default ProductList;

