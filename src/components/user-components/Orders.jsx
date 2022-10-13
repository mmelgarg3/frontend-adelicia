import {useState, useEffect, history} from 'react';
import axios from 'axios';
import { useHistory} from "react-router-dom"
import SweetAlert from 'react-bootstrap-sweetalert';
import { api_route } from './../../environment.js';


export default function Orders(){

  const [products, setProducts] = useState([]);
  const [userId, setUserId] = useState('');
  const history = useHistory();
  const [show, setShow] = useState(false);

  useEffect(() =>{
    getData();
  }, []);

  const getData = ()=>{
    const data = window.localStorage.getItem('orders');
    if(data !== null) setProducts(JSON.parse(data));
    const storage_data = window.localStorage.getItem('user');
    if(storage_data !== null) setUserId(JSON.parse(storage_data).userId);
  }

  const handleClick = (e)=>{
    e.preventDefault();
    setShow(true);
  }

  const redirectPage = async()=>{
    let sum = 0;
    products.forEach(el =>{
      console.log(el);
      sum += parseInt(el.precio);
    });
    const resp = await axios.post(`${api_route}/create-order`,{
      userId: userId,
      products: products,
      total: sum,
    });
    window.localStorage.removeItem('orders');
    history.push("/client-dash");
  }


  return(
    <>


    {show &&
      <SweetAlert
	success
	title="Orden Confirmada, su orden pasara a Cocina :D"
	onConfirm={redirectPage}
      >
	I did it!
      </SweetAlert>
    }
      <h2 className="card-title ml-4 mt-4 text-primary">Mis Pedidos </h2>
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
