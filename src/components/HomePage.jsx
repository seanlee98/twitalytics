import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import "../App.css";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import NavBar from "./NavBar";
import Typography from "@material-ui/core/Typography";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

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

    const title = {
      marginTop: "50px"
    };

    const search = {
      marginRight: "60px"
    };

    return (
      <Fragment>
        <div className={classes.root}>
          <NavBar />
          <Grid
            container
            spacing={6}
            justify="center"
            alignItems="center"
            direction="column"
          >
            <Grid item xs={12}>
              <div className="main-title">
                <Typography style={{fontWeight:"bold"}} variant="h1">Twitalytics</Typography>
              </div>
              <div className="sub-title">
                <Typography style={{textAlign:"center", fontSize:16}} varient="h3">
                  See what the Twitter-verse is saying about your latest
                  product!
                </Typography>
              </div>
            </Grid>
            <Grid spacing={20}>
              <Grid item xs={6}>
                <div className="search-container">
                  <Input
                    placeholder="Enter Search Term"
                    className={classes.input}
                    value={this.state.name}
                    onChange={this.handleChange}
                    onKeyPress={this.handleSubmit.bind(this)}
                  />
                </div>
              </Grid>
            </Grid>
            <Grid spacing={24}>
              <Grid item>
                <div className="carousel-container">
                  <Carousel
                    showThumbs={false}
                    showArrows={false}
                    infiniteLoop
                    interval={5000}
                    dynamicHeight
                    autoPlay
                  >
                    <div className="img-container">
                      <img
                        src="http://www.getspokal.com/wp-content/uploads/2014/08/wpid-baa-2.jpg"
                        alt=""
                      />
                    </div>
                    <div className="img-container">
                      <img
                        src="https://weareshootingstar.co.uk/admin/resources/blog/tweet-2.bmp"
                        alt=""
                      />
                    </div>
                    <div className="img-container">
                      <img
                        src="https://static.businessinsider.com/image/4d488a0749e2ae1e4b140000/image.jpg"
                        alt=""
                      />
                    </div>
                    <div className="img-container">
                      <img
                        src="https://i2-prod.mirror.co.uk/incoming/article10794254.ece/ALTERNATES/s615b/PROD-cJPG.jpg"
                        alt=""
                      />
                    </div>
                    <div className="img-container">
                      <img
                        src="https://cpb-eu-w2.wpmucdn.com/blogs.brighton.ac.uk/dist/5/2561/files/2017/02/Image-2-19dj678.png"
                        alt=""
                      />
                    </div>
                  </Carousel>
                </div>
              </Grid>
            </Grid>
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
