import Sidebar from './Sidebar/Sidebar'
import { Box, Container, Stack } from '@mui/material'
import Content from './Content/Content'
import Header from './Header/Header'
import useIsMobile from './custom-hook/useIsMobileMD'

const PortalArticle = () => {
  const isMobileMD = useIsMobile()
  return (
    <Box sx={{ background: '#f7f7f7' }}>
      {/* Full width header */}
      <Header />
      <Container style={{ padding: '2rem 0' }}>
        <Stack
          sx={{ position: 'relative' }}
          gap={5}
          flexDirection={isMobileMD ? 'column-reverse' : 'row'}
        >
          <Sidebar />
          <Content />
        </Stack>
      </Container>
    </Box>
  )
}

export default PortalArticle
