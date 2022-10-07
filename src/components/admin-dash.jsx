import axios from "axios";
import { useState, useEffect } from "react";


const AdminDashboard = () => {

  const [data, setData] = useState([]);

  const getData = async()=>{
    try{
      const response = await axios.get("http://localhost:5000/all-info");
      setData(response.data);
      console.log(response.data);
    }catch(err){
      console.log(err);
    }

  }

  useEffect(()=>{
    getData();
  }, []);




  return(
    <>
    <div className="container" style={{marginTop: 80}}>
	<div className="row">
	  <div className="col-md-9 mx-auto">
	      <table className="table table-striped">
		<thead className="thead-dark">
		  <tr className="text-center">
		    <th scope="col">No. Pedido</th>
		    <th scope="col">Producto</th>
		    <th scope="col">Descripcion</th>
		    <th scope="col">Cliente</th>
		    <th scope="col">Total del Pedido</th>
		  </tr>
		</thead>
		<tbody className="text-center">
		  {data.map((el, index) => (
		    <tr key={el.idPedido}>
		      <th scope="row">{el.idPedido}</th>
		      <td>{el.nombre}</td>
		      <td>{el.descripcion}</td>
		      <td>{el.Usuario}</td>
		      <td>Q.{el.totalPedido}</td>
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

export default AdminDashboard;

