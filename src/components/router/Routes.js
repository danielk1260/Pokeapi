import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "../../Main";
import Pokemon from "../../Pokemon";

const routes = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/pokemon/:id">
            <Pokemon />
          </Route>
          <Route path="/">
            <Main />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default routes;
