import '../styles/globals.css'
import { NextUIProvider } from '@nextui-org/react'
import { AuthProvider } from '../context/AuthContext'
import { CartProvider } from '../context/CartContext'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import DashboardLayout from '../components/DashboardLayout'

export default function App({ Component, pageProps }) {
  const isDashboardPage = Component.displayName?.includes('Dashboard');

  return (
    <NextUIProvider>
      <AuthProvider>
        <CartProvider>
        <div className="min-h-screen flex flex-col">
          {isDashboardPage ? (
            <DashboardLayout>
              <Component {...pageProps} />
            </DashboardLayout>
          ) : (
            <>
              <Navbar />
              <main className="flex-1 container mx-auto p-4">
                <Component {...pageProps} />
              </main>
            </>
          )}
        </div>
        </CartProvider>
      </AuthProvider>
    </NextUIProvider>
  )
}