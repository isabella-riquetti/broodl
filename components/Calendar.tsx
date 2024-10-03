import { baseRating, gradients } from '@/app/utils/constants';
import classNames from 'classnames';
import React from 'react'

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
const now = new Date();

export default function Calendar({ demo }: { demo?: boolean }) {
  const data = baseRating;
  const year = 2024;
  const month = 'October';
  const currentMonthIndex = Object.keys(months).indexOf(month);
  const monthNow = new Date(year, currentMonthIndex, 1);
  const firstDayOfMonth = monthNow.getDay();
  const daysInMonth = new Date(year, currentMonthIndex + 1, 0).getDate();

  const daysToDisplay = firstDayOfMonth + daysInMonth;
  const numRows = Math.floor(daysToDisplay / 7) + (daysToDisplay & 7 ? 1 : 0);

  return (
    <div className={classNames('flex flex-col overflow-hidden gap-1', {

    })}>
      {month}
      <div className='grid grid-cols-7 gap-1 items-center text-center'>
        {daysOfTheWeek.map(d => (<div key={d}>{d}</div>))}
      </div>
      {Array.from({ length: numRows }).map((_, rowIndex) => (
        <div key={rowIndex} className='grid grid-cols-7 gap-2 items-center text-center'>
          {daysOfTheWeek.map((dayOfWeek, dayOfWeekIndex) => {
            const dayIndex = (rowIndex * 7) + dayOfWeekIndex - (firstDayOfMonth - 1);
            const isEmptyDaySquare = dayIndex > daysInMonth || (rowIndex === 0 && dayOfWeekIndex < firstDayOfMonth);
            const isToday = dayIndex === now.getDate();

            const color = demo
              ? gradients.indigo[baseRating[dayIndex]!]
              : dayIndex in data
                ? gradients.indigo[data[dayIndex]!]
                : 'white';
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
