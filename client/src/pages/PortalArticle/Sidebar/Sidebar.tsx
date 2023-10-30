import { Box, Grid, Stack } from '@mui/material'
import { useState, useEffect } from 'react'
import CategoryLinks from './CategoryLinks'
import {
  ARTICLE_TECHONOLOGY,
  ARTICLE_FINANCE,
  ARTICLE_HEALTH,
} from './TestLinks'
import './Sidebar.scss'
import useIsMobileMD from '../custom-hook/useIsMobileMD'

const Sidebar = () => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const isMobileMD = useIsMobileMD()

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
      {/* when sidebar is set to fix, display a copy of a sidebar to not break the display flex layout */}
      <Box
        className='article-sidebar'
        sx={{
          display: scrollPosition > 329 && !isMobileMD ? 'block' : 'none',
        }}
      ></Box>
      <Box
        className='article-sidebar'
        sx={{
          position: scrollPosition > 329 && !isMobileMD ? 'fixed' : 'static',
          top: scrollPosition > 329 ? '1rem' : null,
          width: isMobileMD ? '100%' : '20%',
        }}
      >
        <Grid container spacing={2}>
          <Grid item sm={6} md={12}>
            <CategoryLinks
              categoryTitle='Technology'
              links={ARTICLE_TECHONOLOGY}
            />
          </Grid>
          <Grid item sm={6} md={12}>
            <CategoryLinks categoryTitle='Finance' links={ARTICLE_FINANCE} />
          </Grid>
          <Grid item sm={6} md={12}>
            <CategoryLinks
              categoryTitle='Health and Wellness'
              links={ARTICLE_HEALTH}
            />
          </Grid>
          <Grid item sm={6} md={12}>
            <CategoryLinks categoryTitle='Finance' links={ARTICLE_FINANCE} />
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default Sidebar
