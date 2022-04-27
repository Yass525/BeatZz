import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import AddIcon from "@mui/icons-material/Add";
import logo from "../../images/beatzz.png";
import likeImg from "../../images/like.jpg";
import styles from "./styles.module.scss";

const playlists = [
	{ _id: 1, img: "", name: "Today's Top Songs", desc: "By Jahangeer" },
];

const Sidebar = () => {
	return (
		<div className={styles.container}>
			<img className={styles.logo_img} src={logo} alt="logo" />
			<NavLink
				to="/home"
				className={styles.menu_link}
				activeClassName={styles.active_menu}
			>
				<HomeIcon />
				<span>Home</span>
			</NavLink>
			<NavLink
				to="/search"
				className={styles.menu_link}
				activeClassName={styles.active_menu}
			>
				<SearchIcon />
				<span>Search Songs</span>
			</NavLink>
			<NavLink
				to="/searchUsers"
				className={styles.menu_link}
				activeClassName={styles.active_menu}
			>
				<SearchIcon />
				<span>Search Users</span>
			</NavLink>
			<NavLink
				to="/collection/playlists"
				className={styles.menu_link}
				activeClassName={styles.active_menu}
			>
				<LibraryMusicIcon />
				<span>Your Library</span>
			</NavLink>

			<NavLink
				to="/collection/playlist/add"
				className={styles.create_playlist_btn}
				activeClassName={styles.active_menu}
			>
				<AddIcon />
				<span>Create Playlist</span>
			</NavLink>
			<NavLink
				to="/songs/add"
				className={styles.menu_link}
				activeClassName={styles.active_menu}
			>
				<LibraryMusicIcon />
				<span>Upload Music</span>
			</NavLink>
			<NavLink
				to="/collection/tracks"
				className={styles.menu_link}
				activeClassName={styles.active_menu}
			>
				<LibraryMusicIcon />
				<span>My Music</span>
			</NavLink>
			<NavLink
				to="/collection/liked-songs"
				className={styles.menu_link}
				activeClassName={styles.active_menu}
			>
				<img src={likeImg} alt="jfo" />
				<span>Liked Songs</span>
			</NavLink>
			<div className={styles.underline}/>
			{playlists.map((playlist) => (
				<NavLink
					key={playlist._id}
					to={`/playlist/${playlist._id}`}
					activeClassName={styles.active_link}
					className={styles.playlist_link}
				>
					{playlist.name}
				</NavLink>
			))}
		</div>
	);
};

export default Sidebar;
