import { Fragment } from "react";
import Playlists from "../../components/Playlists";
import styles from "./styles.module.scss";
import Song from "../../components/Song"
import playlistImg from "../../images/rock.jpg";
import peaches from "../../images/peaches.jpg";

const playlists = [
	{ _id: 1, img: playlistImg, name: "Today's Top Songs", desc: "By Jahangeer" },
];
const songs = [
	{ _id: 1, img: peaches, name: "Peaches", artist: "Justin Bieber" },
	{ _id: 2, img: peaches, name: "Peaches", artist: "Justin Bieber" },
	{ _id: 3, img: peaches, name: "Peaches", artist: "Justin Bieber" },
	{ _id: 4, img: peaches, name: "Peaches", artist: "Justin Bieber" },
	{ _id: 5, img: peaches, name: "Peaches", artist: "Justin Bieber" },
	{ _id: 6, img: peaches, name: "Peaches", artist: "Justin Bieber" },
	{ _id: 7, img: peaches, name: "Peaches", artist: "Justin Bieber" },
];

const Home = () => {
	return (
		<Fragment>
			<div className={styles.container}>

				<h1>Songs for you</h1>
				<div className={styles.playlists_container}>
					{songs.map((song,index) => (
						<Song song={song} key={index}></Song>
					))}
				</div>

				<h1>Latest Albums</h1>
				<div className={styles.scroll__container}>

					
						<Playlists playlists={playlists} />
						<Playlists playlists={playlists} />
						<Playlists playlists={playlists} />
						<Playlists playlists={playlists} />
						<Playlists playlists={playlists} />
						<Playlists playlists={playlists} />
						<Playlists playlists={playlists} />
						<Playlists playlists={playlists} />
						<Playlists playlists={playlists} />
						<Playlists playlists={playlists} />
						<Playlists playlists={playlists} />
						<Playlists playlists={playlists} />	
						<Playlists playlists={playlists} />
				
				</div>
				<h1>Trending now</h1>
				<div className={styles.scroll__container}
					style={{ marginBottom:"150px" }}
				>
					<Playlists playlists={playlists} />
					<Playlists playlists={playlists} />
					<Playlists playlists={playlists} />
					<Playlists playlists={playlists} />
					<Playlists playlists={playlists} />
					<Playlists playlists={playlists} />
					<Playlists playlists={playlists} />
					<Playlists playlists={playlists} />
					<Playlists playlists={playlists} />
				</div>
			</div>
		</Fragment>
	);
};

export default Home;
