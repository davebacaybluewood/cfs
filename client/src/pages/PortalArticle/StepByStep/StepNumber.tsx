import React from 'react'
import { Box, Stack, Typography } from '@mui/material'
import './StepByStep.scss'

interface StepNumberProps {
  number: number
  title: string
  description: string
}

const StepNumber = ({ number, title, description }: StepNumberProps) => {
  return (
    <Box>
      <Stack flexDirection={'row'} gap={2}>
        <div className='step-number'>{number + 1}</div>
        <div>
          <Typography variant='h4'>{title}</Typography>
          <Typography variant='h6' sx={{ maxWidth: '80%' }} fontWeight={300}>
            {description}
          </Typography>
        </div>
      </Stack>
    </Box>
  )
}

export default StepNumber
