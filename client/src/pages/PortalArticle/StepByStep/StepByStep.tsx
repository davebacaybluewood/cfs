import { Box, Stack } from '@mui/material'
import React from 'react'
import StepNumber from './StepNumber'

const steps = [
  {
    title: "Click on 'Sign In Using Verification Code'",
    description:
      "To start the login process, click on the option that says 'Sign In Using Verification Code.'",
  },
  {
    title: 'Enter Your Email Address',
    description:
      'In the provided field, enter your registered email address to proceed.',
  },
  {
    title: "Click 'Request Code'",
    description:
      "Click the 'Request Code' button to initiate the verification process. A code will be sent to your email.",
  },
  {
    title: 'Receive the Verification Code',
    description:
      'Check your email inbox for the verification code. It will be sent to the email address you provided earlier.',
  },
  {
    title: 'Enter the Verification Code',
    description:
      'Retrieve the code from your email and enter it into the login portal to complete the verification process.',
  },
  {
    title: "Access the Agent's Portal",
    description:
      "After successful verification, you will be automatically redirected to the Agent's Portal dashboard, where you can access your account and services.",
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
          />
        ))}
      </Stack>
    </Box>
  )
}

export default StepByStep
