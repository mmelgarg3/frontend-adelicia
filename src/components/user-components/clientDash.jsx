import axios from "axios";
import jwt_decode from "jwt-decode";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import './style/clientDash.css'

export default function ClientDash(){

  const [token, setToken] = useState('');
  const [expire, setExpire] = useState('');
  const [userId, setUserId] = useState('');
  const [run, setRun] = useState(true);
  const history = useHistory();
  const [data, setData] = useState([]);

  async function revisar(){
      const response = await axios.get('http://localhost:5000/all-orders', {
	params:{
	  id: userId
	}
      });
      console.log(response.data);

  }

  function main(){
    revisar();
  }



  const getData = async () => {
    console.log(userId);
    const response = await axios.get("http://localhost:5000/all-orders",{
	params:{
	  id: userId
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
    refreshToken();
    if (run) {
      interval = setInterval(() => {
	refreshToken();
        getData();
      }, 5000);
    } else if (!run) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [run]);





  const refreshToken = async () => {
	try {
            const response = await axios.get('http://localhost:5000/token');
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
	    console.log(decoded);
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

  const handleChange = (id)=>{
    const new_arr = data;
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
    // setData(new_arr);
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
