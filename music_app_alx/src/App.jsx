import './App.css'
import Button from './components/button'
import CustomInput from './components/custominput'
import Musiccardsmall from './components/musiccardsmall'
import AuthPage from './routes/authpage'
import Search from './routes/search'
import NavigationSidebarSection from './components/sidenav'
import Library from './routes/library'


function App() {

  return (
    <div className='w-full h-screen bg-[#121717] flex'>
      {/* <AuthPage /> */}
      {/* <Musiccardsmall /> */}

      <NavigationSidebarSection/>

      {/* <Search /> */}

      <Library />

    </div>
  )
}

export default App
