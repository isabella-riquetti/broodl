import React from 'react'
import Button from './Button'

export default function Hero() {
  return (
    <div className='py-4 md:py-10 flex flex-col gap-4 sm:gap-8'>
      <h1 className='font-fugaz text-5xl sm:text-6xl md:text-7xl text-center'><span className='textGradient'>Broodl</span> helps you track you <span className='textGradient'>daily</span> mood!</h1>
      <p className='text-lg sm:text-xl md:text-2xl max-w-[80%] text-center mx-auto'>Create your mood record and see how you fell <span className='font-semibold'>every day of every year.</span></p>
      <div className='grid grid-cols-2 gap-4 w-fit mx-auto'>
        <Button text="Sing Up" />
        <Button text="Login" dark />
      </div>
    </div>
  )
}
