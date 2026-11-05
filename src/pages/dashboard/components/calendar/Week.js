import React, { Component } from 'react'
import Day from './Day'
import { v4 as uuid } from 'uuid'
import s from './Calendar.module.scss'

class Week extends Component {
  render() {
    let days = [];
    let date = this.props.previousCurrentNextView;

    const {
      selectedMonthEvents,
      selected,
      currentMonthView,
    } = this.props;

    for (var i = 0; i < 7; i++) {
      let dayHasEvents = false,
          title = '',
          info  = '',
          itemStyle = '',
          link  = '';

      for (var j = 0; j < selectedMonthEvents.length; j++) {
        if (selectedMonthEvents[j].date.isSame(date, "day")) {
          dayHasEvents = true;
          title = selectedMonthEvents[j].title ? selectedMonthEvents[j].title : '';
          info  = selectedMonthEvents[j].info ? selectedMonthEvents[j].info : '';
          itemStyle = selectedMonthEvents[j].itemStyle ? selectedMonthEvents[j].itemStyle : '';
          link  = selectedMonthEvents[j].link ? selectedMonthEvents[j].link : '';
        }
      }

      let day = {
        name: date.format("dd").substring(0, 1),
        number: date.date(),
        isCurrentMonth: date.month() === currentMonthView.month(),
        isToday: date.isSame(new Date(), "day"),
        date: date,
        hasEvents: dayHasEvents,
        title: title, 
        info: info,
        itemStyle: itemStyle,
        link: link
      };
      
      days.push(<Day 
        key={uuid()}
        day={day} 
        selected={selected} 
        />);
        date = date.clone();
        date.add(1, "d");
    }
    return (
      <div className={`${s.calendarRow} ${s.week}`}>
        {days}
      </div>
    );
  }
}

export default Week