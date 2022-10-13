import React, { useState } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { api_route } from './../environment.js';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [msg, setMsg] = useState('');
	const [role, setRole] = useState('');
	const history = useHistory();

	const Auth = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(`${api_route}/Login`, {
				email: email,
				password: password,
				role: role
			});
			const user = {
			  userId: response.data.userId,
			  userName: response.data.name,
			  userEmail: response.data.email
			}
			window.localStorage.setItem(user, 'user');
			if (role == 1) history.push("/admin-dash");
			if (role == 2) history.push("/cooking-page");
			if (role == 3) history.push("/waiter-dash");
			if (role == 4) history.push("/dashboard");
		} catch (error) {
			if (error.response) {
			    setMsg(error.response.data.msg);
			}
		}
	}

	const handleChange = (event) => {
		var value = event.target.value;
		setRole(value);
	}

	return (
		<section className="container" style={{ marginTop: 100 }}>
			<div className="row">
				<div className="col-md-6 mx-auto">
					<div className="card-body">
						<form onSubmit={Auth} className="box">
							<p className="has-text-centered">{msg}</p>
							<div className="form-group">
								<label className="label">Email</label>
								<div className="controls">
									<input type="text" className="form-control" placeholder="example@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
								</div>
							</div>
							<div className="from-group">
								<label className="label">Password</label>
								<div className="controls">
									<input type="password" className="form-control" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)} />
								</div>
							</div>
							<div className="form-group">
								<label className="label mt-4">Rol</label>
								<div className="">
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
							<div className="form-group">
								<button className="btn btn-success btn-block">Login</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Login
