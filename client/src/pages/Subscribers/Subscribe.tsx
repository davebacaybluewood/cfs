// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { ErrorMessage, Field, Formik, Form } from "formik";
// import { IsUserValid, sendEmailConfirmation } from "../../api/subscriber";
// import "./Subscribe.scss";

// const Subscribe: React.FC = () => {
//   let { agentId } = useParams();
//   const navigate = useNavigate();
//   const [isValidUser, setIsValidUser] = useState(false);
//   const [showErrorMessage, setShowErrorMessage] = useState(false);
//   const [step, setStep] = useState(1);
//   const [confirmationCode, setConfirmationCode] = useState(Math.random());

//   const nextStep = () => {
//     setStep(step + 1);
//   };

//   const prevStep = () => {
//     setStep(step - 1);
//   };

//   useEffect(() => {
//     // Check if the user is valid using the IsUserValid module
//     if (agentId) {
//       IsUserValid.validdateuser(agentId)
//         .then((response) => {
//           setIsValidUser(response);
//           if (!response) {
//             setShowErrorMessage(true);
//           }
//         })
//         .catch((error) => {
//           console.error("Error validating user:", error);
//           setShowErrorMessage(true);
//         });
//     }
//   }, [agentId]);

//   const generateConfirmationCode = () => {
//     const code = Math.floor(1000000 + Math.random() * 9000000);
//     setConfirmationCode(code);
//   };

//   const initialValues = {
//     firstName: "",
//     lastName: "",
//     phoneNumber: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     confirmationCode: "",
//     agentGuidId: agentId,
//   };

//   return (
//     <div className="subscribe-main-wrapper">
//       {showErrorMessage ? (
//         <div className="error-message">Invalid User</div>
//       ) : isValidUser ? (
//         <div className="main-column">
//           <div className="col-left">
//             <div className="text-wrapper"><h1 className="left-header">Welcome to</h1></div>
//             <div className="text-wrapper"><h1 className="left-header">CFS</h1></div>
//           </div>
//           <div className="col-right">
//             <div className="col-right-form">
//               <Formik
//                 initialValues={initialValues}
//                 onSubmit={(values, { setSubmitting }) => {
//                   console.log(values);
//                   const enteredCode = parseInt(values.confirmationCode, 10);

//                   if (enteredCode === confirmationCode) {
//                     console.log("Verification is correct");
//                   }
//                   setSubmitting(false);
//                   nextStep();
//                 }}
//               >
//                 {({ values, isSubmitting, handleSubmit }) => (
//                   <Form>
//                     {step == 1 && (
//                       <div className="registration-part">
//                         <Field
//                           type="text"
//                           name="firstName"
//                           placeholder="First Name"
//                         />
//                         <ErrorMessage name="firstName" component="div" />

//                         <Field
//                           type="text"
//                           name="lastName"
//                           placeholder="Last Name"
//                         />
//                         <ErrorMessage name="lastName" component="div" />

//                         <Field
//                           type="tel"
//                           name="phoneNumber"
//                           placeholder="Phone Number"
//                         />
//                         <ErrorMessage name="phoneNumber" component="div" />

//                         <Field type="email" name="email" placeholder="Email" />
//                         <ErrorMessage name="email" component="div" />

//                         <Field
//                           type="password"
//                           name="password"
//                           placeholder="Password"
//                         />
//                         <ErrorMessage name="password" component="div" />

//                         <Field
//                           type="password"
//                           name="confirmPassword"
//                           placeholder="Confirm Password"
//                         />
//                         <ErrorMessage name="confirmPassword" component="div" />

//                         <button type="button" onClick={nextStep}>
//                           Next
//                         </button>
//                       </div>
//                     )}
//                     {step === 2 && (
//                       <div className="verification-part">
//                         <Field
//                           type="text"
//                           name="confirmationCode"
//                           placeholder="confirmation Codee"
//                         />
//                         <ErrorMessage name="confirmationCode" component="div" />

