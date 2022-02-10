import React, { useState } from "react";

const withFetchingState = OriginalComponent => {
	const WithFetchingState = props => {
		const [dataList, setDataList] = useState([]);
		const [loading, setLoading] = useState(false);
		const [status, setStatus] = useState({ message: "", error: false });
		return (
			<OriginalComponent
				dataList={dataList}
				setDataList={setDataList}
				status={status}
				setStatus={setStatus}
				loading={loading}
				setLoading={setLoading}
				{...props}
			/>
		);
	};

	return WithFetchingState;
};

export default withFetchingState;
