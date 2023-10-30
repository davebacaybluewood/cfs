import { Box } from '@mui/material'
import React, { useState, useEffect } from 'react'
import CategoryLinks from './CategoryLinks'
import {
  ARTICLE_TECHONOLOGY,
  ARTICLE_FINANCE,
  ARTICLE_HEALTH,
} from './TestLinks'

const Sidebar = () => {
  const [scrollPosition, setScrollPosition] = useState(0)

  const handleScroll = () => {
    const position = window.pageYOffset
    setScrollPosition(position)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  return (
    <>
      {/* When sidebar set to fixed */}
      <Box
        className='article-sidebar'
        sx={{
          padding: '4rem 3rem',
          minWidth: '300px',
          background: '#f7f7f7',
          alignSelf: 'flex-start',
          display: scrollPosition > 329 ? 'block' : 'none',
        }}
      ></Box>
      <Box
        className='article-sidebar'
        sx={{
          padding: '4rem 3rem',
          minWidth: '300px',
          background: 'white',
          alignSelf: 'flex-start',
          position: scrollPosition > 329 ? 'fixed' : null,
          top: scrollPosition > 329 ? '1rem' : null,
          // bottom: 0,
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
    </>
  )
}

export default Sidebar