//                         <button type="button" onClick={prevStep}>
//                           Back
//                         </button>
//                         <button type="submit" disabled={isSubmitting}>
//                           Submit
//                         </button>
//                       </div>
//                     )}
//                   </Form>
//                 )}
//               </Formik>
//             </div>
//           </div>
//         </div>
//       ) : null}
//     </div>
//   );
// };

// export default Subscribe;

// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { ErrorMessage, Field, Formik, Form } from "formik";
// import { IsUserValid, sendEmailConfirmation } from "../../api/subscriber";
// import "./Subscribe.scss";

// const Subscribe: React.FC = () => {
//   let { agentId } = useParams();
//   const navigate = useNavigate();
//   const [isValidUser, setIsValidUser] = useState(false);
//   const [showErrorMessage, setShowErrorMessage] = useState(false);
//   const [step, setStep] = useState(1);
//   const [confirmationCode, setConfirmationCode] = useState(Math.floor(1000000 + Math.random() * 9000000));

//   const nextStep = () => {
//     setStep(step + 1);
//   };

//   const prevStep = () => {
//     setStep(step - 1);
//   };

//   useEffect(() => {
//     // Check if the user is valid using the IsUserValid module
//     if (agentId) {
//       IsUserValid.validdateuser(agentId)
//         .then((response) => {
//           setIsValidUser(response);
//           if (!response) {
//             setShowErrorMessage(true);
//           }
//         })
//         .catch((error) => {
//           console.error("Error validating user:", error);
//           setShowErrorMessage(true);
//         });
//     }
//   }, [agentId]);

//   // Function to send the email confirmation
//   const handleSendEmailConfirmation = async (values) => {
//     try {
//       // Call sendEmailConfirmation function with email and confirmationCode
//       setConfirmationCode(Math.floor(1000000 + Math.random() * 9000000));
//       await sendEmailConfirmation(values.email, confirmationCode);

//       // Move to the next step
//       nextStep();
//     } catch (error) {
//       console.error("Error sending email confirmation:", error);
//     }
//   };

//   const initialValues = {
//     firstName: "",
//     lastName: "",
//     phoneNumber: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     confirmationCode: "",
//     agentGuidId: agentId,
//   };

//   return (
//     <div className="subscribe-main-wrapper">
//       {showErrorMessage ? (
//         <div className="error-message">Invalid User</div>
//       ) : isValidUser ? (
//         <div className="main-column">
//           <div className="col-left">
//             <div className="text-wrapper"><h1 className="left-header">Welcome to</h1></div>
//             <div className="text-wrapper"><h1 className="left-header">CFS</h1></div>
//           </div>
//           <div className="col-right">
//             <div className="col-right-form">
//               <Formik
//                 initialValues={initialValues}
//                 onSubmit={(values, { setSubmitting }) => {
//                   console.log(values);
//                   const enteredCode = parseInt(values.confirmationCode, 10);

//                   if (enteredCode === confirmationCode) {
//                     // Send email confirmation if the code matches
//                     handleSendEmailConfirmation(values.email);
//                   }

//                   setSubmitting(false);
//                 }}
//               >
//                 {({ values, isSubmitting, handleSubmit }) => (
//                   <Form>
//                     {step === 1 && (
//                       <div className="registration-part">
//                         <Field
//                           type="text"
//                           name="firstName"
//                           placeholder="First Name"
//                         />
//                         <ErrorMessage name="firstName" component="div" />

//                         <Field
//                           type="text"
//                           name="lastName"
//                           placeholder="Last Name"
//                         />
//                         <ErrorMessage name="lastName" component="div" />

//                         <Field
//                           type="tel"
//                           name="phoneNumber"
//                           placeholder="Phone Number"
//                         />
//                         <ErrorMessage name="phoneNumber" component="div" />

//                         <Field type="email" name="email" placeholder="Email" />
//                         <ErrorMessage name="email" component="div" />

//                         <Field
//                           type="password"
//                           name="password"
//                           placeholder="Password"
//                         />
//                         <ErrorMessage name="password" component="div" />

