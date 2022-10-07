import axios from "axios";
import { useState, useEffect } from "react";


const AdminDashboard = () => {

  const [data, setData] = useState([]);
  const [seletedOption, setSelectedOption] = useState(1);

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

  const handleChange = (e)=>{
    // console.log(e.target.value);
    setSelectedOption(e.target.value);
  }

  const handleClick = (e)=>{
    console.log(seletedOption);
    if(seletedOption == 1){
      console.log("opcion 1");
    }
    if(seletedOption == 2){
      console.log("opcion 2");
    }
    if(seletedOption == 3){
      console.log("opcon 3");
    }
  }



  return(
    <>
    <div className="container" style={{marginTop: 35}}>
      <div className="row">
	<div className="col-md-5">
	  <div className="form-group">
	    <input type="text" placeholder="Campo Requerido" className='form-control'/>
	  </div>
	</div>
	<div className="col-md-5">
	  <div className="form-group">
	    <select className='form-control' onChange={handleChange}>
	      <option value="1">Filtrar por ID Producto</option>
	      <option value="2">Filtrar por No. Pedido</option>
	      <option value="3">Filtrar por Cliente</option>
	    </select>
	  </div>
	</div>
	<div className="col">
	  <button className="btn btn-success" onClick={handleClick}>Filtrar</button>
	</div>
      </div>
    </div>
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

