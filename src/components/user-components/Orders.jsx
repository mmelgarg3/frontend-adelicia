import {useState, useEffect, history} from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useHistory} from "react-router-dom"


export default function Orders(){

  const [products, setProducts] = useState([]);
  const [token, setToken] = useState('');
  const [expire, setExpire] = useState('');
  const [userId, setUserId] = useState('');
  const [total, setTotal] = useState(0);
  const history = useHistory();

  useEffect(() =>{
    getData();
    refreshToken();
  }, []);

  const getData = ()=>{
    const data = window.localStorage.getItem('orders');
    if(data !== null) setProducts(JSON.parse(data));

  }

  const handleClick = async (e)=>{
    e.preventDefault();
    console.log(products);
    let sum = 0;
    products.forEach(el =>{
      console.log(el);
      sum += parseInt(el.precio);
    });
    const resp = await axios.post("http://localhost:5000/create-order",{
      userId: userId,
      total: sum 
    });
    window.localStorage.removeItem('orders');
    alert("Orders clean up");
    history.push("/cooking-page");
  }

  const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:5000/token');
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setExpire(decoded.exp);
	    setUserId(decoded.userId);
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
	    setUserId(decoded.userId);
            setExpire(decoded.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

  const handleClickOrders = ()=>{
    history.push("client-dash");
  }



  return(
    <>

    <button onClick={handleClickOrders} 
      className="btn btn-warning text-white" style={{position: 'absolute', top: 80, right: 20}}>
      Ver Pedidos en Espera
    </button>
      <h2 className="card-title ml-4 mt-4 text-primary">Mis Pedidos</h2>
      <div className="container" style={{marginTop: 80}}>
	<div className="row">
	  <div className="col-md-8 mx-auto">
	    <table className="table">
	      <thead className="thead-dark">
		<tr>
		  <th scope="col">#</th>
		  <th scope="col">Pedido</th>
		  <th scope="col">Descripcion</th>
		  <th scope="col">Precio</th>
		</tr>
	      </thead>
	      <tbody>
		{products.map((prd, index) => (
		  <tr key={prd.id}>
		    <th scope="row">{index}</th>
		    <td>{prd.nombre}</td>
		    <td>{prd.descripcion}</td>
		    <td>Q.{prd.precio}</td>
		  </tr>
		))}
	      </tbody>
	    </table>
	    <button className="btn btn-success mt-4" onClick={handleClick}> Confirmar Pedido </button>
	  </div>
	</div>
      </div>
    </>
  );
}