//                         <Field
//                           type="password"
//                           name="confirmPassword"
//                           placeholder="Confirm Password"
//                         />
//                         <ErrorMessage name="confirmPassword" component="div" />

//                         <button
//                           type="button"
//                           onClick={() => handleSendEmailConfirmation(values)}
//                           disabled={!values.email}
//                         >
//                           Next
//                         </button>
//                       </div>
//                     )}
//                     {step === 2 && (
//                       <div className="verification-part">
//                         <Field
//                           type="text"
//                           name="confirmationCode"
//                           placeholder="Confirmation Code"
//                         />
//                         <ErrorMessage name="confirmationCode" component="div" />

//                         <button type="button" onClick={prevStep}>
//                           Back
//                         </button>
//                         <button type="submit" disabled={isSubmitting || !values.confirmationCode}>
//                           Submit
//                         </button>
//                       </div>
//                     )}
//                   </Form>
//                 )}
//               </Formik>
//             </div>
//           </div>
//         </div>
//       ) : null}
//     </div>
//   );
// };

// export default Subscribe;

// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { ErrorMessage, Field, Formik, Form } from "formik";
// import { IsUserValid, sendEmailConfirmation } from "../../api/subscriber";
// import "./Subscribe.scss";

// const Subscribe: React.FC = () => {
//   let { agentId } = useParams();
//   const navigate = useNavigate();
//   const [isValidUser, setIsValidUser] = useState(false);
//   const [showErrorMessage, setShowErrorMessage] = useState(false);
//   const [step, setStep] = useState(1);
//   const [confirmationCode, setConfirmationCode] = useState(
//     Math.floor(1000000 + Math.random() * 9000000)
//   );

//   const nextStep = () => {
//     setStep(step + 1);
//   };

//   const prevStep = () => {
//     setStep(step - 1);
//   };

//   useEffect(() => {
//     // Check if the user is valid using the IsUserValid module
//     if (agentId) {
//       IsUserValid.validdateuser(agentId)
//         .then((response) => {
//           setIsValidUser(response);
//           if (!response) {
//             setShowErrorMessage(true);
//           }
//         })
//         .catch((error) => {
//           console.error("Error validating user:", error);
//           setShowErrorMessage(true);
//         });
//     }
//   }, [agentId]);

//   const handleSendEmailConfirmation = async (values) => {
//     try {
//       setConfirmationCode(Math.floor(1000000 + Math.random() * 9000000));
//       await sendEmailConfirmation(values.email, confirmationCode);
//       nextStep();
//     } catch (error) {
//       console.error("Error sending email confirmation:", error);
//     }
//   };

//   const initialValues = {
//     firstName: "",
//     lastName: "",
//     phoneNumber: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     confirmationCode: "",
//     agentGuidId: agentId,
//   };

//   return (
//     <div className="portal-registration-container">
//       {showErrorMessage ? (
//         <div className="error-message">Invalid User</div>
//       ) : isValidUser ? (
//         <div className="main-column">
//           <div className="left-col">
//             <div className="captions">
//               <h1 className="left-header">Welcome to</h1>
//               <h1 className="left-header">CFS</h1>
//               <p>Start your journey with us today.</p>
//             </div>
//           </div>
//           <div className="right-col">
//             <div className="portal-form">
//               <Formik
//                 initialValues={initialValues}
//                 onSubmit={(values, { setSubmitting }) => {
//                   console.log(values);
//                   const enteredCode = parseInt(
//                     values.confirmationCode,
//                     10
//                   );

//                   if (enteredCode === confirmationCode) {
//                     handleSendEmailConfirmation(values);
//                   }

//                   setSubmitting(false);
//                 }}
//               >
//                 {({ values, isSubmitting, handleSubmit }) => (
//                   <Form>
//                     {step === 1 && (
//                       <div className="registration-part">
//                         <Field
//                           type="text"
//                           name="firstName"
//                           placeholder="First Name"
//                         />
//                         <ErrorMessage name="firstName" component="div" />

