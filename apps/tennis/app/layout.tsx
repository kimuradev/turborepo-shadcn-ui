import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import type { Viewport } from 'next'
 
import { Toaster } from '@/components/ui/toaster'
import Header from '@/components/header'
import Navbar from '@/components/navbar'

import { AuthProvider } from './context/auth-context'
import { AppProvider } from './context/app-context'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  themeColor: '#FF6633',
}

export const metadata: Metadata = {
  title: 'AB Tênis',
  description: 'Torneio de tênis Associação Brasil',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <AppProvider>
            <AuthProvider>
              <Header />
              <main className="flex-1 p-6 flex gap-6 ">
                <Navbar />
                <div className="flex flex-col flex-1 md:border md:rounded md:border-orange-100 gap-4 p-0 sm:p-2 md:p-10 overflow-auto">
                  {children}
                </div>
              </main>
              <Toaster />
            </AuthProvider>
          </AppProvider>
        </div>
      </body>
    </html>
  )
}
