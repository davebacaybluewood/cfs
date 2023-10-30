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
      <img
        src='https://images.unsplash.com/photo-1586314265219-192da32be7eb?auto=format&fit=crop&q=80&w=3570&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        alt=''
      />
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
        sx={{ marginTop: '2rem', marginBottom: '3rem' }}
        lineHeight={2}
      >
        Comfort Financial Solutions is committed to providing a seamless and
        convenient online experience for our clients. Our user-friendly portal
        offers a host of features to help you manage your financial needs
        efficiently. In this guide, we'll walk you through the basics of using
        the Comfort Financial Solutions Portal. Whether you need to access your
        account, update your profile, or check important information, we've got
        you covered with easy-to-follow instructions.
      </Typography>

      <Typography
        fontWeight={300}
        variant='h5'
        component={'h5'}
        sx={{ marginTop: '0.5rem', marginBottom: isMobileMD ? '' : '4rem' }}
        lineHeight={2}
      >
        Visit the Comfort Financial Solutions website: Start by opening your web
        browser and typing in the URL for Comfort Financial Solutions. Locate
        the "Login" button: Look for the "Login" or "Sign In" button on the top
        right corner of the webpage. Click on it to proceed. Enter your
        credentials: You will be prompted to enter your username and password.
        Make sure to type in your correct login details. Click "Login": Once
        your credentials are entered, click the "Login" button to access your
        account.
      </Typography>
      <StepByStep />

      <Box
        sx={{
          padding: '3rem 0',
        }}
      >
        <Stack flexDirection={'column'} gap={4}>
          <img
            style={{
              width: isMobileMD ? '100%' : '60%',
            }}
            src='https://images.unsplash.com/photo-1665686306265-c52ee9054479?auto=format&fit=crop&q=80&w=3570&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            alt='laptop'
          />
          <div>
            <Typography variant='h5' fontWeight={300} lineHeight={2}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Et nisi
              sit magni repudiandae provident, assumenda tempore maiores
              nesciunt perferendis neque aut incidunt eum rerum modi itaque,
              asperiores porro corrupti enim. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Et nisi sit magni repudiandae
              provident, assumenda tempore maiores nesciunt perferendis neque
              aut incidunt eum rerum modi itaque, asperiores porro corrupti
              enim.
            </Typography>
          </div>
        </Stack>
      </Box>
    </Box>
  )
}

export default Content