//                         <Field
//                           type="text"
//                           name="lastName"
//                           placeholder="Last Name"
//                         />
//                         <ErrorMessage name="lastName" component="div" />

//                         <Field
//                           type="tel"
//                           name="phoneNumber"
//                           placeholder="Phone Number"
//                         />
//                         <ErrorMessage name="phoneNumber" component="div" />

//                         <Field type="email" name="email" placeholder="Email" />
//                         <ErrorMessage name="email" component="div" />

//                         <Field
//                           type="password"
//                           name="password"
//                           placeholder="Password"
//                         />
//                         <ErrorMessage name="password" component="div" />

//                         <Field
//                           type="password"
//                           name="confirmPassword"
//                           placeholder="Confirm Password"
//                         />
//                         <ErrorMessage
//                           name="confirmPassword"
//                           component="div"
//                         />

//                         <button
//                           type="button"
//                           onClick={() => handleSendEmailConfirmation(values)}
//                           disabled={!values.email}
//                         >
//                           Next
//                         </button>
//                       </div>
//                     )}
//                     {step === 2 && (
//                       <div className="verification-part">
//                         <Field
//                           type="text"
//                           name="confirmationCode"
//                           placeholder="Confirmation Code"
//                         />
//                         <ErrorMessage
//                           name="confirmationCode"
//                           component="div"
//                         />

//                         <button type="button" onClick={prevStep}>
//                           Back
//                         </button>
//                         <button
//                           type="submit"
//                           disabled={isSubmitting || !values.confirmationCode}
//                         >
//                           Submit
//                         </button>
//                       </div>
//                     )}
//                   </Form>
//                 )}
//               </Formik>
//             </div>
//           </div>
//         </div>
//       ) : null}
//     </div>
//   );
// };

// export default Subscribe;

// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { ErrorMessage, Field, Formik, Form, useFormikContext } from "formik"; // Import useFormikContext
// import { IsUserValid, sendEmailConfirmation } from "../../api/subscriber";
// import "./Subscribe.scss";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";

// const Subscribe = () => {
//   let { agentId } = useParams();
//   const navigate = useNavigate();
//   const [isValidUser, setIsValidUser] = useState(false);
//   const [showErrorMessage, setShowErrorMessage] = useState(false);
//   const [step, setStep] = useState(1);
//   const [confirmationCode, setConfirmationCode] = useState(
//     Math.floor(1000000 + Math.random() * 9000000)
//   );

//   const nextStep = () => {
//     setStep(step + 1);
//   };

//   const prevStep = () => {
//     setStep(step - 1);
//   };

//   useEffect(() => {
//     // Check if the user is valid using the IsUserValid module
//     if (agentId) {
//       IsUserValid.validdateuser(agentId)
//         .then((response) => {
//           setIsValidUser(response);
//           if (!response) {
//             setShowErrorMessage(true);
//           }
//         })
//         .catch((error) => {
//           console.error("Error validating user:", error);
//           setShowErrorMessage(true);
//         });
//     }
//   }, [agentId]);

//   const handleSendEmailConfirmation = async (values) => {
//     try {
//       setConfirmationCode(Math.floor(1000000 + Math.random() * 9000000));
//       await sendEmailConfirmation(values.email, confirmationCode);
//       nextStep();
//     } catch (error) {
//       console.error("Error sending email confirmation:", error);
//     }
//   };

//   const initialValues = {
//     firstName: "",
//     lastName: "",
//     phoneNumber: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     confirmationCode: "",
//     agentGuidId: agentId,
//   };

//   return (
//     <div className="portal-registration-container">
//       {showErrorMessage ? (
//         <div className="error-message">Invalid User</div>
//       ) : isValidUser ? (
//         <div className="main-column">
//           <div className="left-col">
//             <div className="captions">
//               <h1 className="left-header">Welcome to</h1>
//               <h1 className="left-header">CFS</h1>
//               <p>Start your journey with us today.</p>
//             </div>
//           </div>
//           <div className="right-col">
//             <div className="portal-form">
//               <Formik
//                 initialValues={initialValues}
//                 onSubmit={(values, { setSubmitting }) => {
//                   console.log(values);
//                   const enteredCode = parseInt(
//                     values.confirmationCode,
//                     10
//                   );

