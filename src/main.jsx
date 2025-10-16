import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import router from './router/router.jsx'
import Footer from './components/Footer.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='bg-oneconvert-gradient'>
      <RouterProvider router={router}/>
      <Footer />
    </div>
  </StrictMode>,
)
