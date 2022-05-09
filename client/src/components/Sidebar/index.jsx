import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import ChatIcon from "@mui/icons-material/Chat";
import AddIcon from "@mui/icons-material/Add";
import logo from "../../images/beatzz.png";
import likeImg from "../../images/like.jpg";
import styles from "./styles.module.scss";
import {useEffect, useState} from "react";
import axios from "axios";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ManageSearchOutlinedIcon from '@mui/icons-material/ManageSearchOutlined';
import { useSelector, useDispatch } from "react-redux";
import ExtensionOutlinedIcon from '@mui/icons-material/ExtensionOutlined';

const Sidebar = () => {
    	const { user } = useSelector((state) => state.user);
	// const user = {
    //     _id: '6268913cf11e47afa44c2e2e',
    //     username: 'usertest1',
    //     password: 'Password123@',
    //     email: 'test@gmail.com',
    //     follows: [],
    //     followers: [],
    //     accType: 'FREE',
    //     ROLE: 'BASIC_USER'
    // }
	const [playlists, setPlaylists] = useState(null);
    useEffect(async () => {
       
        await axios.get('http://www.beatzz.tech:3002/playlists/get-user-playlists/' + user?._id)
            .then((response) => {
                setPlaylists(response.data.Playlists)
            })
    }, []);
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
                <SearchIcon/>
                <span>Search</span>
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
                to="/search-lyrics"
                className={styles.menu_link}
                activeClassName={styles.active_menu}
            >
                <ManageSearchOutlinedIcon/>
                <span>Search Lyrics</span>
            </NavLink>
          
			<NavLink
				to="/chat"
				className={styles.menu_link}
				activeClassName={styles.active_menu}
			>
				<ChatIcon />
				<span>Chat Rooms</span>
			</NavLink>

			

			<NavLink
                to="/collection/tracks"
                className={styles.menu_link}
                activeClassName={styles.active_menu}
            >
                <QueueMusicIcon/>
                <span>Discover</span>
            </NavLink>
			<NavLink
                to="/collection/playlists"
                className={styles.menu_link}
                activeClassName={styles.active_menu}
            >
                <LibraryMusicIcon/>
                <span>Library</span>
            </NavLink>
			

			<NavLink
                to="/collection/playlist/add"
                className={styles.menu_link}
                activeClassName={styles.active_menu}
            >
                <PlaylistAddIcon/>
                <span>Create Playlist</span>
            </NavLink>
            <NavLink
                to="/songs/add"
                className={styles.menu_link}
                activeClassName={styles.active_menu}
            >
                <CloudUploadIcon/>
                <span>Upload Music</span>
            </NavLink>

			<NavLink
                to="/collection/liked-songs"
                className={styles.menu_link}
                activeClassName={styles.active_menu}
            >
                {/*<img src={likeImg} alt="jfo" />*/}
                <FavoriteIcon/>
                <span>Liked Songs</span>
            </NavLink>
            <NavLink
                to="/game"
                className={styles.menu_link}
                activeClassName={styles.active_menu}
            >
                <ExtensionOutlinedIcon/>
                <span>Play Guess The Song</span>
            </NavLink>


			<div className={styles.underline}/>
            {playlists &&
                <div className={styles.playlists}>
                    {playlists.map((playlist, index) => (
                        <NavLink
                            key={index}
                            to={`/playlist/${playlist._id}`}
                            activeClassName={styles.active_link}
                            className={styles.playlist_link}
                        >
                            <span>{playlist.title}</span>
                        </NavLink>
                    ))}
                </div>
            }
        </div>
			
			
	);
};

export default Sidebar;