//                   if (enteredCode === confirmationCode) {
//                     handleSendEmailConfirmation(values);
//                   }

//                   setSubmitting(false);
//                 }}
//               >
//                 {({ values, isSubmitting, handleSubmit }) => (
//                   <Form>
//                     {step === 1 && (
//                       <div className="registration-part">
//                         <TextField
//                           type="text"
//                           name="firstName"
//                           label="First Name"
//                           variant="outlined"
//                           fullWidth
//                           margin="normal"
//                         />
//                         <ErrorMessage name="firstName" component="div" />

//                         <TextField
//                           type="text"
//                           name="lastName"
//                           label="Last Name"
//                           variant="outlined"
//                           fullWidth
//                           margin="normal"
//                         />
//                         <ErrorMessage name="lastName" component="div" />

//                         <TextField
//                           type="tel"
//                           name="phoneNumber"
//                           label="Phone Number"
//                           variant="outlined"
//                           fullWidth
//                           margin="normal"
//                         />
//                         <ErrorMessage name="phoneNumber" component="div" />

//                         <TextField
//                           type="email"
//                           name="email"
//                           label="Email"
//                           variant="outlined"
//                           fullWidth
//                           margin="normal"
//                         />
//                         <ErrorMessage name="email" component="div" />

//                         <TextField
//                           type="password"
//                           name="password"
//                           label="Password"
//                           variant="outlined"
//                           fullWidth
//                           margin="normal"
//                         />
//                         <ErrorMessage name="password" component="div" />

//                         <TextField
//                           type="password"
//                           name="confirmPassword"
//                           label="Confirm Password"
//                           variant="outlined"
//                           fullWidth
//                           margin="normal"
//                         />
//                         <ErrorMessage
//                           name="confirmPassword"
//                           component="div"
//                         />

//                         <Button
//                           variant="contained"
//                           color="primary"
//                           type="button"
//                           onClick={handleSendEmailConfirmation}
//                           disabled={!values.email}
//                         >
//                           Next
//                         </Button>
//                       </div>
//                     )}
//                     {step === 2 && (
//                       <div className="verification-part">
//                         <TextField
//                           type="text"
//                           name="confirmationCode"
//                           label="Confirmation Code"
//                           variant="outlined"
//                           fullWidth
//                           margin="normal"
//                         />
//                         <ErrorMessage
//                           name="confirmationCode"
//                           component="div"
//                         />

//                         <Button
//                           variant="contained"
//                           type="button"
//                           onClick={prevStep}
//                         >
//                           Back
//                         </Button>
//                         <Button
//                           variant="contained"
//                           color="primary"
//                           type="submit"
//                           disabled={isSubmitting || !values.confirmationCode}
//                         >
//                           Submit
//                         </Button>
//                       </div>
//                     )}
//                   </Form>
//                 )}
//               </Formik>
//             </div>
//           </div>
//         </div>
//       ) : null}
//     </div>
//   );
// };

// export default Subscribe;

// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { ErrorMessage, Field, Formik, Form, useFormikContext } from "formik"; // Import useFormikContext
// import * as Yup from "yup"; // Import Yup for validation
// import { IsUserValid, sendEmailConfirmation, validateEmail } from "../../api/subscriber";
// import "./Subscribe.scss";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";

// const Subscribe = () => {
//   let { agentId } = useParams();
//   const navigate = useNavigate();
//   const [isValidUser, setIsValidUser] = useState(false);
//   const [showErrorMessage, setShowErrorMessage] = useState(false);
//   const [step, setStep] = useState(1);
//   const [confirmationCode, setConfirmationCode] = useState(
//     Math.floor(1000000 + Math.random() * 9000000)
//   );

