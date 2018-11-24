import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import HomePage from "./components/HomePage";

const App = () => (
  <BrowserRouter>
    <React.Fragment>
      <Route exact path="/" component={HomePage} />
    </React.Fragment>
  </BrowserRouter>
);

export default App;
