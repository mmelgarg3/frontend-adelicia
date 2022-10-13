import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import {api_route} from "././../environment.js";

export default function WaiterDashboard(){
  const [orders, setOrders] = useState([]);
  const history = useHistory();

  useEffect(()=>{
    getOrders();
  }, []);

  const getOrders = async () => {
      const response = await axios.get(`${api_route}/orders`, {
	params: {
	  estado: 3
	},
      });
      setOrders(response.data);
  }


  const addOrderToPayment = (ord)=>{
    window.localStorage.setItem('payment-order', JSON.stringify(ord));
    history.push("/payment-page");
  }





  return(
      <>
	<h2 className="card-title ml-4 mt-4 text-warning">Ordenes Cocinadas</h2>
	<div className="container" style={{marginTop: 80}}>
	  <div className="row">
	    <div className="col-md-8 mx-auto">
	      <table className="table table-striped">
		<thead className="thead-dark">
		  <tr className="text-center">
		    <th scope="col">#</th>
		    <th scope="col">fecha</th>
		    <th scope="col">Usuario</th>
		    <th scope="col">Estado</th>
		    <th scope="col">Total</th>
		    <th scope="col">Acciones</th>
		  </tr>
		</thead>
		<tbody className="text-center">
		  {orders.map((ord, index) => (
		    <tr key={ord.id}>
		      <th scope="row">{index}</th>
		      <td>{ord.fecha}</td>
		      <td>{ord.idUsuario}</td>
		      <td>Cocinado</td>
		      <td>Q.{ord.totalPedido}</td>
		      <td>
			<button onClick={(e) => addOrderToPayment(ord)} className="btn btn-success">
			  Terminar Pedido
			</button>
		      </td>
		    </tr>
		  ))}
		</tbody>
	      </table>
	    </div>
	  </div>
	</div>
      </>
  );
}
