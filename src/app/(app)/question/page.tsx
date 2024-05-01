"use client"
import { QuestionDialog } from '@/components/question/dialog'
import Sketch from '@/components/sketch'
import React, { useState } from 'react'

export default function page() {
const [open, setOpen] = useState(false)


    const handleOpen = () => {
        setOpen(!open)
    }

    const buttons = [{
    name: 'Agregar Preguntas',
    onClick: handleOpen
    }]

  return (
    <>
    <Sketch title='Preguntas' subtitle='RRHH' buttons={buttons} handleFilterOpen={() => {}} >
        hola
    </Sketch>
    {open && <QuestionDialog open={open} handler={handleOpen} update={() => {}} />}
    </>
  )
}
