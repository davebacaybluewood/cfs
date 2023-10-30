import { Box, Stack, Typography } from '@mui/material'
import React from 'react'

const SideBySideContent = () => {
  return (
    <Box
      sx={{
        padding: '3rem 0',
      }}
    >
      <Stack flexDirection={'column'} gap={4}>
        <img
          style={{
            width: '60%',
          }}
          src='https://images.unsplash.com/photo-1665686306265-c52ee9054479?auto=format&fit=crop&q=80&w=3570&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          alt='laptop'
        />
        <div>
          <Typography variant='h5' fontWeight={300} lineHeight={2}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et nisi sit
            magni repudiandae provident, assumenda tempore maiores nesciunt
            perferendis neque aut incidunt eum rerum modi itaque, asperiores
            porro corrupti enim. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Et nisi sit magni repudiandae provident, assumenda
            tempore maiores nesciunt perferendis neque aut incidunt eum rerum
            modi itaque, asperiores porro corrupti enim.
          </Typography>
        </div>
      </Stack>
    </Box>
  )
}

export default SideBySideContent
