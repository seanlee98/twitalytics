import React, { Component, Fragment } from "react";
import "../../node_modules/react-vis/dist/style.css";
import {
  XYPlot,
  LineSeries,
  VerticalBarSeries,
  VerticalGridLines,
  HorizontalGridLines,
  XAxis,
  YAxis,
  Crosshair
} from "react-vis";

class DataView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commonComments: []
    };
  }

  formatLineDataPoints(data) {
    const dataPoints = data;
    console.log("this is the length of datapoints: ", dataPoints.length);
    let dataArray = [];
    dataPoints.map((dataPoint, index) => {
      if (dataPoint.average_value !== 0) {
        dataArray.push({
          x: index,
          y: dataPoint.average_value
        });
      }
    });

    return dataArray;
  }

  formatBarDataPoints(data) {}

  render() {
    const { dataFilter, data } = this.props;
    const { commonComments } = this.state;

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
              <XAxis title="Period of Time (Last Seven Days)" />
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
              <Crosshair
                values={commonComments}
                className="comments-container"
              />
            </XYPlot>
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