//   const nextStep = () => {
//     setStep(step + 1);
//   };

//   const prevStep = () => {
//     setStep(step - 1);
//   };

//   useEffect(() => {
//     // Check if the user is valid using the IsUserValid module
//     if (agentId) {
//       IsUserValid.validdateuser(agentId)
//         .then((response) => {
//           setIsValidUser(response);
//           if (!response) {
//             setShowErrorMessage(true);
//           }
//         })
//         .catch((error) => {
//           console.error("Error validating user:", error);
//           setShowErrorMessage(true);
//         });
//     }
//   }, [agentId]);

//   const handleSendEmailConfirmation = async (values) => {
//     try {
//       setConfirmationCode(Math.floor(1000000 + Math.random() * 9000000));
//       await sendEmailConfirmation(values.email, confirmationCode);
//       nextStep();
//     } catch (error) {
//       console.error("Error sending email confirmation:", error);
//     }
//   };

//   const initialValues = {
//     firstName: "",
//     lastName: "",
//     phoneNumber: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     confirmationCode: "",
//     agentGuidId: agentId,
//   };

//   // Define a Yup validation schema
//   const validationSchema = Yup.object().shape({
//     firstName: Yup.string().required("First Name is required"),
//     lastName: Yup.string().required("Last Name is required"),
//     phoneNumber: Yup.string().required("Phone Number is required"),
//     email: Yup.string()
//       .email("Invalid email format")
//       .required("Email is required"),
//     password: Yup.string().required("Password is required"),
//     confirmPassword: Yup.string()
//       .test("passwords-match", "Passwords must match", function (value) {
//         return this.parent.password === value || value === null;
//       })
//       .required("Confirm Password is required"),
//     confirmationCode: Yup.string().required("Confirmation Code is required"),
//   });

//   // Define a custom component for the "Next" button
//   const NextButton = () => {
//     // Get access to the Formik context
//     const formik = useFormikContext();

//     return (
//       <Button
//         variant="contained"
//         color="primary"
//         type="button"
//         onClick={() => {
//           // Access the values object from the Formik context
//           const { values } = formik;

//           // Now you can use values.email or other form values
//           console.log(values);

//           // Rest of your logic
//           handleSendEmailConfirmation(values);
//         }}
//       >
//         Next
//       </Button>
//     );
//   };

//   return (
//     <div className="portal-registration-container">
//       {showErrorMessage ? (
//         <div className="error-message">Invalid User</div>
//       ) : isValidUser ? (
//         <div className="main-column">
//           <div className="left-col">
//             <div className="captions">
//               <h1 className="left-header">Welcome to</h1>
//               <h1 className="left-header">CFS</h1>
//               <p>Start your journey with us today.</p>
//             </div>
//           </div>
//           <div className="right-col">
//             <div className="portal-form">
//               <Formik
//                 initialValues={initialValues}
//                 validationSchema={validationSchema}
//                 onSubmit={async (values, { setSubmitting }) => {
//                   console.log(values);
//                   setSubmitting(false);
//                 }}
//               >
//                 {({ values, isSubmitting, handleSubmit }) => (
//                   <Form>
//                     {step === 1 && (
//                       <div className="registration-part">
//                         <Field
//                           component={TextField}
//                           type="text"
//                           name="firstName"
//                           label="First Name"
//                           variant="outlined"
//                           fullWidth
//                           margin="normal"
//                         />
//                         <ErrorMessage name="firstName" component="div" />

//                         <Field
//                           component={TextField}
//                           type="text"
//                           name="lastName"
//                           label="Last Name"
//                           variant="outlined"
//                           fullWidth
//                           margin="normal"
//                         />
//                         <ErrorMessage name="lastName" component="div" />

//                         <Field
//                           component={TextField}
//                           type="tel"
//                           name="phoneNumber"
//                           label="Phone Number"
//                           variant="outlined"
//                           fullWidth
//                           margin="normal"
//                         />
//                         <ErrorMessage name="phoneNumber" component="div" />

