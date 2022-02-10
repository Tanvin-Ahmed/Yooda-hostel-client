import React from "react";

const NoMatch = () => {
	return (
		<section
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
				width: "100%",
				height: "70vh",
			}}
		>
			<h1 style={{ fontSize: "3rem", color: "gray", padding: 0, margin: 0 }}>
				PAGE NOT FOUND 😥
			</h1>
			<h3 style={{ fontSize: "2rem", color: "gray", padding: 0, margin: 0 }}>
				404
			</h3>
		</section>
	);
};

export default NoMatch;
