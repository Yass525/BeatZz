import { Fragment } from "react";
import Playlists from "../../components/Playlists";
import styles from "./styles.module.scss";
import Song from "../../components/Song"
import playlistImg from "../../images/rock.jpg";
import skinty from "../../images/skinty.jpg";
import dont from "../../images/dont.jpeg";
import moon from "../../images/moon.jpg";
import familia from "../../images/familia.png";
import cry from "../../images/cry.jpg";
import peaches from "../../images/peaches.jpg";
import bruno from "../../images/bruno.jpg";
import youvegot from "../../images/youvegot.jpg";
import alicia from "../../images/alicia.jpg";
import sexy from "../../images/Sexy Bitch.jpg";
import toxic from "../../images/Toxic.jpg";
import rabbit from "../../images/rabbit.jpg";
import unite from "../../images/unite.jpg";


const playlists = [
	{ _id: 1, img: cry, name: "Cry Mfer", desc: "By Jahangeer" },
	{ _id: 2, img: dont, name: "Don't Wait a Sign", desc: "By Jeaneer" },
	{ _id: 3, img: skinty, name: "Skinty Fia", desc: "Fontaines" },
	{ _id: 4, img: familia, name: "Familia", desc: "Camilia Capbello" },
	{ _id: 4, img: moon, name: "Fear Of The Down", desc: "Jack White" },
];


const songs = [
	{ _id: 1, img: bruno, name: "Nothin", artist: "Bruno Mars" },
	{ _id: 2, img: youvegot, name: "You've Got The Love", artist: "Florence" },
	{ _id: 3, img: alicia, name: "If I Ain't Got You", artist: "Alicia Keys" },
	{ _id: 4, img: sexy, name: "Sexy Bich", artist: "David Getta" },
	{ _id: 5, img: toxic, name: "Toxic", artist: "Britney Spears" },
	{ _id: 6, img: rabbit, name: "PeachesRabbit Heart", artist: "Florence" },
	{ _id: 7, img: unite, name: "Unite", artist: "Butterfly" },
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
					{playlists.map((playlist,index)=>(
						<Playlists playlists={playlists}key={index}></Playlists>
					)
					)}

{/* 					
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
						<Playlists playlists={playlists} /> */}
				
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
