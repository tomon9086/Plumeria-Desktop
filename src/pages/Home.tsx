import icon from '@/../assets/icon.svg'
import '@/App.global.css'

const Home = () => {
  return (
    <div>
      <div className='Hello'>
        <img alt='icon' src={icon} width='200px' />
      </div>
      <h1>electron-react-boilerplate</h1>
      <div className='Hello'>
        <a
          href='https://electron-react-boilerplate.js.org/'
          rel='noreferrer'
          target='_blank'
        >
          <button type='button'>
            <span aria-label='books' role='img'>
              📚
            </span>
            Read our docs
          </button>
        </a>
        <a
          href='https://github.com/sponsors/electron-react-boilerplate'
          rel='noreferrer'
          target='_blank'
        >
          <button type='button'>
            <span aria-label='books' role='img'>
              🙏
            </span>
            Donate
          </button>
        </a>
      </div>
    </div>
  )
}

export default Home
