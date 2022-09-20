
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router-dom';

const ProductList = () => {
    const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [products, setProducts] = useState([]);
    const history = useHistory();

    useEffect(() => {
        refreshToken();
	getProducts();
    }, []);

    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:5000/token');
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
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

    return (
        <div className="container mt-5">
            <h1>Welcome Back: {name}</h1>
            <button onClick={getProducts} className="button is-info">Get Products</button>
                    {products.map((prd, index) => (
                        <tr key={prd.id}>
                            <p>{index + 1}</p>
                            <p>{prd.nombre}</p>
                            <p>{prd.descripcion}</p>
			    <img src={prd.imagen} alt="Imagen lol"/>
			    <b>{prd.precio}</b>
                        </tr>
                    ))}
        </div>
    )
}

export default ProductList;

