import React, { Component } from 'react'
import DayNames from './DayNames'
import uuid from 'uuid/v4'
import Week from './Week'
import moment from 'moment/moment'
import s from './Calendar.module.scss'


class Calendar extends Component {

    state = {
      selectedMonth: moment(),
      selectedDay: moment().startOf("day"),
      selectedMonthEvents: [
        {
          title: "The flower bed",
          info: "Contents here",
          itemStyle: "#1870dc",
          date: moment(`${moment().year()}-${moment().month()+1}-02`, "YYYY-MM-DD"),
        },
        {
          title: "Stop world water pollution",
          info: "Have a kick off meeting with .inc company",
          itemStyle: "#f0b518",
          date: moment(`${moment().year()}-${moment().month()+1}-05`, "YYYY-MM-DD"),
        },
        {
          title: "Light Blue Template 1.0.0 release",
          info: "Some contents here",
          itemStyle: "#2d8515",
          date: moment(`${moment().year()}-${moment().month()+1}-18`, "YYYY-MM-DD"),
        },
        {
          title: "A link",
          info: "",
          itemStyle: "#f45722",
          link: "http://www.flatlogic.com",
          date: moment(`${moment().year()}-${moment().month()+1}-29`, "YYYY-MM-DD"),
        },
      ],
      showEvents: false
    };

  previous = () => {
    this.setState({
      selectedMonth: this.state.selectedMonth.subtract(1, "month")
    });
  }

  next = () =>  {
    this.setState({
      selectedMonth: this.state.selectedMonth.add(1, "month")
    });
  }
  
  renderMonthLabel = () =>  {
    return (
      <span className={`${s.calendarItemContainer} ${s.monthLabel}`}>
        {this.state.selectedMonth.format("MMMM YYYY")}
      </span>
    );
  }



  
  renderWeeks = () =>  {
    const currentMonthView = this.state.selectedMonth;
    const currentSelectedDay = this.state.selectedDay;

    let weeks = [];
    let done = false;
    let previousCurrentNextView = currentMonthView
      .clone()
      .startOf("month")
      .subtract(1, "d")
      .day("Sunday");
    let count = 0;
    let monthIndex = previousCurrentNextView.month();

    while (!done) {
      weeks.push(
        <Week
          key={uuid()}
          selectedMonthEvents={this.state.selectedMonthEvents}
          previousCurrentNextView={previousCurrentNextView.clone()}
          currentMonthView={currentMonthView}
          selected={currentSelectedDay}
        />
      );
      previousCurrentNextView.add(1, "w");
      done = count++ > 2 && monthIndex !== previousCurrentNextView.month();
      monthIndex = previousCurrentNextView.month();
    }
    return weeks;
  }


  render() {

      return (
        <div className={`${s.calendarRectangle}`}>
        <div>
        <section className={`${s.mainCalendar}`}>
          <header className={`${s.calendarHeader}`}>
            <div className={`${s.calendarRow} ${s.titleHeader}`}>
              <i
                className={`${s.calendarItemContainer} ${s.arrow} la la-arrow-left`}
                onClick={this.previous}
              />
              <div className={`${s.calendarItemContainer} ${s.headerText}`}>
              
              {this.renderMonthLabel()}
              </div>
              <i 
                className={`${s.calendarItemContainer} ${s.arrow} la la-arrow-right`} 
                onClick={this.next} 
              />
            </div>
            <DayNames />
          </header>
          <div className={`${s.daysContainer}`}>
            {this.renderWeeks()}
          </div>
        </section>
        </div>
        </div>
      );
    }
}

export default Calendar;
