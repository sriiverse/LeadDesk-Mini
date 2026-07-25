import { Outlet } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import CursorSpotlight from '../components/effects/CursorSpotlight'

export default function PublicLayout() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#03040a]">
      <CursorSpotlight />
      <Navbar />
      <main className="relative z-[2]">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
