import React, { useState, useRef, useEffect } from "react";
import "./ManageFoodList.scss";
import CircularProgress from "@mui/material/CircularProgress";
import { deleteFood, getFoods } from "../../utils/foodAPIs";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";
import Navigation from "../shared/navigation/Navigation";
import withFetchingState from "../HOC/withFetchingState";

const ManageFoodList = ({
	setSelectedFoodItem,
	status,
	setStatus,
	loading,
	setLoading,
	dataList,
	setDataList,
}) => {
	const navigate = useNavigate();
	const [deleteLoading, setDeleteLoading] = useState(false);
	const pageRef = useRef(1);
	const selectedFoodRef = useRef({});

	useEffect(() => {
		getFoods(pageRef.current, setLoading, setStatus, setDataList);
		pageRef.current++;
		const fetchMore = ev => {
			if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
				// you're at the bottom of the page
				getFoods(pageRef.current, setLoading, setStatus, setDataList);
				pageRef.current++;
			}
		};
		window.addEventListener("scroll", fetchMore);

		return () => window.removeEventListener("scroll", fetchMore);
	}, [setDataList, setLoading, setStatus]);

	const handleUpdate = info => {
		if (!info) return;
		selectedFoodRef.current = info._id;
		setSelectedFoodItem(info);
		navigate("/add_food");
	};

	const handleDelete = id => {
		deleteFood(id, setDeleteLoading, setStatus, setDataList);
	};

	return (
		<>
			<Navigation />
			<section className="manageFoodList">
				<div className="container">
					<h1>FOOD LIST</h1>
					<table>
						<thead>
							<tr>
								<th>Name</th>
								<th>Price</th>
								<th>Manage</th>
							</tr>
						</thead>
						<tbody>
							{dataList?.map((data, index) => (
								<tr key={data?._id || index}>
									<td>{data?.name}</td>
									<td>{data?.price}</td>
									<td>
										<Button onClick={() => handleUpdate(data)}>
											<EditIcon color="primary" />
										</Button>
										<Button onClick={() => handleDelete(data?._id)}>
											<DeleteForeverIcon color="warning" />
										</Button>
										{deleteLoading && selectedFoodRef.current === data?._id ? (
											<div className="loadingMessage">
												<CircularProgress fontSize="small" />
											</div>
										) : null}
										{status?.error ? (
											<div className="loadingMessage">
												<small className="warning">{status?.message}</small>
											</div>
										) : null}
									</td>
								</tr>
							))}
						</tbody>
					</table>
					{loading ? (
						<div className="loadingMessage">
							<CircularProgress />
						</div>
					) : null}
				</div>
			</section>
		</>
	);
};

export default withFetchingState(ManageFoodList);
