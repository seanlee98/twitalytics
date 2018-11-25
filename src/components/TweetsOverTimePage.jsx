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
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

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
    this.maxTweetCount = 0;
  }

  formatLineDataPoints(data, dataType) {
    let dataArray = [];
    const dataPoints = data;
    let maxTweetCount = this.maxTweetCount;
    console.log("formatLineDataPoints: ", data);
    dataPoints.map((dataPoint, index) => {
      if (dataPoint.average_value !== 0) {
        if (dataType.includes("totalCount")) {
          // handle totalCountArray
          if (maxTweetCount < dataPoint.count) {
            // keep track of largest count for y-axis scaling
            maxTweetCount = dataPoint.count;
          }
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

    if (dataType.includes("totalCount")) {
      this.maxTweetCount = maxTweetCount;
    }

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

    totalCountArray = this.formatLineDataPoints(data.sentiments, "totalCount");
    veryBadCountArray = this.formatLineDataPoints(data.sentiments, "veryBad");
    badCountArray = this.formatLineDataPoints(data.sentiments, "bad");
    averageCountArray = this.formatLineDataPoints(
      data.sentiments,
      "averageCountArray"
    );
    goodCountArray = this.formatLineDataPoints(
      data.sentiments,
      "goodCountArray"
    );
    veryGoodCountArray = this.formatLineDataPoints(
      data.sentiments,
      "veryGoodCountArray"
    );

    return (
      <Fragment>
        <div className="graph-container">
          <XYPlot
            height={900}
            width={900}
            xDomain={[0, totalCountArray.length - 1]}
            yDomain={[0, this.maxTweetCount]}
          >
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis title="Period of Time (Last Seven Days)" />
            <YAxis title="Tweet Category Count (Number of Tweets)" />
            <LineSeries data={totalCountArray} color="black" />
            <LineSeries data={veryBadCountArray} color="#ed553b" />
            <LineSeries data={badCountArray} color="#173f5f" />
            <LineSeries data={averageCountArray} color="#20639b" />
            <LineSeries data={goodCountArray} color="#f6d55c" />
            <LineSeries data={veryGoodCountArray} color="#3caea3" />
          </XYPlot>
        </div>
        <div className="legend-container">
          <Card>
            <CardContent>
              <Typography component="p" variant="h3">
                Legend
              </Typography>
              <br />
              <font color="black">Total Count</font>
              <br />
              <font color="#ed553b">Very Bad Category</font>
              <br />
              <font color="#173f5f">Bad Category</font>
              <br />
              <font color="#20639b">Average Category</font>
              <br />
              <font color="#f6d55c">Good Category</font>
              <br />
              <font color="#3caea3">Very Good Category</font>
            </CardContent>
          </Card>
        </div>
      </Fragment>
    );
  }
}

export default TweetsOverTimePage;
