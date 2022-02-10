import React, { useEffect, useRef, useState } from "react";
import { getStudents, updateStudentStatus } from "../../utils/studentAPIs";
import "./UpdateStudentStatus.scss";
import CircularProgress from "@mui/material/CircularProgress";
import Navigation from "../shared/navigation/Navigation";
import { Button } from "@mui/material";
import withFetchingState from "../HOC/withFetchingState";

const UpdateStudentStatus = ({
	status,
	setStatus,
	loading,
	setLoading,
	dataList,
	setDataList,
}) => {
	const [updateLoading, setUpdateLoading] = useState(false);
	const [selectedStudents, setSelectedStudents] = useState({});
	const pageRef = useRef(1);
	const updateStatusRef = useRef("");
	const selectedStudentsIdRef = useRef([]);
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

	const handleCheck = (e, id, status) => {
		if (!id) return;
		if (e.target.checked) {
			if (!updateStatusRef.current) {
				updateStatusRef.current = status;
			}
			selectedStudentsIdRef.current.push(id);
		} else {
			selectedStudentsIdRef.current = selectedStudentsIdRef.current.filter(
				Id => Id !== id
			);
		}
		const info = {
			updateStatus:
				updateStatusRef.current === "active" ? "inactive" : "active",
			ids: selectedStudentsIdRef.current,
		};
		setSelectedStudents(info);
	};

	const bulkActionToUpdate = () => {
		if (!selectedStudents?.ids?.length) return;
		updateStudentStatus(
			selectedStudents,
			setUpdateLoading,
			setStatus,
			setDataList
		);
	};

	return (
		<>
			<Navigation />
			<section className="studentList">
				<div className="container">
					<h1>MANAGE STUDENT STATUS</h1>
					<Button onClick={bulkActionToUpdate}>Update</Button>
					<br />
					{updateLoading ? (
						<div className="loadingMessage">
							<CircularProgress />
						</div>
					) : null}
					<br />
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
										<input
											type="checkbox"
											onChange={e => handleCheck(e, data?._id, data?.status)}
										/>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				{loading ? (
					<div className="loadingMessage">
						<CircularProgress />
					</div>
				) : null}

				{status?.error ? (
					<div className="loadingMessage">
						<small className="warning">{status?.message}</small>
					</div>
				) : null}
			</section>
		</>
	);
};

export default withFetchingState(UpdateStudentStatus);