//                         <Field
//                           component={TextField}
//                           type="email"
//                           name="email"
//                           label="Email"
//                           variant="outlined"
//                           fullWidth
//                           margin="normal"
//                         />
//                         <ErrorMessage name="email" component="div" />

//                         <Field
//                           component={TextField}
//                           type="password"
//                           name="password"
//                           label="Password"
//                           variant="outlined"
//                           fullWidth
//                           margin="normal"
//                         />
//                         <ErrorMessage name="password" component="div" />

//                         <Field
//                           component={TextField}
//                           type="password"
//                           name="confirmPassword"
//                           label="Confirm Password"
//                           variant="outlined"
//                           fullWidth
//                           margin="normal"
//                         />
//                         <ErrorMessage name="confirmPassword" component="div" />

//                         <NextButton />
//                       </div>
//                     )}
//                   </Form>
//                 )}
//               </Formik>
//             </div>
//           </div>
//         </div>
//       ) : null}
//     </div>
//   );
// };

// export default Subscribe;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorMessage, Field, Formik, Form, useFormikContext } from "formik"; // Import useFormikContext
import * as Yup from "yup"; // Import Yup for validation
import {
  IsUserValid,
  sendEmailConfirmation,
  validateEmail,
} from "../../api/subscriber";
import "./Subscribe.scss";
import { ValuesType } from "./models";
import FormikTextInput from "library/Formik/FormikInput";
import { Grid, TextField, Button } from "@mui/material";

const Subscribe = () => {
  const [initialValues, setInitialValues] = useState<ValuesType>({
    emailAddress: "",
    password: "",
    confirmPassword: "",
    lastName: "",
    phoneNumber: "",
    firstName: "",
  });

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name field is required."),
    lastName: Yup.string().required("Last Name field is required."),
    phoneNumber: Yup.string().required("Phone Number field is required."),
    emailAddress: Yup.string().required("Email Address field is required."),
    password: Yup.string()
      .required("Password field is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must contain 8 characters, one Uppercase, one lowercase, one number and one special case character."
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null as any], "Passwords must match")
      .required("Confirm password field is required"),
  });

  return (
    <div className="subscriber-registration-container">
      <div className="left-col">
        <div className="captions">
          <h1 className="left-header">
            <React.Fragment>
              Welcome <br /> to CFS
            </React.Fragment>
          </h1>
        </div>
      </div>
      <div className="right-col">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={() => {
            console.log("Submitting");
          }}
        >
          <>
            <Grid>
              <React.Fragment>
                <h2>STEP 1</h2>
                <h2>Subscriber Information</h2>
              </React.Fragment>
              <React.Fragment>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <label className="form-label">Email Address</label>
                    <FormikTextInput
                      name="emailAddress"
                      value={""}
                      variant="outlined"
                      placeholder="Enter your email address"
                    />
                    <label className="form-label">First Name</label>
                    <FormikTextInput
                      name="firstName"
                      value={""}
                      variant="outlined"
                      placeholder="Enter your First name"
                    />
                    <label className="form-label">Last Name</label>
                    <FormikTextInput
                      name="lastName"
                      value={""}
                      variant="outlined"
                      placeholder="Enter your Last name"
                    />
                    <label className="form-label">Password</label>
                    <FormikTextInput
                      name="password"
                      value={""}
                      variant="outlined"
                      placeholder="Enter your Password"
                    />
                    <label className="form-label">Confirm Password</label>
                    <FormikTextInput
                      name="confirmPassword"
                      value={""}
                      variant="outlined"
                      placeholder="Confirm Password"
                    />
                    <button
                      className="secondary-cfs-btn"
                      onClick={() => {
                        console.log("next");
                      }}
                      disabled
                    >
                      Next
                    </button>
                  </Grid>
                </Grid>
              </React.Fragment>
            </Grid>
          </>
        </Formik>
      </div>
    </div>
  );
};

export default Subscribe;
