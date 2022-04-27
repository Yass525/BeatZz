import { useState } from "react";
import { IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import styles from "./styles.module.scss";
import axios from "axios";

const Like = ({songId}) => {
	const [like, setLike] = useState(false);
	const likeSong = async  () => {
		if (!like){
			setLike(!like);
			 await axios.put('http://localhost:3002/songs/like-song/' + songId)
				.then((response) => {
					console.log(response.data)
				})
		} else {
			setLike(!like);
			await axios.put('http://localhost:3002/songs/dislike-song/' + songId)
				.then((response) => {
					console.log(response.data)
				})
		}

	}
	return (
		<IconButton className={styles.like_btn} onClick={likeSong}>
			{!like ? (
				<FavoriteBorderIcon className={styles.like_outlined} />
			) : (
				<FavoriteIcon className={styles.like_filled} />
			)}
		</IconButton>
	);
};

export default Like;
