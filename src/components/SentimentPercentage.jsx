import React, { Component } from "react";
import "../../node_modules/react-vis/dist/style.css";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";


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

class SentimentPercentage extends Component{
    constructor(props){
        super(props);
        this.state = {
            //mock for now
            data: []
        }
    }

    createIntervalList(data) {
        if(data){
            let intervals = [];
            data.map((dataPoint, index) => {
            intervals.push(dataPoint.interval);
            });
            return intervals;
        }
        else{
            return [];
        }
    }

    render(){
        
        const { classes } = this.props;
        const { data } = this.state;
        const intervals = this.createIntervalList(data);

        return(
            <form>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="filter-simple">Interval</InputLabel>
                    <Select
                        onChange={this.handleIntervalChange}
                        value={this.state.interval}
                        inputProps={{
                            name: "interval",
                            id: "interval-simple"
                        }}
                    >
                    {
                        intervals.map((interval,i) => (<MenuItem value={interval} >{interval}</MenuItem>))
                    }
                    </Select>
                </FormControl>
            </form>
        )
    }
}

SentimentPercentage.propTypes = {
    classes: PropTypes.object.isRequired
};
  
export default withStyles(styles)(SentimentPercentage);