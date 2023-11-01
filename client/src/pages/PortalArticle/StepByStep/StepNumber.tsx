import React from 'react'
import { Box, Stack, Typography } from '@mui/material'
import './StepByStep.scss'
import useIsMobile from '../custom-hook/useIsMobileMD'

interface StepNumberProps {
  number: number
  title: string
  description: string
  imagePath: string
}

const StepNumber = ({
  number,
  title,
  description,
  imagePath,
}: StepNumberProps) => {
  const isMobileMD = useIsMobile()
  return (
    <Box>
      <Stack flexDirection={isMobileMD ? 'column' : `row`} gap={4}>
        {/* image */}
        <div style={{ width: isMobileMD ? '100%' : '60%' }}>
          <img
            style={{ width: '100%', height: 'auto' }}
            src={imagePath}
            alt=''
          />
        </div>

        <Stack flexDirection={'column'} gap={2} sx={{ width: isMobileMD ? '100%' : '40%' }}>
          <span className='step-number'>{number + 1}</span>
          <div>
            <Typography variant='h4' sx={{ marginBottom: '1rem' }}>
              {title}
            </Typography>
            <Typography variant='h6' sx={{ maxWidth: '80%' }} fontWeight={300}>
              {description}
            </Typography>
          </div>
        </Stack>
      </Stack>
    </Box>
  )
}

export default StepNumber
