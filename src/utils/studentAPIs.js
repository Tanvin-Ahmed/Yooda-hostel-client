import axios from "axios";

const url = "http://localhost:5000/student";

export const addStudent = (info, setLoading, setStatus) => {
	setStatus({
		message: "",
		error: false,
	});
	setLoading(true);
	axios
		.post(`${url}/create`, info)
		.then(() => {
			setStatus({
				message: "Added successfully in student list!",
				error: false,
			});
			setLoading(false);
		})
		.catch(error => {
			setLoading(false);
			setStatus({ message: error.response.data.message, error: true });
		});
};

export const findOneStudent = (roll, setLoading, setStatus, setData) => {
	setLoading(true);
	setStatus({ message: "", error: false });
	axios
		.get(`${url}/find-one/${roll}`)
		.then(({ data }) => {
			setLoading(false);
			setData(data);
		})
		.catch(error => {
			setLoading(false);
			setStatus({ message: error.response.data.message, error: true });
		});
};

export const getStudents = (page, setLoading, setStatus, setData) => {
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

export const updateStudentStatus = (info, setLoading, setStatus, setData) => {
	setStatus({
		message: "",
		error: false,
	});
	setLoading(true);
	axios
		.put(`${url}/update-status`, info)
		.then(({ data }) => {
			setData(pre => {
				data.forEach(Info => {
					const index = pre.findIndex(({ _id }) => _id === Info._id);
					pre.splice(index, 1, Info);
				});
				return pre;
			});
			setLoading(false);
		})
		.catch(error => {
			setLoading(false);
			setStatus({ message: error.response.data.message, error: true });
		});
};

export const updateStudentInfo = (
	info,
	setLoading,
	setStatus,
	navigate,
	setSelectedStudent
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
			setSelectedStudent({});
			navigate("/admin");
		})
		.catch(error => {
			setLoading(false);
			setStatus({ message: error.response.data.message, error: true });
		});
};

export const deleteStudent = (id, setLoading, setStatus, setData) => {
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
