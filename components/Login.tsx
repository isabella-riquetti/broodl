import React from 'react'
import Button from './Button'

export default function Login() {
  return (
    <div className="flex flex-col flex-1 justify-center items-center gap-4">
      <h3 className='font-fugaz text-4xl-gradual'>Log In / Register</h3>
      <p>{"You're one step away!"}</p>
      <input className='w-full max-w-96 mx-auto px-4 py-2 sm:py-3 border border-solid border-indigo-400 rounded-full outline-none duration-200 hover:border-indigo-600' placeholder='Email' type="email" />
      <input className='w-full max-w-96 mx-auto px-4 py-2 sm:py-3 border border-solid border-indigo-400 rounded-full outline-none duration-200 hover:border-indigo-600' placeholder='Password' type="password" />
      <div className='w-full max-w-96 mx-auto'>
        <Button text="Submit" full />
      </div>
      <p className='text-center'>{"Don't have an account?"} <span className='text-indigo-500 cursor-pointer hover:underline'>Sign Up</span></p>
    </div>
  )
}
