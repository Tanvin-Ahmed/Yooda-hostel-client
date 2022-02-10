import React, { useState } from "react";
import Button from "@mui/material/Button";
import "./Navigation.scss";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
	const [openNav, setOpenNav] = useState(false);
	const navigate = useNavigate();
	return (
		<nav>
			<div className="brand">
				<h1>Yooda Hostel</h1>
			</div>
			<div className="icons">
				{openNav ? (
					<IconButton onClick={() => setOpenNav(false)}>
						<CloseIcon fontSize="large" />
					</IconButton>
				) : (
					<IconButton onClick={() => setOpenNav(true)}>
						<MenuIcon fontSize="large" />
					</IconButton>
				)}
			</div>
			{openNav ? (
				<div className="container">
					<Button onClick={() => navigate("/")}>Home</Button>
					<Button onClick={() => navigate("/admin")}>Admin Dashboard</Button>
					{sessionStorage.getItem("admin") ? (
						<>
							<Button onClick={() => navigate("/update-students-status")}>
								Manage student status
							</Button>
							<Button>Manage meal status</Button>
							<Button onClick={() => navigate("/manage-food-list")}>
								Manage Food item
							</Button>
							<Button onClick={() => navigate("/add_student")}>
								Add Student
							</Button>
							<Button onClick={() => navigate("/add_food")}>Add Food</Button>
						</>
					) : null}
				</div>
			) : null}
		</nav>
	);
};

export default Navigation;
