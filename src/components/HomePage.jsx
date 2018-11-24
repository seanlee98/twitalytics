import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import "../App.css";
import ReactDOM from "react-dom";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";
import Input from "@material-ui/core/Input";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  input: {
    margin: theme.spacing.unit,
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
});

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      name: event.target.value
    });
  }

  handleSubmit(event) {
    if (event.key === "Enter") {
      this.props.history.push({
        pathname: "/data",
        state: {
          searchValue: event.target.value
        }
      });
    }
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    const title = {
      marginTop: "50px"
    };

    const search = {
      marginRight: "60px"
    };

    return (
      <Fragment>
        <div className={classes.root}>
          <AppBar position="static">
            <Tabs value={value} onChange={this.handleChange}>
              <Tab label="Dash" />
              <Tab label="Data" />
              />
            </Tabs>
          </AppBar>
          <Grid
            container
            spacing={24}
            justify="center"
            alignItems="center"
            direction="column"
          >
            <Grid item xs={12}>
              <div style={title}>DASHBoard</div>
            </Grid>
            <form className={classes.container} noValidate autoComplete="off">
              <Grid container spacing={24} justify="center" alignItems="center">
                <Grid item xs={6}>
                  <Input
                    placeholder="Enter Search Term"
                    className={classes.input}
                    value={this.state.name}
                    onChange={this.handleChange}
                    onKeyPress={this.handleSubmit.bind(this)}
                  />
                </Grid>
              </Grid>
            </form>
          </Grid>
        </div>
      </Fragment>
    );
  }
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HomePage);
