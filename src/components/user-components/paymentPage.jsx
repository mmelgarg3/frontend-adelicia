import { useState, useEffect, useRef } from "react";
import { useHistory } from 'react-router-dom';
import axios from "axios";
import SweetAlert from 'react-bootstrap-sweetalert';



const PaymentPage = ()=>{

  const [paymentOrder, setPaymentOrder] = useState([]);
  const [val, setVal] = useState('');
  const inputCvv = useRef(null);
  const inputDate = useRef(null);
  const [checkedState, setCheckedState] = useState('');
  const [vuelto, setVuelto] = useState(0);
  const [show, setShow] = useState(false);

  const history = useHistory();
  const getData = ()=>{
    const data = window.localStorage.getItem('payment-order');
    if(data !== null) setPaymentOrder(JSON.parse(data));
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


  const handleSubmit = async()=>{
    setShow(true);
    const CardNumber = val.replace(/\s/g, '');
    try{
      await axios.post("http://localhost:3000/create-invoice",{
	total: paymentOrder.totalPedido,
	idOrder: paymentOrder.id,
	idTypePayment: 1,
	nCard: CardNumber 
      });
    }
    catch(err){
      console.log(err);
    }
  }

  const redirectPage = ()=>{
    window.localStorage.removeItem('payment-order');
    history.push("waiter-dash");
  }

  const cashSubmit = async()=>{
    setShow(true);
    try{
      await axios.post("http://localhost:3000/create-invoice",{
	total: paymentOrder.totalPedido,
	idOrder: paymentOrder.id,
	idTypePayment: 2,
	nCard: 0 
      });
    }
    catch(err){
      console.log(err);
    }
  }



  const handleRadioChange = (event)=>{
    setCheckedState(event.target.value);
  }

  const changeAmount = (e)=>{
    var total = parseInt(paymentOrder.totalPedido);
    var amount = parseInt(e.target.value);
    var vuelto = total - amount;
    setVuelto(vuelto);
  }


  return(
    <>
    { show &&
      <SweetAlert
	warning	
	title="Pago realizado, el producto estara visible para el cliente!"
	onConfirm={redirectPage}
      >
	
      </SweetAlert>

    }
    <div className="container" style={{marginTop: 80}}>
      	<div className="row">
	  <div className="col-md-6 mx-auto">
	    <h2 className="text-center">Formulario de Pago</h2>
	    <div className="card p-4 mt-4">
	      <div className="row pt-2 pl-3">
		<div className="form-check">
		  <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"
		  onChange={handleRadioChange} checked={checkedState === 'tarjeta'} value="tarjeta"/>
		  <label className="form-check-label">
		    Pago con tarjeta 
		  </label>
		</div>
		<div className="form-check ml-4">
		  <input className="form-check-input" type="radio" onChange={handleRadioChange}
		    name="flexRadioDefault"  id="flexRadioDefault2" checked={checkedState === 'efectivo'} value="efectivo"/>
		  <label className="form-check-label" >
		    Pago en efectivo
		  </label>
		</div>
	      </div>
	      
	      <br/>
	      { checkedState === 'tarjeta' &&
		<div>
		  <label htmlFor="">Numero de la tarjeta</label>
		  <div className="row">
		    <div className="form-group ml-3">
		      <input type="tel" onChange={handleChange} 
		      value={cc_format(val)}
		      placeholder="0000 0000 0000 0000" />
		    </div>
		    <div className="form-group ml-3">
			<input type="text" onKeyUp={formatString} ref={inputDate}
			placeholder="Fecha de Expiracion" />
		    </div>
		    <div className="form-group ml-3">
			<input type="text" ref={inputCvv} placeholder="CVV"/>
		    </div>
		  </div>
		  <h5> Monto total a facturar: <b className='text-danger'>Q. 
		    {paymentOrder.totalPedido}</b> 
		  </h5>
		  <button className='btn btn-success mt-4' onClick={handleSubmit}>Realizar Cobro</button>
		</div>
		}
		
		{ checkedState === 'efectivo' &&
		    <div className="form-group">
		      <input className='form-control' type="text" onChange={changeAmount} placeholder="Monto a recibir"/>
		      <br/>
		      <input type="text" className='form-control'  value={vuelto} placeholder="Vuelto" readOnly/>
		      <div className="mt-4">
			<h5> Monto total a facturar: <b className='text-danger'>Q. 
			  {paymentOrder.totalPedido}</b> 
			</h5>
		      </div>
		      <button className='btn btn-success mt-3 btn-block' onClick={cashSubmit}>
			Realizar Cobro
		      </button>
		      <p className="text-muted text-center mt-2" 
		      style={{fontSize: 13}}>
			Al realizar el cobro automaticamente la caja dara el vuelto correspondiente
		      </p>
		    </div>
		}
	    </div>
	  </div>
	</div>
      </div>
    </>
  );

}

export default PaymentPage;
