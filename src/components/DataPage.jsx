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
// import SentimentOverTimePage from "./SentimentOverTimePage";
// import SentimentPercentagePage from "./SentimentPercentagePage";
import TweetsOverTimePage from "./TweetsOverTimePage";

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
      labelWidth: 0,
      dataFilterPage: "Sentiment Over Time Page",
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
      data: data
    });
  }

  handleDataPageChange = event => {
    const page = event.target.value;
    this.setState({
      dataFilterPage: page,
      [event.target.name]: page
    });
  };

  renderDataPageComponent(dataFilterPage) {
    const data = this.state.data;
    if (dataFilterPage.includes("Sentiment Over Time Page")) {
      // return <SentimentOverTimePage data={data} />;
    } else if (dataFilterPage.includes("Sentiment Percentage Page")) {
      // return <SentimentPercentagePage data={data} />;
    } else if (dataFilterPage.includes("Tweets Over Time Page")) {
      return <TweetsOverTimePage data={data} />;
    }
  }
  render() {
    const { classes } = this.props;
    const { dataFilterPage, data } = this.state;

    return (
      <Fragment>
        <NavBar />
        <div className="container">
          <div className="data-container">
            <form>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="filter-simple">Filter Page</InputLabel>
                <Select
                  value={dataFilterPage}
                  onChange={this.handleDataPageChange}
                  inputProps={{
                    name: "filter",
                    id: "filter-simple"
                  }}
                >
                  <MenuItem value={"Sentiment Over Time Page"}>
                    Sentiment Over Time Page
                  </MenuItem>
                  <MenuItem value={"Sentiment Percentage Page"}>
                    Sentiment Percentage Page
                  </MenuItem>
                  <MenuItem value={"Tweets Over Time Page"}>
                    Tweets Over Time Page
                  </MenuItem>
                </Select>
              </FormControl>
            </form>
            {data.length === 0 ? (
              // Case where data hasn't been returned
              // Render a loading spinner
              <div>
                {" "}
                <CircularProgress className={classes.progress} />
              </div>
            ) : (
              // Case where we have received data from the api call
              // Need to decide which component to render based on our this.state.dataFilterPage
              <div>{this.renderDataPageComponent(dataFilterPage)}</div>
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
