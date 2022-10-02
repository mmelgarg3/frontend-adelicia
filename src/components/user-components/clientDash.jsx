import axios from "axios";
import jwt_decode from "jwt-decode";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";

export default function ClientDash(){

  const [token, setToken] = useState('');
  const [expire, setExpire] = useState('');
  const [userId, setUserId] = useState('');
  const [run, setRun] = useState(true);
  const history = useHistory();
  const [data, setData] = useState([]);

  async function revisar(){
      const response = await axios.get('http://localhost:5000/all-orders');
      console.log(response.data);

  }

  function main(){
    revisar();
  }



  const getData = async () => {
    const response = await axios.get("http://localhost:5000/all-orders");
    if(response.data.length == 0){
      console.log("no hay nada");
    }
    else{
      console.log(response.data);
      setData(response.data);
      setRun(false);
    }
  };

  useEffect(() => {
    let interval;
    if (run) {
      interval = setInterval(() => {
        console.log("ejecutando");
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
    // const new_arr = data.filter(el => el.id !== id);
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
		    <th scope="col">#</th>
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
		      <th scope="row">{index}</th>
		      <td>{ord.fecha}</td>
		      <td>{ord.idUsuario}</td>
		      {ord.estado === 1 &&  <td>Solicitado</td>}
		      {ord.estado === 2 &&  <td className='text-primary'>Cocinando</td>}
		      {ord.estado === 3 &&  <td className="text-success">Cocinado</td>}
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
	<div className="spinner-border" role="status">
	  <span className="sr-only">Loading...</span>
	</div>
      }
    </>
  );
}
