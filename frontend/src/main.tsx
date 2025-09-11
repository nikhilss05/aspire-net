import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom'
import { AuthLayout } from './routes/AuthLayout'
import { LoginPage } from './routes/LoginPage'
import { RegisterPage } from './routes/RegisterPage'
import { DashboardLayout } from './routes/DashboardLayout'
import { RideBooking } from './routes/RideBooking'
import { HotelFinder } from './routes/HotelFinder'
import { BookingHistory } from './routes/BookingHistory'
import { NavigationDemo } from './routes/NavigationDemo'
import { AdminPage } from './routes/AdminPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { index: true, loader: () => redirect('/login') },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
    ],
  },
  {
    path: '/app',
    element: <DashboardLayout />,
    children: [
      { index: true, loader: () => redirect('/app/ride') },
      { path: 'ride', element: <RideBooking /> },
      { path: 'hotels', element: <HotelFinder /> },
      { path: 'history', element: <BookingHistory /> },
      { path: 'navigation', element: <NavigationDemo /> },
      { path: 'admin', element: <AdminPage /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
