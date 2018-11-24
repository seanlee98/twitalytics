import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import HomePage from "./components/HomePage";
import DataPage from "./components/DataPage";

const App = () => (
  <BrowserRouter>
    <React.Fragment>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/data" component={DataPage} />
    </React.Fragment>
  </BrowserRouter>
);

export default App;
