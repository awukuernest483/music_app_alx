import { Menu } from 'lucide-react'
import { useState } from 'react'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'

// Components
import { Sidenav } from './components/sidenav'

// Pages/Routes
import AuthPage from './routes/authpage'
import Library from './routes/library'
import Search from './routes/search'
import Settings from './routes/settings'

function App() {
  const [isSidenavOpen, setIsSidenavOpen] = useState(false)

  const toggleSidenav = () => {
    setIsSidenavOpen(!isSidenavOpen)
  }

  const closeSidenav = () => {
    setIsSidenavOpen(false)
  }

  return (
    <Router>
      <div className='w-full h-screen bg-[#121717] flex relative'>
        {/* Mobile Menu Button */}
        <button
          onClick={toggleSidenav}
          className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-[#1C2426] hover:bg-[#2a3437] transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6 text-white" />
        </button>

        {/* Mobile Overlay */}
        {isSidenavOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={closeSidenav}
          />
        )}

        {/* Sidenav */}
        <div className={`
          fixed lg:static inset-y-0 left-0 z-50
          transform ${isSidenavOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 transition-transform duration-300 ease-in-out
          w-64 lg:w-auto
        `}>
          <Sidenav onClose={closeSidenav} />
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          <div className="pt-16 lg:pt-0 h-full">
            <Routes>
              <Route path="/" element={<Navigate to="/search" replace />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/search" element={<Search />} />
              <Route path="/library" element={<Library />} />
              <Route path="/settings" element={<Settings />} />
              {/* Catch all route - redirect to search */}
              <Route path="*" element={<Navigate to="/search" replace />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App