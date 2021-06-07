import { Box, Button } from '@material-ui/core'
import icon from '@/../assets/icon.svg'
import '@/App.global.css'

const Home = () => {
  return (
    <Box
      alignItems='center'
      display='flex'
      flexDirection='column'
      height='100%'
      justifyContent='center'
    >
      <div className='Hello'>
        <img alt='icon' src={icon} width='200px' />
      </div>
      <h1>electron-react-boilerplate</h1>
      <Box m={1}>
        <a
          href='https://electron-react-boilerplate.js.org/'
          rel='noreferrer'
          target='_blank'
        >
          <Button variant='contained'>
            <span aria-label='books' role='img'>
              📚
            </span>
            Read our docs
          </Button>
        </a>
        <a
          href='https://github.com/sponsors/electron-react-boilerplate'
          rel='noreferrer'
          target='_blank'
        >
          <Button variant='contained'>
            <span aria-label='books' role='img'>
              🙏
            </span>
            Donate
          </Button>
        </a>
      </Box>
    </Box>
  )
}

export default Home
