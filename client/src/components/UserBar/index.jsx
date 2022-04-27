
   
import { useState } from "react";
import Like from "../Like";
import { IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import styles from "./styles.module.scss";
import PlaylistMenu from "../PlaylistMenu";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	button: {
	
		width: "150px",
		height: "40px",
		fontSize: "1.5rem",
		fontWeight: "300",
	},
}));


const NO_AVATAR = "https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
const UserBar = ({ user }) => {

	const classes = useStyles();
	console.log("from the user component "+ user)
	return (
		<div className={styles.song_container}>
			<div className={styles.left}>
				<IconButton className={styles.play_btn}>
					<PlayArrowIcon />
				</IconButton>
				{user?.profile?.avatar ? (
					<img
						alt="user avatar"
						src={user.profile.avatar}
						// className={classes.large}
					/>) : (
					<img
						alt="user avatar"
						src={NO_AVATAR}
						// className={classes.large}
					/>)
				}
				<p>{user?.username}</p>
			</div>
			<div className={styles.center}>
				<p>{user?.profile ? (user.profile.firstName) : ("")}{" "}{user?.profile ? (user.profile.lastName) : ("")}</p>
			</div>
			<div className={styles.right}>
				<Link to={{  pathname: `/profile/${user._id}`}}>
					<Button variant="contained" className={classes.button}>Visit profile</Button>
				</Link> 
			
			</div>
		</div>
	);
};

export default UserBar;
