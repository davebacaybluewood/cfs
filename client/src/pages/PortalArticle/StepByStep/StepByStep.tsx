import { Box, Stack } from '@mui/material'
import React from 'react'
import StepNumber from './StepNumber'

const steps = [
  {
    title: "Click on 'Log In Using Verification Code'",
    description:
      "To start the login process, click on the option that says 'Log In Using Verification Code.'",
    image: '/assets/images/article/steps/step1.png',
  },
  {
    title: 'Enter Your Email Address',
    description:
      'In the provided field, enter your registered email address to proceed.',
    image: '/assets/images/article/steps/step2.png',
  },
  {
    title: "Click 'Send Verification'",
    description:
      "Click the 'Send Verification' button to initiate the verification process. A code will be sent to your email.",
    image: '/assets/images/article/steps/step3.png',
  },
  {
    title: 'Receive the Verification Code',
    description:
      'Check your email inbox for the verification code. It will be sent to the email address you provided earlier.',
    image: '/assets/images/article/steps/step4.jpeg',
  },
  {
    title: 'Enter the Verification Code',
    description:
      'Retrieve the code from your email and enter it into the login portal to complete the verification process.',
    image: '/assets/images/article/steps/step5.png',
  },
  {
    title: "Access the Agent's Portal",
    description:
      "After successful verification, you will be automatically redirected to the Agent's Portal dashboard, where you can access your account and services.",
    image: '/assets/images/article/steps/step6.png',
  },
]

const StepByStep = () => {
  return (
    <Box style={{ margin: '3rem 0' }}>
      <Stack gap={2}>
        {steps.map((item, index) => (
          <StepNumber
            key={index}
            number={index}
            title={item.title}
            description={item.description}
            imagePath={item.image}
          />
        ))}
      </Stack>
    </Box>
  )
}

export default StepByStep
