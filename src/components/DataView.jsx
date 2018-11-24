import React, { Component, Fragment } from "react";
import "../../node_modules/react-vis/dist/style.css";
import { XYPlot, LineSeries } from "react-vis";

class DataView extends Component {
  render() {
    return (
      <div className="App">
        <XYPlot height={300} width={300} xDomain={[0, 9]}>
          <LineSeries data={this.props.data} />
        </XYPlot>
      </div>
    );
  }
}

export default DataView;
