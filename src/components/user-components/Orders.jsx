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
      <div className="container">
	{products.map((prd) => (
	    <div className="card" key={prd.id}>
	      <p>{prd.nombre}</p>
	      <p>{prd.descripcion}</p>
	      <p>{prd.precio}</p>
	    </div>
	  ))}
	
      </div>
      <button className="btn btn-danger" onClick={handleClick}> Confirmar Pedido </button>
    </>
  );
}
