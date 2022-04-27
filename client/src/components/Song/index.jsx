import {useEffect, useState} from "react";
import Like from "../Like";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import styles from "./styles.module.scss";
import PlaylistMenu from "../PlaylistMenu";
import axios from "axios";

const Song = ({ song, playlist }) => {
	const [menu, setMenu] = useState(false);
	const [songImg, setSongImg] = useState("");
	useEffect(async () => {
		await axios.get('http://localhost:3002/songs/get-image/'+ song._id,{
			responseType: 'arraybuffer'
		}).then((response) => {
			let base64ImageString = Buffer.from(response.data, 'binary').toString('base64')
			let srcValue = "data:image/png;base64,"+base64ImageString;
			setSongImg(srcValue)
			})
	}, []);


	return (
		<div className={styles.song_container}>
			<div className={styles.left}>
				<IconButton className={styles.play_btn}>
					<PlayArrowIcon />
				</IconButton>
				{songImg && (
					<img src={songImg} alt="song_img" />
				)}
				<p>{song.title}</p>
			</div>
			<div className={styles.center}>
				<p>{song.artist}</p>
			</div>
			<div className={styles.right}>
				<Like songId={song._id}/>
				<p>{song.duration}</p>
				<p>{song.nbrLikes} </p>
				<ThumbUpIcon/>
				<p>{song.nbrListens} </p>
				<PlayCircleIcon/>
				<IconButton className={styles.menu_btn} onClick={() => setMenu(true)}>
					<MoreHorizIcon />
				</IconButton>
				{menu && (
					<PlaylistMenu playlist={playlist} songId={song._id} songName={song.title} closeMenu={() => setMenu(false)} />
				)}
			</div>
		</div>
	);
};

export default Song;
