import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Register = () => {
	const [ name, setName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ surname, setSurname ] = useState('');
	const [ msg, setMsg ] = useState('');
	const history = useHistory();
	const [ role, setRole ] = useState('');

	const handleChange = (event) => {
		var value = event.target.value;
		console.log(value);
		setRole(value);
	};

	const Register = async (e) => {
		e.preventDefault();
		try {
			await axios.post('http://localhost:5000/users', {
				name: name,
				surname: surname,
				email: email,
				password: password,
				role: role
			});
			history.push('/');
		} catch (error) {
			if (error.response) {
				setMsg(error.response.data.msg);
			}
		}
	};

	return (
		<section className="container">
			<div className="row">
				<div className="col-md-5 mx-auto">
						<div className="card-body">
							<form onSubmit={Register} className="form-group">
								<p className="has-text-centered">{msg}</p>
								<div className="form-group">
									<label className="label">Name</label>
									<div className="form-group">
										<input
											type="text"
											className="form-control"
											placeholder="Name"
											value={name}
											onChange={(e) => setName(e.target.value)}
										/>
									</div>
								</div>
								<div className="">
									<label className="label">Surname</label>
									<div className="form-group">
										<input
											type="text"
											className="form-control"
											placeholder="Surname"
											value={surname}
											onChange={(e) => setSurname(e.target.value)}
										/>
									</div>
								</div>
								<div className="form-group">
									<label className="label">Email</label>
									<div className="form-group">
										<input
											type="text"
											className="form-control"
											placeholder="Email"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
										/>
									</div>
								</div>
								<div className="">
									<label className="label">Password</label>
									<div className="form-group">
										<input
											type="password"
											className="form-control"
											placeholder="******"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
										/>
									</div>
								</div>
								<div className="">
									<label className="label">Confirm Password</label>
									<div className="form-group">
										<select
											className="form-select"
											aria-label="Default select"
											onChange={handleChange}
										>
											<option>Seleccione el rol</option>
											<option value="1">Administrador</option>
											<option value="2">Cocinero</option>
											<option value="3">Mesero</option>
											<option value="4">Cliente</option>
										</select>
									</div>
								</div>

								<div className="form-group">
									<button className="btn btn-success btn-block">Register</button>
								</div>
							</form>
						</div>
					</div>
			</div>
		</section>
	);
};

export default Register;
