import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
	const location = useLocation();
	const userAuth = sessionStorage.getItem("admin");
	return userAuth ? (
		children
	) : (
		<Navigate to="/login" replace state={{ from: location }} />
	);
};

export default PrivateRoute;
