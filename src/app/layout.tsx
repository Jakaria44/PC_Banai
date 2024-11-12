import RootLayout from '@/components/layout/RootLayout'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'BuildMaster Pro',
  description: 'Your Professional PC Building Assistant',
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  )
}