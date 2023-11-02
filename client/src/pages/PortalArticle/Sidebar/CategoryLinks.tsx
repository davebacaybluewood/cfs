import { Box, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import './Sidebar.scss'
import useIsMobile from '../custom-hook/useIsMobileMD'

interface linksProps {
  title: string
  path: string
}

interface CategoryLinksProps {
  categoryTitle: string
  links: linksProps[]
}

const CategoryLinks = ({ categoryTitle, links }: CategoryLinksProps) => {
  const isMobile = useIsMobile()
  return (
    <Box
      style={{
        marginBottom: '3.5rem',
      }}
    >
      <Typography
        sx={{ marginBottom: '1rem', textAlign: isMobile ? 'center' : 'start' }}
        variant='h5'
        component={'h5'}
      >
        {categoryTitle}
      </Typography>
      <Stack
        spacing={{ xs: 1, sm: 2 }}
        direction='column'
        useFlexGap
        flexWrap='wrap'
        sx={{ paddingLeft: '1.5rem' }}
      >
        {links.map((item, index) => (
          <Link
            className='sidebar-links'
            to={item.path}
            style={{ textAlign: isMobile ? 'center' : 'start' }}
          >
            {item.title}
          </Link>
        ))}
      </Stack>
    </Box>
  )
}

export default CategoryLinks
