"use client"
import Navbar from '@/components/menu-sidebar/navbar'
import Sidebar from '@/components/menu-sidebar/sidebar'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

const queryClient = new QueryClient()

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
        <div className='flex flex-col items-center w-full bg-white divide-y-2'>
        <Navbar />
        <div className='flex flex-row w-full lg:w-10/12 divide-x-2'><Sidebar />{children}</div>
        </div>
        
        </QueryClientProvider>
  )
}
