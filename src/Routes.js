import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard/index";
import Login from "./pages/Login/index";
import Logout from "./pages/Logout/index";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
				<Route path="/" exact component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/logout" component={Logout} />
        <Route path="*" component={Login} />
      </Switch>
    </BrowserRouter>
  );
}
