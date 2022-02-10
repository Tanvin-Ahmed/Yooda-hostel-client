import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
	const userAuth = sessionStorage.getItem("admin");
	return userAuth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
