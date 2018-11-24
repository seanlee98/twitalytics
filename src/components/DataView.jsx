import React, { Component, Fragment } from "react";
import "../../node_modules/react-vis/dist/style.css";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import {
  XYPlot,
  LineSeries,
  VerticalBarSeries,
  VerticalGridLines,
  HorizontalGridLines,
  XAxis,
  YAxis
} from "react-vis";

class DataView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topDataPoint: { x: 0, y: 0 },
      bottomDataPoint: { x: 0, y: 0 }
    };
  }

  formatBarDataPoints(data) {
    const dataPoints = data;
    let dataArray = []

    dataPoints.map((dataPoint, index) => {
      const sentiments = dataPoint.sentiments;
      for (var index in sentiments) {
        dataArray.push ({
          x: index,
          y: sentiments[index]
        });
      }
    });

    return dataArray;
  }

  formatLineDataPoints(data) {
    const dataPoints = data;
    let dataArray = [];
    dataPoints.map((dataPoint, index) => {
      if (dataPoint.average_value !== 0) {
        if (this.state.topDataPoint.y < dataPoint.average_value) {
          this.state.topDataPoint.x = index;
          this.state.topDataPoint.y = dataPoint.average_value;
        } else if (this.state.bottomDataPoint.y > dataPoint.average_value) {
          this.state.bottomDataPoint.x = index;
          this.state.bottomDataPoint.y = dataPoint.average_value;
        }
        dataArray.push({
          x: index,
          y: dataPoint.average_value
        });
      }
    });

    console.log("top data point: ", this.state.topDataPoint);
    console.log("bottom data point: ", this.state.bottomDataPoint);
    return dataArray;
  }

  render() {
    const { dataFilter, data } = this.props;

    const { commonComments, topDataPoint, bottomDataPoint } = this.state;

    let dataPoints = [];
    console.log("Datapoints: ", dataPoints);

    const chartWidth = 800;
    const chartHeight = 500;
    const chartDomain = [0, chartHeight];
    const interval = 0;
    /// Response Data
    // {
    //   interval: "2018-11-20T21:00:00",
    //   average_value: 17.8,
    //   common_comments: ["this sucks", "this rocks"],
    //   sentiments: {
    //     Very_Bad: 1,
    //     Bad: 9,
    //     Average: 3,
    //     Good: 23,
    //     Very_Good: 53
    //   }
    // }

    /// Need to convert to
    // [{x: 1, y: 10}, {x: 2, y: 7}, {x: 3, y: 15}]

    /// what I'm actually returning
    // [{x: 1}, {y: 10}, {x: 2}, {y: 7}, {x: 3}, {y: 15}]
    if (dataFilter.includes("Sentiment Analysis")) {
      dataPoints = this.formatLineDataPoints(data);
    }
    else {
      dataPoints = this.formatBarDataPoints(data);
    }


    return (
      <Fragment>
        {dataFilter.includes("Sentiment Analysis") ? (
          <div>
            <XYPlot
              height={600}
              width={600}
              xDomain={[0, dataPoints.length - 1]}
              yDomain={[-100, 100]}
              onMouseLeave={() => this.setState({ commonComments: [] })}
            >
              <VerticalGridLines />
              <HorizontalGridLines />
              <XAxis title="Period of Time (Last Seven Days)"/>
              <YAxis title="Average Sentiment Score"/>
              <LineSeries
                onNearestX={(datapoint, index) => {
                  // does something on mouseover
                  // you can access the value of the event
                  this.setState({ commonComments: data.map(d => d[index]) });
                }}
                data={dataPoints}
              />
            </XYPlot>
            <Card>
              <CardContent>
                <Typography component="p">
                  Highest Sentiment Score: {topDataPoint.y} at interval{" "}
                  {topDataPoint.x}
                  <br />
                  Lowest Sentiment Score: {bottomDataPoint.y} at interval{" "}
                  {bottomDataPoint.x}
                </Typography>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div>
            <XYPlot
               xType={"ordinal"}
               width={500}
               height={300}
               yDomain={[0, 300]}
            >
              <VerticalGridLines />
              <HorizontalGridLines />
              <XAxis title="Sentiment Category"/>
              <YAxis title="Number of Tweets"/>
              <VerticalBarSeries data={dataPoints} />
            </XYPlot>
          </div>
        )}
      </Fragment>
    );
  }
}

export default DataView;
