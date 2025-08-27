import './App.css'
import Button from './components/button'
import CustomInput from './components/custominput'
import Musiccardsmall from './components/musiccardsmall'
import AuthPage from './routes/authpage'
import Search from './routes/search'

function App() {

  return (
    <div className='w-full h-screen bg-[#121717]'>
      {/* <AuthPage /> */}
      {/* <Musiccardsmall /> */}
      
      <Search />
    </div>
  )
}

export default App
