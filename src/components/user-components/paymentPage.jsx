  import { useState, useEffect } from "react";



const PaymentPage = ()=>{

  const [paymentOrder, setPaymentOrder] = useState([]);

  const getData = ()=>{
    const data = window.localStorage.getItem('payment-order');
    if(data !== null) setPaymentOrder(JSON.parse(data));
    console.log(data);
  }

  useEffect(()=>{
    getData();
  },[]);


  return(
    <>
    <div className="container" style={{marginTop: 80}}>
      	<div className="row">
	  <div className="col-md-8 mx-auto">
	    <h2 className="text-center">Formulario de Pago</h2>
	    <div className="card p-4">
	      <div className="form-group">
		<label>
		  <input type="checkbox" id="cbox1" value="first_checkbox" /> 
		  Efectivo
		</label>
		<label className="ml-2">
		  <input type="checkbox" id="cbox1" value="first_checkbox" /> 
		  Tarjeta de Credito/Debito
		</label>
	      </div>

	      <div className="form-group">
		<label htmlFor="">Numero de la tarjeta</label>
	      </div>
	      <div className="form-group">
		<input type="text" id="" placeholder="0000 0000 0000 0000" />
	      </div>
	    </div>
	  </div>
	</div>
      </div>
    </>
  );

}

export default PaymentPage;
