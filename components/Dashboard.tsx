'use client'
import classNames from 'classnames';
import React, { useEffect, useState } from 'react'
import Calendar from './Calendar';
import { useAuth } from '@/context/AuthContext';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import Loading from './Loading';
import Login from './Login';

export default function Dashboard() {
  const now = new Date();
  const { currentUser, userDataObj, setUserDataObj, loading, } = useAuth();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>({});

  function countValues() {
    let total_number_of_days = 0
    let sum_moods = 0
    for (const year in data) {
      for (const month in data[year]) {
        for (const day in data[year][month]) {
          const days_mood = data[year][month][day]
          total_number_of_days++
          sum_moods += days_mood
        }
      }
    }
    return { num_days: total_number_of_days, average_mood: sum_moods / total_number_of_days }
  }

  async function handleSetMood(mood: number) {
    const day = now.getDate()
    const month = now.getMonth()
    const year = now.getFullYear()

    if (!currentUser) return

    const newData = { ...userDataObj }
    if (!newData?.[year]) {
      newData[year] = {}
    }
    if (!newData?.[year]?.[month]) {
      newData[year][month] = {}
    }

    newData[year][month][day] = mood
    setData(newData)
    setUserDataObj(newData)

    const docRef = doc(db, 'users', currentUser.uid)
    await setDoc(docRef, {
      [year]: {
        [month]: {
          [day]: mood
        }
      }
    }, { merge: true });
  }

  const statuses = {
    ...countValues(),
    time_remaining: `${23 - now.getHours()}H ${60 - now.getMinutes()}M`,
  }

  const moods = {
    '&*@#$': '😭',
    'Sad': '😢',
    'Existing': '😐',
    'Good': '🙂',
    'Elated': '😍',
  };

  useEffect(() => {
    if (!currentUser || !userDataObj) return;

    setData(userDataObj);
  }, [currentUser, userDataObj]);

  if (loading) {
    return <Loading />
  }

  if (!currentUser) {
    return <Login />
  }

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
        {Object.entries(moods).map(([key, mood], moodIndex) => {
          return (
            <button onClick={() => {
              const currentMoodValue = moodIndex + 1
              handleSetMood(currentMoodValue)
            }} className={'p-4 px-5 rounded-2xl purpleShadow duration-200 bg-indigo-50 hover:bg-indigo-100 text-center flex flex-col items-center gap-2 flex-1 '} key={moodIndex}>
              <p className='text-4xl sm:text-5xl md:text-6xl'>{mood}</p>
              <p className="text-indigo-500 text-xs sm:text-sm md:text-base font-fugaz">{key}</p>
            </button>)
        })}
      </div>
      <Calendar data={data} />
    </div>
  )
}
