/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { baseRating, gradients } from '@/app/utils/constants';
import classNames from 'classnames';
import React, { useState } from 'react'

const months = {
  January: "Jan",
  February: "Feb",
  March: "Mar",
  April: "Apr",
  May: "May",
  June: "Jun",
  July: "Jul",
  August: "Aug",
  September: "Sep",
  October: "Oct",
  November: "Nov",
  December: "Dec"
};
const daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function Calendar({ data }: { data?: any; handleSetMood?: (mood: number) => Promise<void>; }) {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const monthNow = new Date(selectedYear, selectedMonth, 1);
  const firstDayOfMonth = monthNow.getDay();
  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();

  const daysToDisplay = firstDayOfMonth + daysInMonth;
  const numRows = Math.floor(daysToDisplay / 7) + (daysToDisplay & 7 ? 1 : 0);

  function handleIncrementMonth(val: number) {
    if (selectedMonth === 11 && val > 0) {
      setSelectedYear(prev => ++prev);
      setSelectedMonth(0);
    } else if (selectedMonth === 0 && val < 0) {
      setSelectedYear(prev => --prev);
      setSelectedMonth(11);
    } else {
      setSelectedMonth(prev => prev + val);
    }
  }

  return (
    <div className={classNames('flex flex-col overflow-hidden gap-1', {

    })}>
      <div className='grid grid-cols-5 gap-4'>
        <button onClick={() => {
          handleIncrementMonth(-1)
        }} className='mr-auto text-indigo-400 text-lg sm:text-xl duration-200 hover:opacity-60'><i className="fa-solid fa-circle-chevron-left"></i></button>
        <p className="text-center col-span-3 capitalized whitespace-nowrap textGradient font-fugaz">{Object.keys(months)[selectedMonth]}, {selectedYear}</p>
        <button onClick={() => {
          handleIncrementMonth(+1)
        }} className='ml-auto text-indigo-400 text-lg sm:text-xl duration-200 hover:opacity-60'><i className="fa-solid fa-circle-chevron-right"></i></button>
      </div>
      <div className='grid grid-cols-7 gap-1 items-center text-center'>
        {daysOfTheWeek.map(d => (<div key={d}>{d}</div>))}
      </div>
      {Array.from({ length: numRows }).map((_, rowIndex) => (
        <div key={rowIndex} className='grid grid-cols-7 gap-2 items-center text-center'>
          {daysOfTheWeek.map((dayOfWeek, dayOfWeekIndex) => {
            const dayIndex = (rowIndex * 7) + dayOfWeekIndex - (firstDayOfMonth - 1);
            const isEmptyDaySquare = dayIndex > daysInMonth || (rowIndex === 0 && dayOfWeekIndex < firstDayOfMonth);
            const isToday = dayIndex === now.getDate();

            const selectedDate = new Date(selectedYear, selectedMonth, dayIndex);
            const previousDay = new Date(selectedYear, selectedMonth, dayIndex-1);
            const mockedData = selectedDate <= now
              ? gradients.indigo[baseRating[dayIndex]]
                : "white";

            const color = !data
              ? mockedData                
              : now > previousDay
                ? "white"
                : gradients.indigo[data?.[selectedYear]?.[selectedMonth]?.[dayIndex]] ?? "white";
            if (isEmptyDaySquare) return <div className='bg-white' key={dayOfWeek}></div>

            return (<div
              key={dayOfWeek}
              style={{ backgroundColor: color }}
              className={classNames('text-xm sm:text-sm border p-2 flex items-center gap-2 justify-between rounded-lg text-center', {
                'border-indigo-400': isToday,
                'border-indigo-100': !isToday,
                'text-indigo-400': color === "white",
                'text-white': color !== "white",
              })}>
              {dayIndex}
            </div>)
          })}
        </div>)
      )}
    </div>
  )
}
