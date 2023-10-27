import React from 'react'
import Sidebar from './Sidebar/Sidebar'
import { Box, Container, Stack } from '@mui/material'
import Content from './Content/Content'
import Header from './Header/Header'

const PortalArticle = () => {
  return (
    <Box sx={{ background: '#f7f7f7' }}>
      {/* Full width header */}
      <Header />
      <Container style={{ padding: '2rem 0' }}>
        <Stack gap={5} flexDirection={'row'}>
          <Sidebar />
          <Content />
        </Stack>
      </Container>
    </Box>
  )
}

export default PortalArticle
