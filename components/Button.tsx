import React from 'react'
import cn from 'classnames';

export default function Button({
  text,
  dark = false,
  full = false,
  clickHandler,
}: {
  text: string,
    dark ?: boolean,
    full ?: boolean,
    clickHandler: () => void | Promise<void>
}) {
  return (
    <button
      onClick={clickHandler}
      className={cn("border-2 border-solid rounded-full overflow-hidden border-indigo-600 duration-200 hover:opacity-70", {
        "text-white bg-indigo-600": dark,
        "text-indigo-600": !dark,
        "grid place-items-center w-full": full
      })}>
      <p className='font-fugaz px-6 sm:px-10 whitespace-nowrap py-2 sm:py-3'>{text}</p>
    </button>
  )
}
