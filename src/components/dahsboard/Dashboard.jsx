import React, { useState, useEffect, useRef } from "react";
import "./Dashboard.scss";
import Navigation from "../shared/navigation/Navigation";
import { deleteStudent, getStudents } from "../../utils/studentAPIs";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import withFetchingState from "../HOC/withFetchingState";

const Dashboard = ({
	setSelectedStudent,
	status,
	setStatus,
	loading,
	setLoading,
	dataList,
	setDataList,
}) => {
	const navigate = useNavigate();
	const [updateLoading, setUpdateLoading] = useState(false);
	const pageRef = useRef(1);
	const selectedIdRef = useRef("");
	useEffect(() => {
		getStudents(pageRef.current, setLoading, setStatus, setDataList);
		pageRef.current++;
		const fetchMore = ev => {
			if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
				// you're at the bottom of the page
				getStudents(pageRef.current, setLoading, setStatus, setDataList);
				pageRef.current++;
			}
		};
		window.addEventListener("scroll", fetchMore);

		return () => window.removeEventListener("scroll", fetchMore);
	}, [setDataList, setLoading, setStatus]);

	const handleUpdate = info => {
		selectedIdRef.current = info._id;
		setSelectedStudent(info);
		navigate("/add_student");
	};

	const handleDelete = id => {
		if (!id) return;
		deleteStudent(id, setUpdateLoading, setStatus, setDataList);
	};
	return (
		<>
			<Navigation />
			<section className="dashboard">
				<div className="container">
					<h1>DASHBOARD</h1>
					<table>
						<thead>
							<tr>
								<th>Roll</th>
								<th>Name</th>
								<th>Age</th>
								<th>Class</th>
								<th>Hall</th>
								<th>Status</th>
								<th>Manage</th>
							</tr>
						</thead>
						<tbody>
							{dataList?.map((data, index) => (
								<tr key={data?._id || index}>
									<td>{data?.roll}</td>
									<td>{data?.fullName}</td>
									<td>{data?.age}</td>
									<td>{data?.class}</td>
									<td>{data?.hall}</td>
									<td>{data?.status}</td>
									<td>
										<Button onClick={() => handleUpdate(data)}>
											<EditIcon color="primary" />
										</Button>
										<Button onClick={() => handleDelete(data?._id)}>
											<DeleteForeverIcon color="warning" />
										</Button>
										{updateLoading && selectedIdRef.current === data?._id ? (
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

export default withFetchingState(Dashboard);
