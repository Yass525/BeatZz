import { Fragment } from "react";
import { ClickAwayListener } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import styles from "./styles.module.scss";
import axios from "axios";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {useHistory} from "react-router-dom";
const playlists = [
	{ _id: 1, img: "", name: "Today's Top Songs", desc: "By Jahangeer" },
];

const PlaylistMenu = ({ closeMenu, songId, songName}) => {

	// const history = useHistory();
	// const redirect = () =>{
	// 	let url = "#"
	// 	history.push(url)
	// }

	const handleDelete = async () => {
		confirmAlert({
			title: 'Confirm to delete',
			message: 'Are you sure you want to delete '+songName,
			buttons: [
				{
					label: 'Yes',
					onClick: async () => await axios.delete('http://localhost:3002/songs/delete/' + songId)
						.then((response) => {
							console.log(response.data)
						}).then(() => { window.location = '/collection/tracks'})
				},
				{
					label: 'No',
					onClick: () => window.close()
				}
			],
			closeOnEscape: true,
			closeOnClickOutside: true,
		});

	}
	return (
		<ClickAwayListener onClickAway={closeMenu}>
			<div className={styles.menu} onClick={closeMenu}>
				<div className={styles.playlist_option}>
					<p>Add to Playlist</p>
					<Fragment>
						<ArrowRightIcon />
						<div className={styles.playlists}>
							{playlists.map((playlist) => (
								<div className={styles.option} key={playlist._id}>
									<p>{playlist.name}</p>
								</div>
							))}
						</div>
					</Fragment>
				</div>
				<div className={styles.option}>
					<p>Go to artist</p>
				</div>
				<div className={styles.option}>
					<button onClick={handleDelete} className={styles.delete}>Delete</button>
				</div>
			</div>
		</ClickAwayListener>
	);
};

export default PlaylistMenu;
