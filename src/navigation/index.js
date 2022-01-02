import React from "react";
import { BrowserRouter as Router, Switch, Route,} from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import MainPage from "../pages/listCurrencies";
import RatesDaily from "../pages/ratesDailyPages";

const Navigation = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Router>
      <div className="wrapper">
        <Switch>
        <Route path="/rates">
         <RatesDaily/>
          </Route>
          <Route path="/">
         < MainPage/>
          </Route>
        </Switch>
      </div>
    </Router>
    </BrowserRouter>
  );
};

export default Navigation;
