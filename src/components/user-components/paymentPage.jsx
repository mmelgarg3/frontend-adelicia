  import { useState, useEffect, useRef } from "react";



const PaymentPage = ()=>{

  const [paymentOrder, setPaymentOrder] = useState([]);
  const [val, setVal] = useState('');
  const inputCvv = useRef(null);

  const getData = ()=>{
    const data = window.localStorage.getItem('payment-order');
    if(data !== null) setPaymentOrder(JSON.parse(data));
    console.log(data);
  }


  const handleChange = (e) => {
    setVal(e.target.value);
  };


  function cc_format(value) {
    const v = value
      .replace(/\s+/g, "")
      .replace(/[^0-9]/gi, "")
      .substr(0, 16);
    const parts = [];

    for (let i = 0; i < v.length; i += 4) {
      parts.push(v.substr(i, 4));
    }

    return parts.length > 1 ? parts.join(" ") : value;
  }

  const cvvChange = ()=>{

  }


  function formatString(event) {
    var inputChar = String.fromCharCode(event.keyCode);
    var code = event.keyCode;
    var allowedKeys = [8];
    if (allowedKeys.indexOf(code) !== -1) {
      return;
    }

    event.target.value = event.target.value.replace(
      /^([1-9]\/|[2-9])$/g, '0$1/' // 3 > 03/
    ).replace(
      /^(0[1-9]|1[0-2])$/g, '$1/' // 11 > 11/
    ).replace(
      /^([0-1])([3-9])$/g, '0$1/$2' // 13 > 01/3
    ).replace(
      /^(0?[1-9]|1[0-2])([0-9]{2})$/g, '$1/$2' // 141 > 01/41
    ).replace(
      /^([0]+)\/|[0]+$/g, '0' // 0/ > 0 and 00 > 0
    ).replace(
      /[^\d\/]|^[\/]*$/g, '' // To allow only digits and `/`
    ).replace(
      /\/\//g, '/' // Prevent entering more than 1 `/`
    );
  }

  useEffect(()=>{
    getData();
  },[]);


  const handleSubmit = ()=>{
    

  }


  return(
    <>
    <div className="container" style={{marginTop: 80}}>
      	<div className="row">
	  <div className="col-md-6 mx-auto">
	    <h2 className="text-center">Formulario de Pago</h2>
	    <div className="card p-4 mt-4">
	      <div className="row pt-2 pl-3">
		<div class="form-check">
		  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
		  <label class="form-check-label" for="flexRadioDefault1">
		    Pago con tarjeta 
		  </label>
		</div>
		<div class="form-check ml-4">
		  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked/>
		  <label class="form-check-label" for="flexRadioDefault2">
		    Pago en efectivo
		  </label>
		</div>
	      </div>
	      
	      <br/>

	      <label htmlFor="">Numero de la tarjeta</label>
	      <div className="row">
		<div className="form-group ml-3">
		  <input type="tel" onChange={handleChange} 
		  value={cc_format(val)}
		  placeholder="0000 0000 0000 0000" />
		</div>
		<div className="form-group ml-3">
		    <input type="text" onKeyUp={formatString} 
		    placeholder="Fecha de Expiracion" />
		</div>
		<div className="form-group ml-3">
		    <input type="number" ref={inputCvv} placeholder="CVV"/>
		</div>
	      </div>
	      <h5> Monto total a facturar: <b>{}</b> </h5>
	      <button className='btn btn-success' onClick={handleSubmit}>Realizar Cobro</button>
	    </div>
	  </div>
	</div>
      </div>
    </>
  );

}

export default PaymentPage;
