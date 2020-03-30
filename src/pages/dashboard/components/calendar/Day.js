import React, { Component } from 'react'
import { Popover, PopoverHeader, PopoverBody, Tooltip,} from 'reactstrap';
import s from './Calendar.module.scss'

class Day extends Component {
  state = {
    popoverShow: false,
    tooltipShow: false
  }

  togglePopover = () => {
    this.setState({ popoverShow: !this.state.popoverShow })
  }

  toggleTooltip = () => {
    this.setState({ tooltipShow: !this.state.tooltipShow })
  }

  render() {
    const { day, selected } = this.props;
    return (
      <div className={
          `${s.day}` +
          (day.isToday ? ` ${s.today}` : "") +
          (day.isCurrentMonth ? "" : ` ${s.differentMonth}`) +
          (day.date.isSame(selected) ? ` ${s.selected}` : "") +
          (day.hasEvents ? ` ${s.hasEvents}` : "") } > 

        {!day.hasEvents ? 
        <div className={s.dayNumber}>{day.number}</div> 
        : (day.hasEvents && day.link) 
        ? 
        <React.Fragment>
          <a
            rel="noopener noreferrer"
            target="_blank"
            onMouseEnter={this.toggleTooltip}
            onMouseOut={this.toggleTooltip}
            id={`Tooltip${day.number}`}
            href={day.link ? day.link : "#"} 
            className={s.dayNumber}> {day.number}
            {day.itemStyle ? 
              <span 
                style={{backgroundColor: `${day.itemStyle}`}} 
                className={s.calendarDot}>
              </span> : "" }
          </a>
          <Tooltip 
            placement="top" 
            isOpen={this.state.tooltipShow} 
            toggle={this.toggleTooltip} 
            target={`Tooltip${day.number}`}>
            {day.title}
          </Tooltip>
        </React.Fragment> 
        : (day.hasEvents && !day.link)
        ? 
          <React.Fragment>
            <div
              onClick={this.togglePopover}
              id={`Popover${day.number}`}
              className={s.dayNumber}> {day.number}
                {day.itemStyle ? 
                  <span 
                    style={{backgroundColor: `${day.itemStyle}`}} 
                    className={s.calendarDot}>
                  </span> : "" }
            </div>
            <Popover 
              placement="top" 
              isOpen={this.state.popoverShow} 
              target={`Popover${day.number}`} 
              toggle={this.togglePopover}>
              <PopoverHeader>{day.title}</PopoverHeader>
              <PopoverBody>{day.info}</PopoverBody>
            </Popover> 
          </React.Fragment> 
        : "" }
      
      </div>
    );
  }
}
export default Day;