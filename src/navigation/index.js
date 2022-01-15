import React, { memo } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainPage from "../pages/listCurrencies";
import RatesDaily from "../pages/ratesDailyPages";
import { HashRouter } from "react-router-dom";

const Navigation = () => {
  return (
    <Router>
      <HashRouter basename={process.env.PUBLIC_URL}>
        <div className="wrapper">
          <Switch>
            <Route path="/rates">
              <RatesDaily />
            </Route>
            <Route path="/">
              <MainPage />
            </Route>
          </Switch>
        </div>
      </HashRouter>
    </Router>
  );
};

export default memo(Navigation);
