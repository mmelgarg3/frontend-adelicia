import axios from "axios";
import { useState, useEffect } from "react";
import './style/clientDash.css'
import { api_route } from './../../environment.js';

export default function ClientDash(){

  const [userId, setUserId] = useState('');
  const [run, setRun] = useState(true);
  const [data, setData] = useState([]);


  const getData = async () => {
    const id_data = window.localStorage.getItem('user');
    if(id_data !== null) setUserId(JSON.parse(id_data).userId);
    const response = await axios.get(`${api_route}/all-orders`,{
	params:{
	  id: parseInt(JSON.parse(id_data).userId) 
	}
    });
    if(response.data.length == 0){
      console.log("no hay nada");
    }
    else{
      setData(response.data);
      setRun(false);
    }
  };

  useEffect(() => {
    let interval;
    if (run) {
      interval = setInterval(() => {
	getData()
      }, 5000);
    } else if (!run) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [run]);



  const cancelInApi = async(id)=>{
    try{
      await axios.post(`${api_route}/cancel-order`,{
	id: id
      });
    }catch(err){
      console.log(err);
    }

  }

  const handleChange = (id)=>{
    const updateObjectInArray = (id) => {
    setData(current =>
      current.map(obj => {
        if (obj.id === id) {
          return {...obj, estado: 5};
        }

        return obj;
	}),
      );
    };
    updateObjectInArray(id);
    cancelInApi(id);
  }

  return(
    <>
      
	<div className="container" style={{marginTop: 80}}>
	  <div className="row">
	    <div className="col">
	      <table className="table">
		<thead className="thead-dark">
		  <tr>
		    <th scope="col">#Pedido</th>
		    <th scope="col">fecha</th>
		    <th scope="col">Usuario</th>
		    <th scope="col">Estado</th>
		    <th scope="col">Total</th>
		    <th scope="col">Acciones</th>
		  </tr>
		</thead>
		<tbody>
	      {data.length > 0 && 
		data.map((ord, index) => (
		    <tr key={ord.id}>
		      <th scope="row">{ord.id}</th>
		      <td>{ord.fecha}</td>
		      <td>{ord.idUsuario}</td>
		      {ord.estado === 1 &&  <td className='text-info'>Solicitado</td>}
		      {ord.estado === 2 &&  <td className='text-primary'>Cocinando</td>}
		      {ord.estado === 3 &&  <td className="text-warning">Cocinado</td>}
		      {ord.estado === 5 &&  <td className='text-danger'>Cancelado</td>}
		      {ord.estado === 4 &&  <td className='text-success'>Entregado</td>}
		      <td>Q.{ord.totalPedido}</td>
		      {ord.estado === 1 && 
			<td> <button className='btn btn-danger' onClick={() =>handleChange(ord.id)}>
			  Cancelar
			  </button> 
			</td>}
		    </tr>
		  ))}
		</tbody>
	      </table>
	    </div>
	  </div>
	</div>
      {run &&
	<div className="d-flex flex-column align-items-center justify-content-center">
	  <div className="row">
	    <div className="spinner-border" id="spinner"role="status">
	      <h3 className="sr-only" >Loading... </h3>
	    </div>
	  </div>
	  <div className="row">
	    <strong className='spinner-text'>Cargando Informacion</strong>
	  </div>
	</div>

      }

    </>
  );
}
