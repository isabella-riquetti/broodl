/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useState } from 'react'
import Button from './Button';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-toastify';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegister, setIsRegister] = useState(false)
  const [authenticating, setAuthenticating] = useState(false)

  const { signup, login } = useAuth()

  async function handleSubmit() {
    if (email && !emailRegex.test(email)) {
      toast.error('Please enter a valid email address')
      return
    }

    if (!password || password.length < 6) {
      toast.error('Password must be at least 6 characters long')
      return
    }

    setAuthenticating(true)
    try {
      if (isRegister) {
        await signup(email, password)
      } else {
        await login(email, password);
      }
    } catch (err: any) {
      console.log(err.message);
      toast.error("Unexpected error", err.message);
    } finally {
      setAuthenticating(false)
    }
  }

  return (
    <div className='flex flex-col flex-1 justify-center items-center gap-4'>
      <h3 className="font-fugaz text-4xl sm:text-5xl md:text-6xl ">{isRegister ? 'Register' : 'Log In'}</h3>
      <p>You&#39;re one step away!</p>
      <input value={email} type="email" onChange={(e) => {
        setEmail(e.target.value)
      }} className='w-full max-w-[400px] mx-auto px-3 duration-200 hover:border-orange-600 focus:border-orange-600 py-2 sm:py-3 border border-solid border-orange-400 rounded-full outline-none' placeholder='Email' />
      <input value={password} onChange={(e) => {
        setPassword(e.target.value)
      }} className='w-full max-w-[400px] mx-auto px-3 duration-200 hover:border-orange-600 focus:border-orange-600 py-2 sm:py-3 border border-solid border-orange-400 rounded-full outline-none' placeholder='Password' type='password' />
      <div className='max-w-[400px] w-full mx-auto'>
        <Button clickHandler={handleSubmit} text={authenticating ? 'Submitting' : "Submit"} full />
      </div>
      <p className='text-center'>{isRegister ? 'Already have an account? ' : 'Don\'t have an account? '}<button onClick={() => setIsRegister(!isRegister)} className='text-orange-600'>{isRegister ? 'Sign in' : 'Sign up'}</button></p>
    </div>
  )
}