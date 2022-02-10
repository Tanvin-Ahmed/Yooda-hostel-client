import "./App.scss";
import Home from "./components/home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/authentication/Login";
import UpdateStudentStatus from "./components/updateStudentStatus/UpdateStudentStatus";
import PrivateRoute from "./components/authentication/PrivateRoute";
import AddStudent from "./components/addStudent/AddStudent";
import Dashboard from "./components/dahsboard/Dashboard";
import AddFood from "./components/addFood/AddFood";
import { useState } from "react";
import ManageFoodList from "./components/manageFoodList/ManageFoodList";

function App() {
	const [selectedStudent, setSelectedStudent] = useState({});
	const [selectedFoodItem, setSelectedFoodItem] = useState({});
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/" element={<Home />} />
					<Route
						path="/admin"
						element={
							<PrivateRoute>
								<Dashboard setSelectedStudent={setSelectedStudent} />
							</PrivateRoute>
						}
					/>
					<Route
						path="/update-students-status"
						element={
							<PrivateRoute>
								<UpdateStudentStatus />
							</PrivateRoute>
						}
					/>
					<Route
						path="/manage-food-list"
						element={
							<PrivateRoute>
								<ManageFoodList setSelectedFoodItem={setSelectedFoodItem} />
							</PrivateRoute>
						}
					/>
					<Route
						path="/add_student"
						element={
							<PrivateRoute>
								<AddStudent selectedStudent={selectedStudent} />
							</PrivateRoute>
						}
					/>
					<Route
						path="/add_food"
						element={
							<PrivateRoute>
								<AddFood selectedFoodItem={selectedFoodItem} />
							</PrivateRoute>
						}
					/>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
