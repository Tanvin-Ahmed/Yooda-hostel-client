import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import "./spinnerAndMessage.scss";

const SpinnerAndMessage = ({ status, loading }) => {
	return (
		<div className="spinnerContainer">
			{loading ? (
				<div className="loadingMessage">
					<CircularProgress />
				</div>
			) : null}

			{status?.message ? (
				<div className="loadingMessage">
					<small className={status?.error ? "warning" : "success"}>
						{status?.message}
					</small>
				</div>
			) : null}
		</div>
	);
};

export default SpinnerAndMessage;
