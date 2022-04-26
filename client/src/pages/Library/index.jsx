import { Link } from "react-router-dom";
import Playlists from "../../components/Playlists";
import playlistImg from "../../images/rock.jpg";
import styles from "./styles.module.scss";
import {useEffect, useState} from "react";
import axios from "axios";

const Library = () => {
	const [playlists,setPlaylists] = useState(null);
	useEffect(async () => {
		await axios.get('http://localhost:3002/playlists/get-all')
			.then((response) => {
				setPlaylists(response.data)
			})
	}, []);

	if (!playlists){
		return (
			<div>
				<h1 style={{textAlign: "center", marginTop: '40px'}}>You have no playlists! Go create one</h1>
			</div>
		)
	}
	return (
		<div className={styles.container}>
			<h1>Playlists</h1>
			<div className={styles.playlists_container}>
				<Link to="/collection/tracks">
					<div className={styles.liked_songs}>
						<h1>Liked Songs</h1>
						<p>1 Liked Songs</p>
					</div>
				</Link>
				<Playlists playlists={playlists.Playlists} />
			</div>
		</div>
	);
};

export default Library;
