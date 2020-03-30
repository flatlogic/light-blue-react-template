import React, { Component } from 'react'
import s from './Calendar.module.scss'

class DayNames extends Component {
  render() {
    return (
      <div className={`${s.calendarRow} ${s.daysHeader}`}>
        <span className={`${s.calendarItemContainer} ${s.dayName}`}>S</span>
        <span className={`${s.calendarItemContainer} ${s.dayName}`}>M</span>
        <span className={`${s.calendarItemContainer} ${s.dayName}`}>T</span>
        <span className={`${s.calendarItemContainer} ${s.dayName}`}>W</span>
        <span className={`${s.calendarItemContainer} ${s.dayName}`}>T</span>
        <span className={`${s.calendarItemContainer} ${s.dayName}`}>F</span>
        <span className={`${s.calendarItemContainer} ${s.dayName}`}>S</span>
      </div>
    );
  }
}

export default DayNames;