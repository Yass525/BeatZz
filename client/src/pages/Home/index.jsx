import { Fragment } from "react";
import Playlists from "../../components/Playlists";
import styles from "./styles.module.scss";
import Song from "../../components/Song"
import playlistImg from "../../images/rock.jpg";
import peaches from "../../images/peaches.jpg";
import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
	const [songs, setSongs] = useState(null);
	useEffect(async () => {
		await axios.get('http://www.beatzz.tech:3002/songs/getMostLiked/')
			.then((response) => {
				setSongs(response.data)
			})
	}, []);

	const songs2 = [{  "_id":  "62758674ee8528e9c7fa1169"  ,  "title": "Old Town Road",  "release": "Solo",  "duration": 2.56,  "content": "62758663578568baed185ec2",  "genre": [    "Pop,  ",    "Country,  "  ],  "artists": [    "6267c66d65570fb4ebd0137b"     ],  "image": "62758663578568baed185ec3",  "nbrListens": 11476,  "nbrLikes": 3486,  "__v": 0,  "lyrics": "62758674ee8528e9c7fa116b"},
	{  "_id":  "627583a5ee8528e9c7fa1155"  ,  "title": "Bad Guy",  "release": "When We All Fall Asleep, Where Do We Go?",  "duration": 3.16,  "content": "62758391578568baed185e61",  "genre": [    "Pop,  ",    "Alternative/Indie,  "  ],  "artists": [   "6267c66d65570fb4ebd0137b"  ],  "image": "62758391578568baed185e62",  "nbrListens": 1030,  "nbrLikes": 608,  "__v": 0,  "lyrics": "627583a5ee8528e9c7fa1157"},
	{  "_id": "62758449ee8528e9c7fa115a"  ,  "title": "Enemy",  "release": "Arcane League of Legends",  "duration": 3.18,  "content": "62758435578568baed185e76",  "genre": [    "Alternative/Indie,  "  ],  "artists": [    "6267c66d65570fb4ebd0137b"    ],  "image": "62758435578568baed185e77",  "nbrListens": 7526,  "nbrLikes": 2402,  "__v": 0,  "lyrics": "62758449ee8528e9c7fa115c"}
];


	return (
		<Fragment>
			<div className={styles.container}>

				<h1>Songs for you</h1>
				<div className={styles.playlists_container}>
				{songs2?.map((song, index) => (
						<Song song={song} key={index} />
					))}
				</div>
				<h1>Most liked song</h1>
				<div className={styles.playlists_container2}>
					{songs?.song.map((song, index) => (
						<Song song={song} key={index} />
					))}
				</div>


			</div>
		</Fragment>
	);
};

export default Home;
