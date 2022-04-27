import { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import { FormControl, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";
import Joi from "joi";
import { Link, useHistory } from "react-router-dom";
import TextField from "../../components/Inputs/TextField";
import Select from "../../components/Inputs/Select";
import Radio from "../../components/Inputs/Radio";
import Button from "../../components/Button";
import styles from "./styles.module.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import {makeStyles,} from "@material-ui/core";
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
	date: {
		
		width: "100%",
		height: "50px",
		fontSize: "1.6rem",
		fontWeight: "400",
		borderRadius: "0.5rem",
	},
}))
const months = [
	{ name: "January", value: "01" },
	{ name: "February", value: "02" },
	{ name: "March", value: "03" },
	{ name: "Apirl", value: "04" },
	{ name: "May", value: "05" },
	{ name: "June", value: "06" },
	{ name: "July", value: "07" },
	{ name: "Augest", value: "08" },
	{ name: "September", value: "09" },
	{ name: "October", value: "10" },
	{ name: "November", value: "11" },
	{ name: "December", value: "12" },
];

const genders = ["male", "female"];

const Profile = () => {
	
	const { user } = useSelector((state) => state.user);
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		month: "",
		year: "",
		date: "",
	});
	const [send, setSend] = useState({
		firstName: "",
		lastName: "",
		birthday: (new Date()),
	});
	// const [errors, setErrors] = useState({});

	const handleInputState = (name, value) => {
		setData((data) => ({ ...data, [name]: value }));
	};

	// const handleErrorState = (name, value) => {
	// 	value === ""
	// 		? delete errors[name]
	// 		: setErrors(() => ({ ...errors, [name]: value }));
	// };

	// const schema = {
	// 	name: Joi.string().min(5).max(10).required().label("Name"),
	// };
	const [isFetching, setIsFetching] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const date = moment(data.year+"-"+data.month+"-"+data.date).format('YYYY-MM-DD');
		// let showDate = moment(date).format('YYYY/MM/DD')
		e.preventDefault();
		send.firstName=data.firstName;
		send.lastName=data.lastName;
		send.birthday=new Date(date);
		console.log(send)
			try {
				setIsFetching(true);
				const url = `http://localhost:3003/user/update/${user?._id}`;
				await axios.patch(url,{profile :send});
				setIsFetching(false);
				toast.info("Account updated", {
					position: toast.POSITION.TOP_RIGHT
				  });
				history.push(`/profile/${user?._id}`);
			} catch (error) {
				setIsFetching(false);
				if (
					error.response &&
					error.response.status >= 400 &&
					error.response.status < 500
				) {
					toast.info("Something wen wrong", {
						position: toast.POSITION.TOP_RIGHT
					  });
				} else {
					console.log(error);
					toast.info("Something wen wrong", {
						position: toast.POSITION.TOP_RIGHT
					  });
				}
			}
		
	};


	const handleToken = (token) => {
		fetch("http://localhost:3006/payment/subscribes", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ token, amount: 3000 }),
		})
			.then(res => res.json())
			.then(_ => {
				toast.success("Transaction successful, You are now a premium user", { autoClose: 4000, position: toast.POSITION.TOP_RIGHT });
			}).catch(_ => toast.error("Transaction failed, please try again", { autoClose: 4000, position: toast.POSITION.TOP_RIGHT }))
	}
	const [startDate, setStartDate] = useState();

	const classes = useStyles();
	const history = useHistory();
	return (

		<div className={styles.container}>
			
			<h1>Profile</h1>

			<form onSubmit={handleSubmit} className={styles.form_container}>
				<div className={styles.input_container}>
			{/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className={classes.date}  closeOnScroll={(e) => e.target === document}>
			<div style={{ width: "100%" }}>ss</div>
			</DatePicker> */}
					<TextField
						label="What's your first name"
						placeholder="Enter your first name"
						name="firstName"
						handleInputState={handleInputState}
						value={data.firstName}
						
					
					/>
				</div>
				<div className={styles.input_container}>
					<TextField
						label="What's your last name"
						placeholder="Enter your last name"
						name="lastName"
						handleInputState={handleInputState}
						//schema={schema.name}
						//handleErrorState={handleErrorState}
						value={data.lastName}
					// error={errors.name}
					//required={true}
					/>
				</div>

				<div className={styles.date_of_birth_container}>
					<p>What's your date of birth?</p>
					<div className={styles.date_of_birth}>
						<div className={styles.month}>
							<Select
								name="month"
								handleInputState={handleInputState}
								label="Month"
								placeholder="Months"
								options={months}
								value={data.month}
								required={true}
							/>
						</div>
						<div className={styles.date}>
							<TextField
								label="Date"
								placeholder="DD"
								name="date"
								value={data.date}
								handleInputState={handleInputState}
								required={true}
							/>
						</div>
						<div className={styles.year}>
							<TextField
								label="Year"
								placeholder="YYYY"
								name="year"
								value={data.year}
								handleInputState={handleInputState}
								required={true}
							/>
						</div>

					</div>
				</div>
				{/* <div className={styles.input_container}>
					<TextField
						label="Tell us more about you"
						placeholder="Enter your Bio"
						name="bio"
						handleInputState={handleInputState}
						//schema={schema.name}
						//handleErrorState={handleErrorState}
						value={data.bio}
					// error={errors.name}
					//required={true}
					/>
				</div> */}

				{/* <div className={styles.input_container}>
					<Radio
						label="What's your gender?"
						name="gender"
						handleInputState={handleInputState}
						options={genders}
						value={data.gender}
						required={true}
					/>
				</div> */}
				<div className={styles.submit_btn_wrapper}>
					<form action="http://localhost:3006/payment/create-checkout-session" method="POST">

						<Button
							label="GET BEATZZ PREMIUM"
							style={{ backgroundColor: "#3eaba1", color: "#000", width: "25rem", fontSize: "1.4rem", }}
							type="submit"
						/>

					</form>

					<Button label="Update" type="submit" />
				</div>


			</form>
		</div>
	);
};

export default Profile;
