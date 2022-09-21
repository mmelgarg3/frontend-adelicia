export default function Orders(){



  const handleClick = (e)=>{
    e.preventDefault();
    window.localStorage.removeItem('orders');
    alert("Orders clean up");
  }


  return(
    <>
      <button className="btn btn-danger" onClick={handleClick}> Confirmar Pedido </button>
    </>
  );
}
