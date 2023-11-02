import { Box, Stack, Typography } from '@mui/material'
import StepByStep from '../StepByStep/StepByStep'
import './Content.scss'
import useIsMobile from '../custom-hook/useIsMobileMD'

const Content = () => {
  const isMobileMD = useIsMobile()
  return (
    <Box
      className='article-content'
      style={{
        paddingBottom: !isMobileMD ? '5rem' : '',
      }}
    >
      <img src='/assets/images/article/steps-illustration.svg' alt='' />
      <Typography sx={{ marginBottom: '0.5rem' }} fontWeight={500} variant='h4'>
        Step-by-Step Guide
      </Typography>
      <Typography variant='subtitle1' gutterBottom color={'gray'}>
        OCTOBER 28, 2023
      </Typography>
      <Typography
        fontWeight={300}
        variant='h5'
        component={'h5'}
        sx={{ marginTop: '2rem', marginBottom: '3rem', width: '100%' }}
        lineHeight={2}
      >
        Welcome Agent! We’re glad to welcome you here at CFS. Let’s get you
        started into the action, but first, let’s set-up your Accounting System
        account to track your accounting and hierarchy number. ! To access your
        Back Office account, please click the link below:
      </Typography>

      <Typography sx={{ marginBottom: '0.5rem' }} fontWeight={500} variant='h4'>
        Access Your Back Office Account(Link)
      </Typography>

      <Typography
        fontWeight={300}
        variant='h5'
        component={'h5'}
        sx={{ marginTop: '0.5rem', marginBottom: isMobileMD ? '' : '2rem' }}
        lineHeight={2}
      >
        Once set-up with your Back Office account, let’s get you up to speed
        with your tools. Set-up your suitcase by accessing the Agent’s portal on
        the link below:
      </Typography>
      <Typography
        fontWeight={300}
        variant='h5'
        component={'h5'}
        sx={{ marginTop: '0.5rem', marginBottom: isMobileMD ? '' : '6rem' }}
        lineHeight={2}
      >
        <a
          className='agent-portal-button'
          target='_blank'
          href='https://www.gocfs.pro/portal/login'
        >
          Get access
        </a>
      </Typography>
      <StepByStep />

      <Box
        sx={{
          padding: '3rem 0',
        }}
      >
        <Stack flexDirection={isMobileMD ? 'column' : 'row'} gap={4}>
          <img
            style={{
              width: isMobileMD ? '100%' : '60%',
            }}
            src='/assets/images/article/done.svg'
            alt='laptop'
          />
          <div>
            <Typography variant='h5' fontWeight={300} lineHeight={2}>
              <strong style={{ color: 'green' }}>Congratulations!</strong> With
              this one-time set-up done, you now have access to all of CFS’
              latest tech to help you achieve financial comfort and success.
              Goodluck agent, and together, let us re-shape the financial
              industry.
            </Typography>
          </div>
        </Stack>
      </Box>
    </Box>
  )
}

export default Content
