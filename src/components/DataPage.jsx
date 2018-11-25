import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import DataView from "./DataView";
import { fetchTwitterData } from "../utils/ApiCalls";
import CircularProgress from "@material-ui/core/CircularProgress";
import NavBar from "./NavBar";

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
  constructor(props) {
    super(props);
    this.state = {
      filter: "Sentiment Analysis",
      interval: "null",
      labelWidth: 0,
      dataFilter: "Sentiment Analysis",
      data: [],
      searchData: this.props.location.state.searchValue
    };
  }

  async componentDidMount() {
    console.log("props passed in from HomePage: ", this.props);
    const data = await fetchTwitterData(this.state.searchData);
    console.log("data retrieved from api call: ", data);
    this.setState({
      labelWidth: 50,
      data: data.sentiments,
      isDataRetrieved: true
    });
  }

  handleGraphChange = event => {
    const value = event.target.value;
    this.setState({
      dataFilter: value,
      [event.target.name]: value
    });
  };

  handleIntervalChange = event => {
    const value = event.target.value;
    this.setState({
      dataInterval: value,
      [event.target.name]: value
    });
  };

  createIntervalList(data) {
    if (data) {
      let intervals = [];
      data.map((dataPoint, index) => {
        intervals.push(dataPoint.interval);
      });
      return intervals;
    } else {
      return [];
    }
  }

  filterData(data) {
    let filteredData = [];
    if (this.state.filter.includes("Sentiment Analysis")) {
      filteredData = data;
    } else {
      data.map((dataPoint, index) => {
        if (dataPoint.interval.includes(this.state.interval)) {
          filteredData.push(dataPoint);
        }
      });
    }

    return filteredData;
  }

  render() {
    const { classes } = this.props;
    const { dataFilter, data } = this.state;
    const intervals = this.createIntervalList(data);

    return (
      <Fragment>
        <NavBar />
        <div className="container">
          <div className="data-container">
            {dataFilter.includes("Sentiment Analysis") ? (
              <form>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="filter-simple">Filter</InputLabel>
                  <Select
                    value={this.state.dataFilter}
                    onChange={this.handleGraphChange}
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
                    value={this.state.dataFilter}
                    onChange={this.handleGraphChange}
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
                    onChange={this.handleIntervalChange}
                    value={this.state.interval}
                    inputProps={{
                      name: "interval",
                      id: "interval-simple"
                    }}
                  >
                    {intervals.map((interval, i) => (
                      <MenuItem value={interval}>{interval}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </form>
            )}
            {data.length === 0 ? (
              <div>
                {" "}
                <CircularProgress className={classes.progress} />
              </div>
            ) : (
              <DataView dataFilter={dataFilter} data={this.filterData(data)} />
            )}
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
