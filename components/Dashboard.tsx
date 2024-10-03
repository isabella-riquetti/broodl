import classNames from 'classnames';
import React from 'react'
import Calendar from './Calendar';

export default function Dashboard() {
  const statuses = {
    date: new Date().toDateString(),
    num_days: 14,
    time_remaining: '13:14:26',
  };
  const moods = {
    '&*@#$': '😭',
    'Sad': '😢',
    'Existing': '😐',
    'Good': '🙂',
    'Elated': '😍',
  };

  return (
    <div className='flex flex-col flex-1 gap-8 sm:gap-12 md:gap-16'>
      <div className='grid grid-cols-2 sm:grid-cols-3 bg-indigo-50 text-indigo-500 rounded-lg gap-4 p-4 text-center'>
        {Object.entries(statuses).map(([key, value], index) => {
          return (
            <div key={key} className={classNames('flex flex-col gap-1 sm:gap-2', {
              'col-span-2 sm:col-span-1': index === 0
            })}>
              <p className='font-medium uppercase text-xs sm:text-sm truncate'>{key.replace(/_/g, ' ')}</p>
              <p className='font-fugaz text-base sm:text-lg truncate'>{value}</p>
            </div>
          )
        })}
      </div>
      <h4 className='font-fugaz text-5xl-gradual text-center'>
        How do you <span className='textGradient'>feel</span> today?
      </h4>
      <div className="flex flex-wrap gap-4 text-center">
        {Object.entries(moods).map(([key, mood]) => {
          return (
            <div key={key} className='flex-1'>
              <button className='flex flex-col gap-2 items-center py-4 px-8 rounded-2xl purpleShadow duration-200 bg-indigo-50 hover:text-indigo-100 w-full'>
                <p className='text-4xl-gradual'>{mood}</p>
                <p className='text-indigo-500 font-bold text-xm sm:text-sm'>{key}</p>
              </button>
            </div>)
        })}
      </div>
      <Calendar />
    </div>
  )
}
