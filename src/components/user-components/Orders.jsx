import {useState, useEffect} from 'react';


export default function Orders(){

  const [products, setProducts] = useState([]);

  useEffect(() =>{
    getData();
  });

  const getData = ()=>{
    const data = window.localStorage.getItem('orders');
    if(data !== null) setProducts(JSON.parse(data));

  }

  const handleClick = (e)=>{
    e.preventDefault();
    window.localStorage.removeItem('orders');
    alert("Orders clean up");
  }


  return(
    <>

      <h2 className="card-title ml-4 mt-4 text-primary">Mis Pedidos</h2>
      <div className="container" style={{marginTop: 80}}>
	<div className="row">
	  <div className="col-md-8 mx-auto">
	    <div className="table">
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
	    </div>
	    <button className="btn btn-success mt-4" onClick={handleClick}> Confirmar Pedido </button>
	  </div>
	</div>
      </div>
    </>
  );
}
