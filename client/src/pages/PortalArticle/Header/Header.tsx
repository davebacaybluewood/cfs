import { Box, Container, Typography } from '@mui/material'
import React from 'react'

const Header = () => {
  return (
    <Box
      sx={{
        background:
          "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1664575602276-acd073f104c1?auto=format&fit=crop&q=80&w=3570&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <Container sx={{ padding: '10rem 0' }}>
        <Typography variant='h2' fontWeight={700} color={'white'}>
          Navigating Comfort Financial Solutions Portal: A Step-by-Step Guide
        </Typography>
      </Container>
    </Box>
  )
}

export default Header
