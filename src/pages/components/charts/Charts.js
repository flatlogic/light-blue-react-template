import React from 'react';

import {
  Row, Col
} from 'reactstrap';

import Widget from '../../../components/Widget';
import ApexChart from 'react-apexcharts';

import s from './Charts.module.scss';
import {chartData, liveChart, liveChartInterval} from './mock';
import Sparklines from '../../../components/Sparklines';

import ReactEchartsCore from 'echarts-for-react/lib/core';
 
import echarts from 'echarts/lib/echarts';

import 'echarts/lib/chart/line';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/themeRiver';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'
import exporting from 'highcharts/modules/exporting';
import exportData from 'highcharts/modules/export-data';

exporting(Highcharts);
exportData(Highcharts);


class Charts extends React.Component {

  state = {
    cd: chartData,
    ld: liveChart,
    initEchartsOptions: {
      renderer: 'canvas'
    },
    sparklineData: {
      series: [{data: [1,7,3,5,7,8]}],
      options1: {
        colors: ['#ffc247'],
        plotOptions: {
          bar: {
            columnWidth: '50%'
          }
        }
      },
      options2: {
        colors: ['#ffc0d9'],
        plotOptions: {
          bar: {
            columnWidth: '50%'
          }
        }
      }
    }
  }

  componentWillUnmount() {
    clearInterval(liveChartInterval);
  }

  render() {
    const { cd, ld, initEchartsOptions, sparklineData } = this.state
    return (
      <div className={s.root}>
        <h1 className="page-title">Visual - <span className="fw-semi-bold">Charts</span></h1>
        <div>
          <Row>
            <Col lg={7} xs={12}>
              <Widget
                title={<h5>Apex <span className='fw-semi-bold'>Column Chart</span></h5>}
                close collapse
              >
                <ApexChart 
                  className="sparkline-chart" 
                  height={350} 
                  series={cd.apex.column.series}
                  options={cd.apex.column.options}
                  type={"bar"}
                />
              </Widget>
            </Col>
            <Col lg={5} xs={12}>
              <Widget
                title={<h5>Echarts <span className='fw-semi-bold'>Line Chart</span></h5>}
                close collapse
              >
                <ReactEchartsCore
                  echarts={echarts}
                  option={cd.echarts.line}
                  opts={initEchartsOptions}
                  style={{height: "365px"}}
                />
              </Widget>
            </Col>
            <Col lg={5} xs={12}>
              <Widget
                title={<h5>Highcharts <span className='fw-semi-bold'>Line Chart</span></h5>}
                close collapse
              >
                <HighchartsReact options={cd.highcharts.mixed}/>
                <h5 className="mt">Interactive <span className="fw-semi-bold">Sparklines</span></h5>
                <Row className="mt">
                  <Col md={6} xs={12}>
                    <div className="stats-row">
                      <div className="stat-item">
                        <p className="value5 fw-thin">34 567</p>
                        <h6 className="name text-muted m0 fs-mini">Overall Values</h6>
                      </div>
                      <div className="stat-item stat-item-mini-chart">
                        <Sparklines 
                          options={sparklineData.options2}
                          width={80}
                          height={25}
                          data={sparklineData.series}
                        />
                      </div>
                    </div>
                  </Col>
                  <Col md={6} xs={12}>
                    <div className="stats-row">
                      <div className="stat-item">
                        <p className="value5 fw-thin">34 567</p>
                        <h6 className="name text-muted m0 fs-mini">Overall Values</h6>
                      </div>
                      <div className="stat-item stat-item-mini-chart">
                        <Sparklines 
                          options={sparklineData.options1}
                          width={80}
                          height={25}
                          data={sparklineData.series}
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
              </Widget>
            </Col>
            <Col lg={7} xs={12}>
              <Row>
                <Col lg={6} xs={12}>
                  <Widget
                    title={<h5>Apex <span className="fw-semi-bold">Monochrome Pie</span></h5>}
                    close collapse
                  >
                    <ApexChart 
                      className="sparkline-chart"
                      type={"pie"} 
                      height={200} 
                      series={cd.apex.pie.series}
                      options={cd.apex.pie.options}
                    />
                  </Widget>
                </Col>
                <Col lg={6} xs={12}>
                  <Widget
                    title={<h5>Chart <span className="fw-semi-bold">Donut Chart</span></h5>}
                    close collapse
                  >
                    <ReactEchartsCore
                      echarts={echarts}
                      option={cd.echarts.donut}
                      opts={initEchartsOptions}
                      style={{height: "170px"}}
                    />
                  </Widget>
                </Col>
                <Col lg={12} xs={12}>
                  <Widget
                    title={<h5>Highcharts <span className="fw-semi-bold">Live Chart</span></h5>}
                    close collapse
                  >
                    <HighchartsReact options={ld} />
                  </Widget>
                </Col>
              </Row>
            </Col>
            <Col lg={12} xs={12}>
              <Widget
                title={<h5>Echarts <span className="fw-semi-bold">River Chart</span></h5>}
                close collapse
              >
                <ReactEchartsCore
                  echarts={echarts}
                  option={cd.echarts.river}
                  opts={initEchartsOptions}
                  style={{height: "350px"}}
                />
              </Widget>
            </Col>
          </Row>
        </div>
      </div>
    );
  }

}

export default Charts;
