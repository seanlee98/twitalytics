import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import DataView from "./DataView";

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
    labelWidth: 0,
    dataFilter: null
  };
  componentDidMount() {
    this.setState({
      labelWidth: 50
    });
  }

  handleChange = event => {
    this.setState({ dataFilter: event.target.value });
    console.log("dataFilter being passed in", event.target.value);
  };

  render() {
    const { classes } = this.props;
    const { dataFilter } = this.state;
    const data = [
      { x: 0, y: 8 },
      { x: 1, y: 5 },
      { x: 2, y: 4 },
      { x: 3, y: 9 },
      { x: 4, y: 1 },
      { x: 5, y: 7 },
      { x: 6, y: 6 },
      { x: 7, y: 3 },
      { x: 8, y: 2 },
      { x: 9, y: 0 }
    ];

    return (
      <Fragment>
        <div className="data-container">
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
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"Sentiment Analysis"}>
                  Sentiment Analysis
                </MenuItem>
                <MenuItem value={"Bar"}>Bar Graph stuff</MenuItem>
                <MenuItem value={"Common Feedback"}>Common Feedback</MenuItem>
              </Select>
            </FormControl>
          </form>
          <DataView dataFilter={dataFilter} data={data} />
        </div>
      </Fragment>
    );
  }
}

DataPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DataPage);
