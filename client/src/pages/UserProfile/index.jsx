import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
	makeStyles,
	Card,
	CardContent,
	CardMedia,
	Avatar,
	Typography,
} from "@material-ui/core";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import { CheckOutlined } from "@material-ui/icons";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { MdShare } from "react-icons/md";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Grid from '@mui/material/Grid';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BadgeIcon from '@mui/icons-material/Badge';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { format } from "timeago.js";
import dateFormat from 'dateformat';
import axios from "axios";
import { useParams } from 'react-router-dom'
import { RiUserFollowFill, RiUserUnfollowFill } from "react-icons/ri";
import AvatarGroup from '@mui/material/AvatarGroup';
import {
	RedditShareButton,
	RedditIcon,
	FacebookIcon,
	FacebookShareButton,
	WhatsappShareButton,
	WhatsappIcon,
	TwitterShareButton,
	TwitterIcon,
} from "react-share";

const useStyles = makeStyles((theme) => ({
	text: {
		margin: theme.spacing(2, 10, 0.5),
		color: theme.palette.secondary.contrastText,
		fontSize: "2rem",
		fontWeight: "600"
	},
	text2: {
		margin: theme.spacing(0, 0, 0.5),
		color: theme.palette.secondary.contrastText,
		fontSize: "1.5rem",
		fontWeight: "400",
		marginTop: "50px",
	},
	avatar: {
		verticalAlign: "middle",
		marginRight: theme.spacing(0.5),
	},
	large: {
		width: theme.spacing(12),
		height: theme.spacing(12),
		margin: theme.spacing(2, 2, 0),
	},
	card: {
		borderRadius: 15,
		maxWidth: "500px",
		minWidth: "300px",
		height: "100%",
		backgroundColor: "rgb(50 45 45 / 40%)",
		margin: "auto !important",
		display: "flex !important",
		flexDirection: "column",
		justiyContent: "center !important",
		alignItems: "center",
	},
	cardContent: {
		padding: theme.spacing(5, 0, 0, 0),
	},
	button: {
		marginTop: "100px",
		width: "150px",
		height: "50px",
		fontSize: "1.5rem",
		fontWeight: "600",

	},
	button2: {
		marginTop: "10px",
		width: "150px",
		height: "50px",
		fontSize: "1.5rem",
		fontWeight: "600",
		backgroundColor: "#3eaba1"
	},


}));



const SHARE_URL = window.location.href;
const NO_AVATAR = "https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"

