import React, { useState, useEffect, useRef } from "react";
import { getAllFood } from "../../utils/foodAPIs";
import withFetchingState from "../HOC/withFetchingState";
import "./FoodDistribution.scss";
import CircularProgress from "@mui/material/CircularProgress";
import { findOneStudent } from "../../utils/studentAPIs";
import SpinnerAndMessage from "../shared/spinnerAndMessage/SpinnerAndMessage";
import { addDistribution } from "../../utils/distributionAPIs";
import Navigation from "../shared/navigation/Navigation";

const FoodDistribution = ({
	dataList,
	setDataList,
	loading,
	setLoading,
	status,
	setStatus,
}) => {
	const [roll, setRoll] = useState("");
	const [meal, setMeal] = useState("breakfast");
	const [studentInfo, setStudentInfo] = useState({});
	const [studentDataFetchStatus, setStudentDataFetchStatus] = useState({
		message: "",
		error: false,
	});
	const [studentDataFetchLoading, setStudentDataFetchLoading] = useState(false);
	const [serveStatus, setServeStatus] = useState({
		message: "",
		error: false,
	});
	const [serveLoading, setServeLoading] = useState(false);
	const selectedItemsRef = useRef([]);

	useEffect(() => {
		getAllFood(setLoading, setStatus, setDataList);
	}, [setLoading, setStatus, setDataList]);

	const handleRoll = e => {
		setRoll(e.target.value);
	};

	const handleSelect = e => {
		setMeal(e.target.value);
	};

	const handleCheck = (e, foodId) => {
		if (e.target.checked) {
			selectedItemsRef.current.push(foodId);
		} else {
			selectedItemsRef.current = selectedItemsRef.current.filter(
				item => item !== foodId
			);
		}
	};

	const handleFindStudent = e => {
		e.preventDefault();
		findOneStudent(
			roll,
			setStudentDataFetchLoading,
			setStudentDataFetchStatus,
			setStudentInfo
		);
	};

	const handleServeFood = e => {
		e.preventDefault();
		if (!studentInfo?._id) return;
		const data = {
			studentId: studentInfo?._id,
			date: [new Date().toDateString()],
			status: [{ [new Date().toDateString()]: [meal] }],
			foodItemList: {
				[`${new Date().toDateString()} -- ${meal}`]: selectedItemsRef.current,
			},
		};
		addDistribution(data, setServeLoading, setServeStatus);
	};
	return (
		<>
			<Navigation />
			<section className="foodDistribution">
				<div className="container">
					<h3>FIND STUDENT</h3>
					<form onSubmit={handleFindStudent}>
						<input
							value={roll}
							onChange={handleRoll}
							type="text"
							placeholder="search roll"
							required
						/>
						<button type="submit">Find</button>
						<SpinnerAndMessage
							status={studentDataFetchStatus}
							loading={studentDataFetchLoading}
						/>
					</form>
				</div>
				{studentInfo?._id ? (
					<div className="container">
						<h5>Name: {studentInfo?.fullName}</h5>{" "}
						<small>Class: {studentInfo?.class}</small>{" "}
						<small>Hall: {studentInfo?.hall}</small>{" "}
						<small>status: {studentInfo?.class}</small>{" "}
					</div>
				) : null}
				<div className="container">
					<h1>DISTRIBUTION</h1>
					<form onSubmit={handleServeFood}>
						<select value={meal} onChange={handleSelect}>
							<option value="breakfast">Breakfast</option>
							<option value="lunch">Lunch</option>
							<option value="dinner">Dinner</option>
						</select>
						<input type="date" />

						{loading ? (
							<div className="loadingMessage">
								<CircularProgress />
							</div>
						) : (
							<table>
								<thead>
									<tr>
										<th>Food</th>
										<th>Price</th>
										<th>Select</th>
									</tr>
								</thead>
								<tbody>
									{dataList?.map(data => (
										<tr key={data._id}>
											<td>{data?.name}</td>
											<td>{data?.price}</td>
											<td>
												<input
													type="checkbox"
													onChange={e => handleCheck(e, data?._id)}
												/>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						)}

						{status?.error ? (
							<div className="loadingMessage">
								<small className="warning">
									{status?.message || "Can't get food items!"}
								</small>
							</div>
						) : null}

						<button type="submit">Serve Food</button>
					</form>
					<SpinnerAndMessage status={serveStatus} loading={serveLoading} />
				</div>
			</section>
		</>
	);
};

export default withFetchingState(FoodDistribution);
