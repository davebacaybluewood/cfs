import { useMediaQuery, useTheme } from '@mui/material'

function useIsMobile() {
  const theme = useTheme()
  return useMediaQuery(theme.breakpoints.down('md'))
}

export default useIsMobile
