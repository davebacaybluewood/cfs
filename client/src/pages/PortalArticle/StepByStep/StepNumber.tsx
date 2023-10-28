import React from 'react'
import { Box, Stack, Typography } from '@mui/material'

interface StepNumberProps {
  number: number
  title: string
  description: string
}

const StepNumber = ({ number, title, description }: StepNumberProps) => {
  return (
    <Box>
      <Stack flexDirection={'row'} gap={2}>
        <div
          style={{
            background: 'darkblue',
            color: 'white',
            padding: '8px 20px',
            fontSize: '20px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {number + 1}
        </div>
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
