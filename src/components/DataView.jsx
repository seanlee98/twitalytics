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

  formatLineDataPoints(data) {
    const dataPoints = data;
    console.log("this is the length of datapoints: ", dataPoints.length);
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

  formatBarDataPoints(data) {}

  render() {
    const { dataFilter, data } = this.props;
    const { commonComments, topDataPoint, bottomDataPoint } = this.state;

    const dataPoints = this.formatLineDataPoints(data);
    console.log("Datapoints: ", dataPoints);

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
              <XAxis title="Number of Intervals" />
              <YAxis title="Average Sentiment Score" />
              <LineSeries
                onNearestX={(datapoint, index) => {
                  // does something on mouseover
                  // you can access the value of the event
                  console.log("data: ", data);
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
            <XYPlot height={600} width={600} xDomain={[0, 9]}>
              <VerticalGridLines />
              <HorizontalGridLines />
              <XAxis />
              <YAxis />
              <VerticalBarSeries data={this.props.data} />
            </XYPlot>
          </div>
        )}
      </Fragment>
    );
  }
}

export default DataView;
