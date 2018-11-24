import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import DataView from "./DataView";
import { fetchTwitterData } from "../utils/ApiCalls";

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

class DataPage extends Component {
  state = {
    filter: "",
    interval: "",
    labelWidth: 0,
    dataFilter: "Sentiment Analysis",
    dataInterval: "Interval 1",
    data: null
  };
  async componentDidMount() {
    const data = await fetchTwitterData();
    this.setState({
      labelWidth: 50
    });
  }

  handleChange = event => {
    const value = event.target.value;
    if (value.includes("Sentiment")) {
      this.setState({
        dataFilter: value,
        [event.target.name]: value
      });
    } else {
      this.setState({
        dataInterval: value,
        [event.target.name]: value
      });
    }
  };

  render() {
    const { classes } = this.props;
    const { dataFilter } = this.state;
    const data = [
      {
        interval: "2018-11-20T19:00:00",
        average_value: 20.0,
        common_comments: ["this sucks", "this rocks"],
        sentiments: {
          Very_Bad: 0,
          Bad: 9,
          Average: 63,
          Good: 23,
          Very_Good: 5
        }
      },
      {
        interval: "2018-11-20T20:00:00",
        average_value: 15.2,
        common_comments: ["this sucks", "this rocks"],
        sentiments: {
          Very_Bad: 0,
          Bad: 9,
          Average: 34,
          Good: 23,
          Very_Good: 10
        }
      },
      {
        interval: "2018-11-20T21:00:00",
        average_value: 17.8,
        common_comments: ["this sucks", "this rocks"],
        sentiments: {
          Very_Bad: 1,
          Bad: 9,
          Average: 3,
          Good: 23,
          Very_Good: 53
        }
      }
    ];

    return (
      <Fragment>
        <div className="container">
          <div className="data-container">
            {dataFilter.includes("Sentiment Analysis") ? (
              <form>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="filter-simple">Filter</InputLabel>
                  <Select
                    value={this.state.filter}
                    onChange={this.handleChange}
                    inputProps={{
                      name: "filter",
                      id: "filter-simple"
                    }}
                  >
                    <MenuItem value={"Sentiment Analysis"}>
                      Sentiment Analysis
                    </MenuItem>
                    <MenuItem value={"Sentiment Count"}>
                      Sentiment Count
                    </MenuItem>
                  </Select>
                </FormControl>
              </form>
            ) : (
              <form>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="filter-simple">Filter</InputLabel>
                  <Select
                    value={this.state.filter}
                    onChange={this.handleChange}
                    inputProps={{
                      name: "filter",
                      id: "filter-simple"
                    }}
                  >
                    <MenuItem value={"Sentiment Analysis"}>
                      Sentiment Analysis
                    </MenuItem>
                    <MenuItem value={"Sentiment Count"}>
                      Sentiment Count
                    </MenuItem>
                  </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="filter-simple">Interval</InputLabel>
                  <Select
                    value={this.state.interval}
                    onChange={this.handleChange}
                    inputProps={{
                      name: "interval",
                      id: "interval-simple"
                    }}
                  >
                    <MenuItem value={"Interval 1"}>Interval 1</MenuItem>
                    <MenuItem value={"Interval 2"}>Interval 2</MenuItem>
                  </Select>
                </FormControl>
              </form>
            )}

            <DataView dataFilter={dataFilter} data={data} />
          </div>
        </div>
      </Fragment>
    );
  }
}

DataPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DataPage);
