import React, { useState } from "react";
import { addStudent, updateStudentInfo } from "../../utils/studentAPIs";
import Navigation from "../shared/navigation/Navigation";
import "./AddStudent.scss";
import { useNavigate } from "react-router-dom";
import SpinnerAndMessage from "../shared/spinnerAndMessage/SpinnerAndMessage";

const AddStudent = ({ selectedStudent, setSelectedStudent }) => {
	const navigate = useNavigate();
	const [fullName, setFullName] = useState(selectedStudent?.fullName || "");
	const [age, setAge] = useState(selectedStudent?.age || "");
	const [studentClass, setStudentClass] = useState(
		selectedStudent?.class || ""
	);
	const [roll, setRoll] = useState(selectedStudent?.roll || "");
	const [hall, setHall] = useState(selectedStudent?.hall || "");
	const [status, setStatus] = useState(selectedStudent?.status || "active");

	const [loading, setLoading] = useState(false);
	const [queryStatus, setQueryStatus] = useState({
		message: "",
		error: false,
	});

	const handleSubmit = e => {
		e.preventDefault();
		const studentInfo = {
			fullName,
			age,
			class: studentClass,
			roll,
			hall,
			status,
		};
		if (selectedStudent?._id) {
			studentInfo._id = selectedStudent?._id;
			updateStudentInfo(
				studentInfo,
				setLoading,
				setQueryStatus,
				navigate,
				setSelectedStudent
			);
		} else {
			addStudent(studentInfo, setLoading, setQueryStatus);
		}
	};
	return (
		<>
			<Navigation />
			<section className="addStudent">
				<div className="container">
					<h1>{selectedStudent?._id ? "UPDATE STUDENT" : "ADD STUDENT"}</h1>
					<form onSubmit={handleSubmit}>
						<input
							value={fullName}
							onChange={e => setFullName(e.target.value)}
							type="text"
							required
							placeholder="Full name"
						/>
						<input
							value={age}
							onChange={e => setAge(e.target.value)}
							type="text"
							required
							placeholder="Age"
						/>
						<input
							value={studentClass}
							onChange={e => setStudentClass(e.target.value)}
							type="text"
							required
							placeholder="Class"
						/>
						<input
							value={roll}
							onChange={e => setRoll(e.target.value)}
							type="text"
							required
							placeholder="Roll"
						/>
						<input
							value={hall}
							onChange={e => setHall(e.target.value)}
							type="text"
							required
							placeholder="Hall"
						/>
						<select value={status} onChange={e => setStatus(e.target.value)}>
							<option value="active">Active</option>
							<option value="inactive">Inactive</option>
						</select>
						<button type="submit">
							{selectedStudent?._id ? "Update" : "Add"}
						</button>
					</form>
					<SpinnerAndMessage loading={loading} status={queryStatus} />
				</div>
			</section>
		</>
	);
};

export default AddStudent;
