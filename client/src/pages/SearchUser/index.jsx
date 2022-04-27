import { Fragment } from "react";
import UserBar from "../../components/UserBar";
import { IconButton } from "@mui/material";
import peaches from "../../images/peaches.jpg";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import styles from "./styles.module.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";

const SearchUser = () => {

	const [search, setSearch] = useState("");
	const [results, setResults] = useState([]);
	const [isFetching, setIsFetching] = useState(false);

	const handleSearch = async ({ currentTarget: input }) => {
		setSearch(input.value);
		setResults({});
		try {

			setIsFetching(true);
			const url = `http://localhost:3003/user/getByUserName/${input.value}`;
			const { data } = await axios.get(url);

			// const list = Array.from(data.data);
			// const list = Object.values(data.data);

			console.log(data.data)
			setResults(data);
			// data?.map(user =>  console.log("user"+user ));
			setIsFetching(false);
		} catch (error) {
			console.log(error);
			setIsFetching(false);
		}
	};

	// const filtered = results.data.map(user =>  <UserBar key={user._id} user={user} />)
	return (
		<div className={styles.container}>
			<div className={styles.search_input_container}>
				<IconButton>
					<SearchIcon />
				</IconButton>
				<input
					type="text"
					placeholder="Search for other users with username"
					onChange={handleSearch}
					value={search}
				/>
				<IconButton onClick={() => setSearch("")}>
					<ClearIcon />
				</IconButton>
			</div>
			{isFetching && (
				<div className={styles.progress_container}>
					<CircularProgress style={{ color: "#1ed760" }} size="5rem" />
				</div>
			)}

			{results?.data?.length !== 0 && (
				<div className={styles.results_container}>
					<div className={styles.songs_container}>
						{results?.data?.map((user) => 
							{return <Fragment key={user._id}>
								<UserBar user={user} />
							</Fragment>}
						)}
					</div>

				</div>
			)}

		</div>
	);
};

export default SearchUser;
