import React, { useState } from "react";
import "./Login.scss";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
	let navigate = useNavigate();
	let location = useLocation();
	console.log(location);
	let { from } = location.state || { from: { pathname: "/" } };
	const [email, setEmail] = useState("");
	const handleSubmit = e => {
		e.preventDefault();
		sessionStorage.setItem("admin", JSON.stringify(email));
		navigate(from);
	};
	return (
		<section className="login">
			<div className="container">
				<h1>ADMIN</h1>
				<form onSubmit={handleSubmit}>
					<input
						value={email}
						onChange={e => setEmail(e.target.value)}
						type="email"
						required
						placeholder="Any Email..."
					/>
					<button type="submit">Submit</button>
				</form>
			</div>
		</section>
	);
};

export default Login;
