import React, { Component, Fragment } from "react";
import "../../node_modules/react-vis/dist/style.css";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import { Carousel } from "react-responsive-carousel";
import Grid from "@material-ui/core/Grid";

import {
  XYPlot,
  LineSeries,
  VerticalBarSeries,
  VerticalGridLines,
  HorizontalGridLines,
  XAxis,
  YAxis
} from "react-vis";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

class SentimentOverTimePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataPoints: [],
      graphHeight: 600,
      graphWidth: window.innerWidth,
      topDataPoint: { x: 0, y: 0 },
      bottomDataPoint: { x: 0, y: 0 }
    }
  }

  formatLineDataPoints(data) {
    let dataPoints = data;
    console.log(dataPoints);
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

  getComments(comments) {
      let subset = [];
      if (comments.length < 4) {
        subset = comments.slice(0, comments.length);
      }
      else {
        subset = comments.slice(0,4);
      }
      return subset;
  }

  render() {
    let { data } = this.props;
    const dataPoints = this.formatLineDataPoints(data.sentiments);
    const { topDataPoint, bottomDataPoint} = this.state;
    const xDomain =  [0, dataPoints.length - 1];
    const comments = data.common_tweets;
    const goodComments = this.getComments(comments.good_tweets);
    const badComments = this.getComments(comments.bad_tweets);
    const yPoints = [];
    dataPoints.map((key,value) => yPoints.push(key.y))
    const yDomain = [Math.min(...yPoints), Math.max(...yPoints)];
    console.log(yPoints);


    return (
      <Fragment>
        <div>
          <XYPlot
            height={this.state.graphHeight}
            width={this.state.graphWidth}
            xDomain={xDomain}
            yDomain={yDomain}
          >
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis title="Period of Time (Last Seven Days)" />
            <YAxis title="Average Sentiment Score" />
            <LineSeries
                data={dataPoints}
                color="#20639B"
              />
          </XYPlot>
          {goodComments.length > 0 && (
            <Typography
              variant="h5"
              gutterBotton
              style={{marginTop:50}}>Positive Tweets</Typography>
          )}
          <Grid container spacing={24}>
            {goodComments.map((comment, i) => (
              <Grid item xs={6}>
              <Card>
                <CardContent>
                  <Typography component="p">
                    {comment}
                  </Typography>
                </CardContent>
              </Card>
              </Grid>
            ))}
          </Grid>
          {badComments.length > 0 && (
            <Typography style={{marginTop:50}} variant="h5" gutterBottom>Negative Tweets</Typography>
          )}
          <Grid container spacing={24}>
            {badComments.map((comment, i) => (
              <Grid item xs={6}>
              <Card>
                <CardContent>
                  <Typography component="p">
                    {comment}
                  </Typography>
                </CardContent>
              </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </Fragment>
    );
  }
}

SentimentOverTimePage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SentimentOverTimePage);
