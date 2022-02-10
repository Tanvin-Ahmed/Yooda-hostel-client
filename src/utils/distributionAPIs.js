import axios from "axios";

const url = "https://yooda-hostel-meal-managment.herokuapp.com/distribution";

export const addDistribution = (info, setLoading, setStatus) => {
	setStatus({ message: "", error: false });
	setLoading(true);
	axios
		.post(`${url}/create-or-update`, info)
		.then(({ data }) => {
			setLoading(false);
			setStatus({
				message: data?.message || "Food served successfully!",
				error: false,
			});
		})
		.catch(error => {
			setStatus({ message: error.response.data.message, error: true });
			setLoading(false);
		});
};
