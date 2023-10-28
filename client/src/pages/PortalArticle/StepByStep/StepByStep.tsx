import { Box, Stack } from '@mui/material'
import React from 'react'
import StepNumber from './StepNumber'

const steps = [
  {
    title: 'Visit the website',
    description: `Visit the Comfort Financial Solutions website: Start by opening your
            web browser and typing in the URL for Comfort Financial Solutions.`,
  },
  {
    title: 'Locate login button',
    description: `Locate the "Login" button: Look for the "Login" or "Sign In" button on the top right corner of the webpage. Click on it to proceed.`,
  },
  {
    title: 'Enter your credentials',
    description: `Enter your credentials: You will be prompted to enter your username and password. Make sure to type in your correct login details.`,
  },
  {
    title: 'Click "Login"',
    description: `Once your credentials are entered, click the "Login" button to access your account.`,
  },
]

const StepByStep = () => {
  return (
    <Box>
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
