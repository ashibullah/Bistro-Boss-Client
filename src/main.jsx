import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from './Routes/Routes.jsx'
import { RouterProvider } from 'react-router-dom'
import AuthProvider from './Provider/AuthProvider.jsx'
import { Toaster } from 'react-hot-toast'
import OrderRequestProvider from './Provider/OrderRequestProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <OrderRequestProvider>
        <RouterProvider router={router} />
        <Toaster position="top-center" reverseOrder={false} />
      </OrderRequestProvider>
    </AuthProvider>
  </StrictMode>,
)
