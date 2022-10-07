import axios from "axios";
import { useState, useEffect, useRef } from "react";


const AdminDashboard = () => {

  const [data, setData] = useState([]);
  const [seletedOption, setSelectedOption] = useState(0);
  const [selectedItem, setSelectedItem] = useState('Ver todo');
  const [refData, setRefData] = useState([]);
  const field = useRef(null);

  const getData = async()=>{
    try{
      const response = await axios.get("http://localhost:5000/all-info");
      // setData(response.data);
      removeDuplicates(response.data);
      removeDuplicates2(response.data);
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
    setSelectedItem(e.nativeEvent.target.text);
  }

  function removeDuplicates(arr) {
    const new_arr =  arr.filter((item,index) => arr.indexOf(item) === index);
    setData(new_arr);
  }

  function removeDuplicates2(arr) {
    const new_arr =  arr.filter((item,index) => arr.indexOf(item) === index);
    setRefData(new_arr);
  }

  const filterByPedido = ()=>{
    // console.log(field.current.value);
    const new_arr = data.filter((el) => {
      // console.log("idP: ", el.idPedido);
      if(parseInt(el.idPedido) === parseInt(field.current.value)){
	return el;
      }
    });
    // console.log(new_arr);
    setData(new_arr);
  }

  const filterByProduct = ()=>{
    const new_arr = data.filter((el)=>{
      if(parseInt(el.idProducto) === parseInt(field.current.value)){
	return el;
      }
    });
    setData(new_arr);
  }


  const filterByClient = ()=>{
    const new_arr = data.filter((el)=>{
      if(el.Usuario === field.current.value){
	return el;
      }
    });
    setData(new_arr);
  }

  const handleClick = (e)=>{
    if(seletedOption == 1){
      filterByProduct();
    }
    if(seletedOption == 2){
      filterByPedido();
    }
    if(seletedOption == 3){
      filterByClient();
    }
    if(seletedOption == 0){
      getData();
    }
  }


  const handleReset = ()=>{
    getData();
    field.current.value = "";
    setSelectedItem('Ver Todo')
  }



  return(
    <>
    <div className="container" style={{marginTop: 35}}>
      <div className="row">
	<div className="col-md-5">
	  <div className="form-group">
	    <input type="text" ref={field} placeholder="Campo Requerido" className='form-control'/>
	  </div>
	</div>
	<div className="col-md-5">
	  <div className="form-group">
	    <select className='form-control' onChange={handleChange} value={selectedItem}>
	      <option value="0">Ver Todo</option>
	      <option value="1">Filtrar por ID Producto</option>
	      <option value="2">Filtrar por No. Pedido</option>
	      <option value="3">Filtrar por Cliente</option>
	    </select>
	  </div>
	</div>
	<div className="col">
	  <button className="btn btn-success" onClick={handleClick}>Filtrar</button>
	  <button className="btn btn-danger ml-2" onClick={handleReset}>Reset</button>
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
		    <th scope="col">Fecha</th>
		    <th scope="col">Descripcion</th>
		    <th scope="col">Cliente</th>
		    <th scope="col">Total del Pedido</th>
		  </tr>
		</thead>
		<tbody className="text-center">
		  {data.map((el, index) => (
		    <tr key={el.idPedido+el.idProducto}>
		      <th scope="row">{el.idPedido}</th>
		      <td>{el.nombre}</td>
		      <td>{el.fecha}</td>
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

