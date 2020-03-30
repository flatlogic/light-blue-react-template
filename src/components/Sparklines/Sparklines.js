import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chart from 'react-apexcharts';
import './Sparklines.scss';

class Sparklines extends Component {

  static propTypes = {
    type: PropTypes.string,
    data: PropTypes.array,
    height: PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
    width: PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
    options: PropTypes.object
  };

  static defaultProps = {
    type: "bar",
    height: 20,
    width: 50
  };

  state = {
    sparkOptions: {
      chart: {
        height: this.props.height,
        width: this.props.width,
        sparkline: {
          enabled: true
        }
      },
      plotOptions: {
        bar: {
          columnWidth: '20%'
        }
      },
      xaxis: {
        crosshairs: {
          width: 1
        },
      },
      tooltip: {
        fixed: {
          enabled: false
        },
        x: {
          show: false
        },
        y: {
          title: {
            formatter: function () {
              return ''
            }
          }
        },
        marker: {
          show: false
        }
      }, ...this.props.options
    }
  }

  render() {
    const { type, height, width, data } = this.props;
    return (
      <Chart 
        className="sparkline-chart" 
        style={{display: "inline-block"}} 
        type={type}
        height={height}
        width={width}
        options={this.state.sparkOptions} 
        series={data}
      />
    )
  }

}

export default Sparklines;
