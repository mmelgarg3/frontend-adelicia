import {useState, useEffect, history} from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";


export default function Orders(){

  const [products, setProducts] = useState([]);
  const [token, setToken] = useState('');
  const [expire, setExpire] = useState('');
  const [userId, setUserId] = useState('');
  const [total, setTotal] = useState(0);


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
    await axios.post("https://localhost:5000/order",{
      userId: userId,
      total: total
    });
    window.localStorage.removeItem('orders');
    alert("Orders clean up");
  }

  const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:5000/token');
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
	    console.log(decoded);
            setExpire(decoded.exp);
        } catch (error) {
            if (error.response) {
                history.push("/");
            }
        }
    }


  return(
    <>

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
