import { Grid, Button as MUIButton } from "@mui/material";
import FormikTextInput from "library/Formik/FormikInput";
import React, { useState } from "react";
import Select from "react-select";
import MultiSelectInputWithCreate from "library/MultiSelectInput/MultiSelectInputWithCreate";
import { langOptions } from "pages/Agents/AgentsLanding/utils";
import MultiSelectInputV2 from "library/MultiSelectInput/MultiSelectInputV2";
import { AGENT_SPECIALTIES, CFS_NATIONALITIES } from "constants/constants";
import { FaInfoCircle } from "react-icons/fa";
import { DEFAULT_IMAGE } from "admin/constants/constants";
import HtmlTooltip from "library/HtmlTooltip/HtmlTooltip";
import { ValuesType } from "../models";
import ErrorText from "./ErrorText";
import { FormikTouched } from "formik";
import US_STATES from "constants/statesAndLocation";
import DatePicker from "library/DatePicker/DatePicker";

interface PersonalInfoProps {
	values: ValuesType;
	setFieldValue: (
		field: string,
		value: any,
		shouldValidate?: boolean | undefined
	) => void;
	touched: FormikTouched<ValuesType>;
	setTouched: (
		touched: FormikTouched<ValuesType>,
		shouldValidate?: boolean | undefined
	) => void;
	changeStage: (newStage: number) => void;
	isValid: boolean;
	onSubmit: (values: ValuesType, nextStage: number) => Promise<void>;
}

