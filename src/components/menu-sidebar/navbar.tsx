"use client"

import Image from 'next/image'
import React from 'react'
import Button from '../login/button'

export default function Navbar() {
  return (
    <div className='hidden w-full lg:w-10/12 py-5 md:flex lg:flex-row justify-between px-5'>
        <Image src={`/prodominicanaFull.svg`} alt='logo' width={'1920'} height={'1080'} className=' w-64  '/> 
        <Button />
    </div>
  )
}
