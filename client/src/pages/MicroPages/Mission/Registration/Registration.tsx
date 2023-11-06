import React, { useState } from "react";
import { Formik } from "formik";
import FormikTextInput from "library/Formik/FormikInput";
import DatePicker from "library/DatePicker/DatePicker";
import "react-datepicker/dist/react-datepicker.css";
import { Grid } from "@mui/material";
import { MAIN_IMAGES } from "constants/constants";
import * as yup from "yup";
import "./Registration.scss";

const Registration: React.FC = () => {
	const [initialValues, setInitialValues] = useState({
		fullName: "",
		emailAddress: "",
		state: "",
		zipCode: "",
		birthDate: "",
	});

	const validationSchema = yup.object({
		fullName: yup.string().required("This field is required."),
		emailAddress: yup.string().required("This field is required."),
	});

	const submitHandler = (data: any) => {
		console.log("submit", data);
	};

	return (
		<div className="registration-container">
			<div className="registration-content">
				<h2 className="title-holder">AGENT OF AGENTS</h2>
				<Formik
					initialValues={initialValues}
					onSubmit={(data: any) => {
						console.log("submit: ", data);
					}}
					validationSchema={validationSchema}
				>
					{({ errors, values }) => (
						<React.Fragment>
							<div className="form-container">
								<Grid container spacing={2} alignItems={"center"}>
									<Grid item md={7}>
										<div className="left-col-content">
											<h2>Registration</h2>
											<div className="form-control">
												<label htmlFor="">Full Name</label>
												<FormikTextInput
													name="fullName"
													placeholder="Enter Full Name"
												/>
											</div>
											<div className="form-control">
												<label htmlFor="">Email Address</label>
												<FormikTextInput
													name="emailAddress"
													placeholder="Enter Email Address"
												/>
											</div>
											<div className="form-control ">
												<Grid container spacing={2}>
													<Grid item md={7}>
														<div className="two-col-form-content ">
															<label htmlFor="">State</label>
															<FormikTextInput name="state" />
														</div>
													</Grid>
													<Grid item md={5}>
														<div className="two-col-form-content">
															<label htmlFor="">Zip Code</label>
															<FormikTextInput name="zipCode" type="number" />
														</div>
													</Grid>
												</Grid>
											</div>
											<div className="form-control">
												<label htmlFor="">Birth Date</label>
												<div className="date-picker-container">
													<DatePicker name="birthDate" />
												</div>
											</div>
											<button
												onClick={() => submitHandler(values)}
												disabled={
													!values.fullName ||
													!values.emailAddress ||
													!values.state ||
													!values.zipCode ||
													!values.birthDate
												}
											>
												Join the Mission
											</button>
										</div>
									</Grid>
									<Grid item md={5}>
										<div className="right-col-content">
											<img
												src="https://images.pexels.com/photos/1851243/pexels-photo-1851243.jpeg?auto=compress&cs=tinysrgb&w=1600"
												alt="https://images.pexels.com/photos/1851243/pexels-photo-1851243.jpeg?auto=compress&cs=tinysrgb&w=1600"
											/>
											<div className="form-actions">
												<button>Upload an Image</button>
											</div>
										</div>
									</Grid>
								</Grid>
							</div>
							{/* Commented for debugging */}
							{/* <pre> {JSON.stringify(values, null, 2)} </pre>
							<pre> {JSON.stringify(errors, null, 2)} </pre> */}
						</React.Fragment>
					)}
				</Formik>
			</div>
			<div className="cfs-logo">
				<img src={MAIN_IMAGES.MAIN_LOGO} alt={MAIN_IMAGES.MAIN_LOGO} />
			</div>
		</div>
	);
};

export default Registration;