const PersonalInfo: React.FC<PersonalInfoProps> = (props) => {
	const [thumbnailPreview, setThumbnailPreview] = useState("");

	const handleFocusBack = () => {
		setThumbnailPreview("");
		window.removeEventListener("focus", handleFocusBack);
	};
	const clickedFileInput = () => {
		window.addEventListener("focus", handleFocusBack);
	};

	const languageValue = props.values.languages?.map((data) => {
		return {
			keyword: data,
			label: data,
			value: data,
		};
	});

	return (
		<Grid container spacing={2}>
			<Grid item xs={12} sm={12} md={12} lg={6}>
				<label className="form-label">First Name</label>
				<FormikTextInput
					name="firstName"
					value={props.values.firstName}
					variant="outlined"
					placeholder="Enter your first name"
				/>
			</Grid>
			<Grid item xs={12} sm={12} md={12} lg={6}>
				<label className="form-label">Last Name</label>
				<FormikTextInput
					name="lastName"
					value={props.values.lastName}
					variant="outlined"
					type="text"
					placeholder="Enter your last name"
				/>
			</Grid>
			<Grid item xs={12} sm={12} md={12} lg={12}>
				<label className="form-label">Phone Number</label>
				<FormikTextInput
					name="phoneNumber"
					value={props.values.phoneNumber}
					variant="outlined"
					placeholder="Enter your phone number"
				/>
			</Grid>
			<Grid item xs={12} sm={12} md={12} lg={12}>
				<label className="form-label">Resident License Number (Optional)</label>
				<FormikTextInput
					name="licenseNumber"
					value={props.values.licenseNumber}
					variant="outlined"
					type="text"
					placeholder="Enter your resident license number"
				/>
			</Grid>
			<Grid item xs={12} sm={12} md={12} lg={12}>
				<label className="form-label">Biography (Optional)</label>
				<FormikTextInput
					name="bio"
					value={props.values.bio}
					variant="outlined"
					type="text"
					placeholder="Enter your biography"
					isTextArea
				/>
			</Grid>
			<Grid item xs={12} sm={12} md={12} lg={12}>
				<label className="form-label">Specialties(Optional)</label>
				<MultiSelectInputV2
					options={AGENT_SPECIALTIES.map((specialty) => {
						return {
							keyword: specialty,
							label: specialty,
							value: specialty,
						};
					})}
					onChange={(e) => {
						const modifiedValue = e?.map((val) => val.keyword);
						props.setFieldValue("specialties", modifiedValue);
					}}
					onBlur={(e) => {
						if (props.values.specialties.length === 0) {
							props.setTouched({ ...props.touched, specialties: true });
						}
					}}
					error={false}
					// error={
					//   props.values.specialties.length === 0 && props.touched.specialties
					//     ? true
					//     : false
					// }
					placeholder="Select a specialty item to add"
					value={props.values.specialties.map((data) => {
						return {
							keyword: data,
							label: data,
							value: data,
						};
					})}
				/>

				{/* <ErrorText
          isError={
            props.values.specialties.length === 0 && !!props.touched.specialties
          }
          text="Specialties field is required."
        /> */}
			</Grid>
			<Grid item xs={12} sm={12} md={12} lg={12}>
				<label className="form-label">Nationality</label>
				<Select
					className="basic-single"
					classNamePrefix="select"
					onChange={(event) => {
						props.setFieldValue("nationality", event!.value);
					}}
					onBlur={(e) => {
						if (!props.values.nationality) {
							props.setTouched({ ...props.touched, nationality: true });
						}
					}}
					placeholder="Select your nationality"
					isSearchable={true}
					name="nationality"
					options={CFS_NATIONALITIES}
					styles={{
						control: (baseStyles, state) => {
							return {
								...baseStyles,
								border:
									!props.values.nationality && !!props.touched.nationality
										? "1px solid #d32f2f"
										: undefined,
								fontSize: "13px",
								paddingTop: "5px",
								paddingBottom: "5px",
							};
						},
						placeholder: (baseStyles) => ({
							...baseStyles,
							color: "rgba(0, 0, 0, 0.3)",
						}),
					}}
					value={
						props.values.nationality
							? {
									label: props.values.nationality,
									value: props.values.nationality,
							  }
							: undefined
					}
				/>
			</Grid>
			<Grid item xs={12} sm={12} md={12} lg={12}>
				<label className="form-label">Languages (Optional)</label>
				<MultiSelectInputWithCreate
					options={langOptions.map((language) => {
						return {
							keyword: language,
							label: language,
							value: language,
						};
					})}
					onChange={(e) => {
						const modifiedValue = e?.map((val) => val.keyword);
						props.setFieldValue("languages", modifiedValue);
					}}
					onCreate={(e) => {
						const modifiedValue = e?.map((val) => val.keyword);
						console.log(e);
						props.setFieldValue("languages", modifiedValue);
					}}
					placeholder="Select an language item to add"
					value={languageValue}
				/>
			</Grid>
			<Grid item xs={12} sm={12} md={12} lg={12}>
				<label className="form-label">Birth Date</label>
				<div className="date-picker-container">
					<DatePicker name="birthDate" />
				</div>
			</Grid>
			<Grid item xs={12} sm={12} md={12} lg={12}>
				<label className="form-label">
					Profile Picture (Optional)
					<HtmlTooltip
						title={
							<div
								className="default-image"
								style={{
									zIndex: 9999999999,
									display: "inline-block",
									position: "relative",
								}}
							>
								<p
									style={{
										textAlign: "center",
										fontSize: 14,
										marginBottom: 5,
										fontWeight: 300,
									}}
								>
									Default Image
								</p>
								<img
									src={DEFAULT_IMAGE}
									alt="default-avatar"
									style={{ width: "100%" }}
								/>
							</div>
						}
					>
						<span>
							<FaInfoCircle />
						</span>
					</HtmlTooltip>
				</label>
				<div>
					<MUIButton
						variant="contained"
						component="label"
						className="primary-cfs-btn input-file-btn"
					>
						Upload File
						<input
							type="file"
							hidden
							name="avatar"
							onChange={(event) => {
								props.setFieldValue("avatar", event.currentTarget.files![0]);
								const fileReader = new FileReader();
								fileReader.onload = () => {
									if (fileReader.readyState === 2) {
										setThumbnailPreview(fileReader.result?.toString() ?? "");
									}
								};
								fileReader.readAsDataURL(event.target.files![0]);
								window.removeEventListener("focus", handleFocusBack);
							}}
							onClick={clickedFileInput}
						/>
					</MUIButton>
					{thumbnailPreview ||
					(typeof props.values.avatar === "string" && props.values.avatar) ? (
						<div className="user-img-container">
							<img
								src={
									typeof props.values.avatar === "string"
										? props.values.avatar
										: thumbnailPreview
								}
								alt="user-profile-pic"
							></img>
						</div>
					) : null}
				</div>
			</Grid>
			<Grid item xs={12} sm={12} md={12} lg={12}>
				<button
					className="primary-cfs-btn"
					onClick={() => {
						props.onSubmit(props.values, 3);
					}}
					disabled={props.isValid}
				>
					Continue with your registration
				</button>
				<button
					className="secondary-cfs-btn"
					onClick={() => props.changeStage(1)}
				>
					Go back to previous stage
				</button>
			</Grid>
		</Grid>
	);
};

export default PersonalInfo;
