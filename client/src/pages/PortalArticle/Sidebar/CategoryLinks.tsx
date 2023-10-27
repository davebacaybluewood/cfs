import { Stack, Typography } from '@mui/material'
import React from 'react'

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
        Categories
      </Typography>
      <Stack
        spacing={{ xs: 1, sm: 1 }}
        direction='column'
        useFlexGap
        flexWrap='wrap'
      >
        {links.map((item, index) => (
          <Typography
            key={index}
            fontWeight={300}
            variant='h5'
            component={'h5'}
          >
            {item.title}
          </Typography>
        ))}
      </Stack>
    </div>
  )
}

export default CategoryLinks
