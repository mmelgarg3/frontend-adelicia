import React from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Navbar = () => {
    const history = useHistory();

    const Logout = async () => {
        try {
            await axios.delete('http://localhost:5000/logout');
            history.push("/");
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
      <>
	<nav class="navbar navbar-expand-lg navbar-light bg-light">
	  <a class="navbar-brand" href="#">Adelicia's Restaurant</a>
	  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
	    <span class="navbar-toggler-icon"></span>
	  </button>

	  <div class="collapse navbar-collapse" id="navbarSupportedContent">
	    <ul class="navbar-nav mr-auto">
	      <li class="nav-item active">
		<a class="nav-link" href="#">Catalogo<span class="sr-only">(current)</span></a>
	      </li>
	      <li class="nav-item">
		<a class="nav-link" href="#">Pedidos</a>
	      </li>
	    </ul>
	    <form class="form-inline my-2 my-lg-0">
	      <button class="btn btn-outline-danger my-2 my-sm-0" type="button" onClick={Logout}>Logout</button>
	    </form>
	  </div>
	</nav>
      </>
    );

    
}

export default Navbar
