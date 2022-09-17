import React, { useState } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const [role, setRole] = useState('');
    const history = useHistory();

    const Auth = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/login', {
                email: email,
                password: password
            });
	    console.log("Selecionado: ", role);
	    if(role == 1) history.push("/register");
	    if(role == 2) history.push("/cook-dash");
	    if(role == 3) history.push("/waiter-dash");
	    if(role == 4) history.push("/dashboard");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }

  const handleChange =(event)=>{
    var value = event.target.value;
    console.log(value);
    setRole(value);
  }

    return (
        <section className="hero has-background-grey-light is-fullheight is-fullwidth">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-4-desktop">
                            <form onSubmit={Auth} className="box">
                                <p className="has-text-centered">{msg}</p>
                                <div className="field mt-5">
                                    <label className="label">Email</label>
                                    <div className="controls">
                                        <input type="text" className="input" placeholder="Username" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Password</label>
                                    <div className="controls">
                                        <input type="password" className="input" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                </div>
				<div className="field mt-5">
                                    <label className="label">Rol</label>
                                    <div className="controls">
				      <select className="form-select" aria-label="Default select"
				      onChange={handleChange}>
					<option >Seleccione el rol</option>
					<option value="1">Administrador</option>
					<option value="2">Cocinero</option>
					<option value="3">Mesero</option>
					<option value="4">Cliente</option>
				      </select>
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <button className="button is-success is-fullwidth">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login
