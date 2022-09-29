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
      const response = await axios.get('http://localhost:5000/orders', {
	params: {
	  estado: 3
	},
      });
      console.log(response.data);

  }

  function main(){
    revisar();
  }



  const getData = async () => {
    const response = await axios.get("http://localhost:5000/orders", {
      params: {
        estado: 3
      }
    });
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


  return(
    <>
      {data.length > 0 &&
	data.map(el => ( <p key={el.id}>{el.totalPedido}</p>))
      }
      {run &&
	<div className="spinner-border" role="status">
	  <span className="sr-only">Loading...</span>
	</div>
      }
    </>
  );
}
