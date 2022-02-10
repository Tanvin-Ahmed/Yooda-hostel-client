import React from "react";
import "./Home.scss";
import Navigation from "../shared/navigation/Navigation";

const Home = () => {
	return (
		<>
			<Navigation />
			<section className="home">
				<div className="container">
					<h1>Welcome to Yooda Hostel</h1>
				</div>
			</section>
		</>
	);
};

export default Home;
