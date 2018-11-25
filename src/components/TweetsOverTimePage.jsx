import React, { Component, Fragment } from "react";
import {
  XYPlot,
  LineSeries,
  VerticalBarSeries,
  VerticalGridLines,
  HorizontalGridLines,
  XAxis,
  YAxis
} from "react-vis";
import "../../node_modules/react-vis/dist/style.css";

class TweetsOverTimePage extends Component {
  // Response data
  // "sentiments": [
  //     {
  //         "average_value": 8.186492340157754,
  //         "interval": "2018-11-17T22:00:00",
  //         "sentiments": {
  //             "Very Bad": 6,
  //             "Good": 48,
  //             "Average": 171,
  //             "Very Good": 24,
  //             "Bad": 17
  //         }
  //         "count": 266
  //     },
  // ],
  constructor(props) {
    super(props);
    this.state = {
      totalCountArray: [],
      veryBadCountArray: [],
      badCountArray: [],
      averageCountArray: [],
      goodCountArray: [],
      veryGoodCountArray: []
    };
  }

  formatLineDataPoints(data, dataType) {
    let dataArray = [];
    const dataPoints = data;
    dataPoints.map((dataPoint, index) => {
      if (dataPoint.average_value !== 0) {
        if (dataType.includes("totalCount")) {
          // handle totalCountArray
          dataArray.push({
            x: index,
            y: dataPoint.count
          });
        } else if (dataType.includes("veryBad")) {
          // handle veryBadCountArray
          dataArray.push({
            x: index,
            y: dataPoint.sentiments.Very_Bad
          });
        } else if (dataType.includes("bad")) {
          // handle badCountArray
          dataArray.push({
            x: index,
            y: dataPoint.sentiments.Bad
          });
        } else if (dataType.includes("average")) {
          // handle averageCountArray
          dataArray.push({
            x: index,
            y: dataPoint.sentiments.Average
          });
        } else if (dataType.includes("good")) {
          // handle goodCountArray
          dataArray.push({
            x: index,
            y: dataPoint.sentiments.Good
          });
        } else if (dataType.includes("veryGood")) {
          // handle veryGoodCountArray
          dataArray.push({
            x: index,
            y: dataPoint.sentiments.Very_Good
          });
        }
      }
    });

    return dataArray;
  }

  render() {
    const { data } = this.props;
    console.log("data being passed from DataPage: ", data);
    let {
      totalCountArray,
      veryBadCountArray,
      badCountArray,
      averageCountArray,
      goodCountArray,
      veryGoodCountArray
    } = this.state;

    totalCountArray = this.formatLineDataPoints(data.sentiment, "totalCount");
    veryBadCountArray = this.formatLineDataPoints(data.sentiment, "veryBad");
    badCountArray = this.formatLineDataPoints(data.sentiment, "bad");
    averageCountArray = this.formatLineDataPoints(
      data.sentiment,
      "averageCountArray"
    );
    goodCountArray = this.formatLineDataPoints(
      data.sentiment,
      "goodCountArray"
    );
    veryGoodCountArray = this.formatLineDataPoints(
      data.sentiment,
      "veryGoodCountArray"
    );

    console.log("totalCountArray: ", totalCountArray);
    console.log("veryBadCountArray: ", veryBadCountArray);
    console.log("badCountArray: ", badCountArray);
    console.log("averageCountArray: ", averageCountArray);
    console.log("goodCountArray: ", goodCountArray);
    console.log("veryGoodCountArray: ", veryGoodCountArray);

    return (
      <Fragment>
        <XYPlot
          height={900}
          width={600}
          xDomain={[0, totalCountArray.length - 1]}
          yDomain={[0, 1000]}
        >
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis title="Period of Time (Last Seven Days)" />
          <YAxis title="Total Count (Number of Tweets)" />
          <LineSeries data={totalCountArray} color="red" />
          <LineSeries data={veryBadCountArray} color="orange" />
          <LineSeries data={badCountArray} color="yellow" />
          <LineSeries data={averageCountArray} color="green" />
          <LineSeries data={goodCountArray} color="blue" />
          <LineSeries data={veryGoodCountArray} color="black" />
        </XYPlot>
      </Fragment>
    );
  }
}

export default TweetsOverTimePage;
