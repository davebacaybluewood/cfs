import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import CategoryLinks from './CategoryLinks'

const links = [
  {
    title: 'Advice',
    path: '/',
  },
  {
    title: 'How to',
    path: '/',
  },
  {
    title: 'Photography',
    path: '/',
  },
  {
    title: 'Small Tips',
    path: '/',
  },
]

const Sidebar = () => {
  return (
    <Box
      sx={{
        padding: '2rem',
        minWidth: '250px',
        background: 'white',
        alignSelf: 'flex-start',
      }}
    >
      <CategoryLinks categoryTitle='Categories' links={links} />
      <CategoryLinks categoryTitle='Categories' links={links} />
      <CategoryLinks categoryTitle='Categories' links={links} />
    </Box>
  )
}

export default Sidebar
