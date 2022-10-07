import axios from "axios";
import { useState, useEffect } from "react";


const AdminDashboard = () => {

  const getData = async()=>{
    try{
      const response = await axios.get("http://localhost:5000/all-info");
      console.log(response);
    }catch(err){
      console.log(err);
    }

  }

  useEffect(()=>{
    getData();
  });




  return(
    <>
      <div className="container">
	<div className="row">
	  <h2>Vista de Administrador</h2>
	</div>
      </div>
    </>
  );
}

export default AdminDashboard;

