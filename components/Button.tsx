import React from 'react'

export default function Button({
    text,
    dark = false
}: {
    text: string,
    dark?: boolean
}) {
  return (
    <button className={`border-2 border-solid rounded-full overflow-hiddenborder-indigo-600 duration-200 hover:opacity-70 ${dark ? "text-white bg-indigo-600" : "text-indigo-600"}`}>
        <p className='font-fugaz px-6 sm:px-10 whitespace-nowrap py-2 sm:py-3'>{text}</p>
    </button>
  )
}
