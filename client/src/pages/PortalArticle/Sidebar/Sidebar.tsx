import { Box } from '@mui/material'
import React from 'react'
import CategoryLinks from './CategoryLinks'
import {
  ARTICLE_TECHONOLOGY,
  ARTICLE_FINANCE,
  ARTICLE_HEALTH,
} from './TestLinks'

const Sidebar = () => {
  return (
    <Box
      sx={{
        padding: '4rem 3rem',
        minWidth: '300px',
        background: 'white',
        alignSelf: 'flex-start',
      }}
    >
      <CategoryLinks categoryTitle='Technology' links={ARTICLE_TECHONOLOGY} />
      <CategoryLinks categoryTitle='Finance' links={ARTICLE_FINANCE} />
      <CategoryLinks
        categoryTitle='Health and Wellness'
        links={ARTICLE_HEALTH}
      />
      <CategoryLinks categoryTitle='Finance' links={ARTICLE_FINANCE} />
    </Box>
  )
}

export default Sidebar
