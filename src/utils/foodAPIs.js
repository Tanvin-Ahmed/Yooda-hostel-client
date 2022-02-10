import axios from "axios";

const url = "https://yooda-hostel-meal-managment.herokuapp.com/food";

export const addFood = (info, setLoading, setStatus) => {
	setStatus({
		message: "",
		error: false,
	});
	setLoading(true);
	axios
		.post(`${url}/create`, info)
		.then(() => {
			setStatus({
				message: "Added successfully in Food list!",
				error: false,
			});
			setLoading(false);
		})
		.catch(error => {
			setLoading(false);
			setStatus({ message: error.response.data.message, error: true });
		});
};

export const getFoods = (page, setLoading, setStatus, setData) => {
	setStatus({
		message: "",
		error: false,
	});
	setLoading(true);
	axios
		.get(`${url}/get/${page}`)
		.then(({ data }) => {
			setData(pre => [...pre, ...data]);
			setLoading(false);
		})
		.catch(error => {
			setLoading(false);
			setStatus({ message: error.response.data.message, error: true });
		});
};

export const getAllFood = (setLoading, setStatus, setData) => {
	setStatus({
		message: "",
		error: false,
	});
	setLoading(true);
	axios
		.get(`${url}/get-all`)
		.then(({ data }) => {
			setData(data);
			setLoading(false);
		})
		.catch(error => {
			setLoading(false);
			setStatus({ message: error.response.data.message, error: true });
		});
};

export const updateFood = (
	info,
	setLoading,
	setStatus,
	navigate,
	setSelectedFoodItem
) => {
	setStatus({
		message: "",
		error: false,
	});
	setLoading(true);
	axios
		.put(`${url}/update`, info)
		.then(() => {
			setLoading(false);
			navigate("/manage-food-list");
			setSelectedFoodItem({});
		})
		.catch(error => {
			setLoading(false);
			setStatus({ message: error.response.data.message, error: true });
		});
};

export const deleteFood = (id, setLoading, setStatus, setData) => {
	setStatus({
		message: "",
		error: false,
	});
	setLoading(true);
	axios
		.delete(`${url}/delete/${id}`)
		.then(() => {
			setData(pre => pre.filter(({ _id }) => _id !== id));
			setLoading(false);
		})
		.catch(error => {
			setLoading(false);
			setStatus({ message: error.response.data.message, error: true });
		});
};
