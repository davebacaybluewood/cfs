import { Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import './Sidebar.scss'

interface linksProps {
  title: string
  path: string
}

interface CategoryLinksProps {
  categoryTitle: string
  links: linksProps[]
}

const CategoryLinks = ({ categoryTitle, links }: CategoryLinksProps) => {
  return (
    <div style={{ marginBottom: '3.5rem' }}>
      <Typography sx={{ marginBottom: '1rem' }} variant='h5' component={'h5'}>
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
            style={{ fontSize: '15px', color: 'gray', fontWeight: 300 }}
            to={item.path}
          >
            {item.title}
          </Link>
        ))}
      </Stack>
    </div>
  )
}

export default CategoryLinks