export default function Profile() {
	const { id } = useParams()
	const { user } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const classes = useStyles();

	//fetch user from uid
	const [UserProfile, setUserProfile] = useState(null)
	useEffect(() => {

		const url = `http://localhost:3003/user/getOne/${id}`;
		const fetchUser = async () => {
			try {
				setIsFetching(true);
				const data = await axios.get(url);
				setIsFetching(false);
				const UserProfile = Object.values(data.data);

				setUserProfile(UserProfile[0])


			} catch (error) {
				setIsFetching(false);
				if (
					error.response &&
					error.response.status >= 400 &&
					error.response.status < 500
				) {
					console.log(error + "400")
				} else {
					console.log(error.message + "500");
				}
			}
		}
		fetchUser()
	}, [id]);

	//end fetch user from uid


	//fetch followers 

	const [followersList, setFollowersList] = useState([])
	const [followsList, setFollowsList] = useState([])
	const [followerslength, setFollowerlength] = useState([])

	const urlunfollow = `http://localhost:3003/user/unfollow/${user?._id}/${id}`
	const urlfollow = `http://localhost:3003/user/follow/${user?._id}/${id}`

	useEffect(() => {

		const url = `http://localhost:3003/user/followers/${id}`;
		const fetchFollowers = async () => {
			try {
				setIsFetching(true);
				const data = await axios.get(url);
				setIsFetching(false);
				const list = Object.values(data.data);
				setFollowersList(list)


			} catch (error) {
				setIsFetching(false);
				if (
					error.response &&
					error.response.status >= 400 &&
					error.response.status < 500
				) {
					console.log(error + "400")
				} else {
					console.log(error.message + "500");
				}
			}
		}
		setTimeout(() => fetchFollowers(), 1000);

	}, [id, followersList]);
	//end fetch followers

	const [following, setFollowing] = useState(false);

	// start follow and unfollow
	const getFollowing = async () => {

		if (followersList.some(e => e._id === user?._id)) {
			setFollowing(true);
		} else {
			setFollowing(false);
		}

	};

	useEffect(() => {
		getFollowing();
	}, [followersList]);

	const [isFetching, setIsFetching] = useState(false);
	const followUser = async () => {

		setIsFetching(true);
		if (following) {

			await axios.put(urlunfollow)
				.then(() => {
					setIsFetching(false);;
					setFollowing(false);
					toast.info("Account unfollowed", {
						position: toast.POSITION.TOP_RIGHT
					});
				})
				.catch((err) => {
					setIsFetching(false);
					toast.error("error", {
						position: toast.POSITION.TOP_RIGHT
					});
				});
		} else {

			await axios.put(urlfollow)
				.then(() => {
					setIsFetching(false);
					setFollowing(true);
					toast.info("Account followed", {
						position: toast.POSITION.TOP_RIGHT
					});
				})
				.catch((err) => {
					setIsFetching(false);
					toast.error("error", {
						position: toast.POSITION.TOP_RIGHT
					});
				});
		}
	};
	// end follow and unfollow



	useEffect(() => {
		const url = `http://localhost:3003/user/following/${id}`;
		const fetchFollowing = async () => {
			try {
				setIsFetching(true);
				const data = await axios.get(url);
				setIsFetching(false);
				const list = Object.values(data.data);
				setFollowsList(list)

			} catch (error) {
				setIsFetching(false);
				if (
					error.response &&
					error.response.status >= 400 &&
					error.response.status < 500
				) {
					console.log(error + "400")
				} else {
					console.log(error + "500");
				}
			}
		}
		setTimeout(() => fetchFollowing(), 5000);

	}, [id, followsList]);


	return (
		<Card
			variant="outlined"
			className={classes.card}
			style={{ display: "inline-block" }}
		>
			<CardMedia align="center">
				{UserProfile?.profile?.avatar ? (
					<Avatar
						alt="user avatar"
						src={user.profile.avatar}
						className={classes.large}
					/>) : (
					<Avatar
						alt="user avatar"
						src={NO_AVATAR}
						className={classes.large}
					/>)
				}
			</CardMedia>
			<CardContent className={classes.cardContent}>

				<Typography
					className={classes.text}
					color="textSecondary"
					variant="h6"
					align="center"
				>
					{/* {props?.content?.name?.first} {props?.content?.name?.last} */}
					{UserProfile?.username ? (UserProfile?.username) : ("username")}
				</Typography>

				<Typography
					className={classes.text}
					color="textSecondary"
					variant="h6"
					align="center"
				>

					{user?._id === id ? (
						""
					) : following ? (

						<Button
							variant="contained"
							className={classes.button2}
							endIcon={<RiUserUnfollowFill />}
							onClick={followUser}
						// isFetching={isFetching}
						>
							UnFollow
						</Button>
					) : (
						<Button
							variant="contained"
							className={classes.button2}
							endIcon={<RiUserFollowFill />}
							onClick={followUser}
						// isFetching={isFetching}
						>
							Follow
						</Button>
					)}

				</Typography>

				<Typography
					className={classes.text}
					color="textSecondary"
					variant="subtitle1"
					align="center"
				>
					<AlternateEmailIcon className={classes.avatar} fontSize="large" />
					{/* {props?.content?.email} */}
					{user && UserProfile?.email}
				</Typography>{" "}
				<Typography
					className={classes.text}
					color="textSecondary"
					variant="subtitle1"
					align="center"
				>
					<BadgeIcon className={classes.avatar} fontSize="large" />
					{/* {props?.content?.cell} */}
					{UserProfile?.profile ? (UserProfile.profile.firstName) : ("")}{" "}{UserProfile?.profile ? (UserProfile.profile.lastName) : ("")}
				</Typography>{" "}
				<Typography
					className={classes.text}
					color="textSecondary"
					variant="subtitle1"
					align="center"
				>
					<DateRangeIcon className={classes.avatar} fontSize="large" />
					{UserProfile?.profile ? (dateFormat(UserProfile.profile.birthday, "dddd, mmmm dS, yyyy")) : ("")}
				</Typography>{" "}

				<div>

					<Typography
						className={classes.text}
						color="textSecondary"
						variant="h3"
						align="center"
					>
						<Grid container spacing={1}>
							<Grid item xs={6}>
								Followers
							</Grid>
							<Grid item xs={6}>
								Following
							</Grid>
							<Grid item xs={6}>
								<AvatarGroup max={4}>

									{

										followersList.map((result) => {

											return result?.profile?.avatar ? (<Avatar alt="avatar" key={result._id + "followAvatar"} src={NO_AVATAR} sx={{ width: 10, height: 10 }} />)
												:
												(<Avatar key={result._id + "followNoAvatar"} alt="avatar" src={NO_AVATAR} sx={{ width: 10, height: 10 }} />)
										}

										)}

									{/* {user && user?.followers?.length} */}
								</AvatarGroup>
							</Grid>
							<Grid item xs={6}>
								<AvatarGroup max={4}>

									{

										followsList.map((result, idx) => {

											return result?.profile?.avatar ? (<Avatar alt="avatar" key={result._id + "unfollowAvatar"} src={NO_AVATAR} sx={{ width: 10, height: 10 }} />)
												:
												(<Avatar alt="avatar" key={idx} src={NO_AVATAR} sx={{ width: 10, height: 10 }} />)
										}

										)}

									{/* {user && user?.followers?.length} */}
								</AvatarGroup>
							</Grid>

						</Grid>
					</Typography>{" "}
				</div>
				<div >
					<Typography
						className={classes.button}
						color="primary"
						variant="button"
						align="center"

					>
						<Grid container spacing={10}>
							<Grid item xs={6}>
								<PopupState variant="popover" popupId="demo-popup-menu" color="grey">
									{(popupState) => (
										<React.Fragment>
											<Button variant="contained" {...bindTrigger(popupState)} className={classes.button} lefticon={<MdShare />} endIcon={<KeyboardArrowDownIcon />}>
												SHARE
											</Button>
											<Menu {...bindMenu(popupState)} >

												<MenuItem>
													<RedditShareButton url={SHARE_URL} >
														<RedditIcon size={32} round />
													</RedditShareButton>
													<p style={{ font: "12px/14px sans-serif", paddingright: "10px", fontWeight: "600", margin: "auto", padding: "inherit" }}>Reddit</p>
												</MenuItem>

												<MenuItem >
													<FacebookShareButton url={SHARE_URL}>
														<FacebookIcon size={32} round />
													</FacebookShareButton>
													<p style={{ font: "12px/14px sans-serif", paddingright: "10px", fontWeight: "600", margin: "auto", padding: "inherit" }}>Facebook</p>
												</MenuItem>
												<MenuItem >
													<WhatsappShareButton url={SHARE_URL}>
														<WhatsappIcon size={32} round />
													</WhatsappShareButton>
													<p style={{ font: "12px/14px sans-serif", paddingright: "10px", fontWeight: "600", margin: "auto", padding: "inherit" }}>Whatsapp</p>
												</MenuItem>
												<MenuItem >
													<TwitterShareButton url={SHARE_URL}>
														<TwitterIcon size={32} round paddingright="10px" />
													</TwitterShareButton>
													<p style={{ font: "12px/14px sans-serif", paddingright: "10px", fontWeight: "600", margin: "auto", padding: "inherit" }}>Twitter</p>
												</MenuItem>
											</Menu>
										</React.Fragment>
									)}
								</PopupState>
							</Grid>
							<Grid item xs={6}>
								<Link to="/me">
									{user?._id === id ? (
										<Button variant="contained" className={classes.button}>Update</Button>
									)  : (
										""
									)}
			
								</Link>
							</Grid>
						</Grid>
					</Typography>

				</div>

				<Typography
					className={classes.text2}
					color="textSecondary"
					variant="subtitle1"
					align="center"
				>
					<CheckOutlined className={classes.avatar} fontSize="small" />
					joined : {user && format(UserProfile?.createdAt)}

				</Typography>{" "}


			</CardContent>
		</Card>
	);
}
