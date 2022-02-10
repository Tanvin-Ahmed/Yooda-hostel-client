import React, { useState } from "react";
import "./AddFood.scss";
import Navigation from "../shared/navigation/Navigation";
import { useNavigate } from "react-router-dom";
import { addFood, updateFood } from "../../utils/foodAPIs";
import SpinnerAndMessage from "../shared/spinnerAndMessage/SpinnerAndMessage";

const AddFood = ({ selectedFoodItem }) => {
	const navigate = useNavigate();
	const [name, setName] = useState(selectedFoodItem?.name || "");
	const [price, setPrice] = useState(selectedFoodItem?.price || "");

	const [loading, setLoading] = useState(false);
	const [status, setStatus] = useState({
		message: "",
		error: false,
	});

	const handleSubmit = e => {
		e.preventDefault();
		const foodData = {
			name,
			price,
		};
		if (selectedFoodItem?._id) {
			foodData._id = selectedFoodItem?._id;
			updateFood(foodData, setLoading, setStatus, navigate);
		} else {
			addFood(foodData, setLoading, setStatus);
		}
	};
	return (
		<>
			<Navigation />
			<section className="addFood">
				<div className="container">
					<h1>{selectedFoodItem?._id ? "UPDATE FOOD" : "ADD FOOD"}</h1>
					<form onSubmit={handleSubmit}>
						<input
							value={name}
							onChange={e => setName(e.target.value)}
							type="text"
							placeholder="Food name"
							required
						/>
						<input
							value={price}
							onChange={e => setPrice(e.target.value)}
							type="text"
							placeholder="Food price"
							required
						/>
						<button type="submit">
							{selectedFoodItem?._id ? "Update" : "Add"}
						</button>
					</form>
					<SpinnerAndMessage loading={loading} status={status} />
				</div>
			</section>
		</>
	);
};

export default AddFood;
