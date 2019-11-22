import React from "react";
import Home from "./components/home-module/home";
import SignIn from "./components/signin-module/signin";
import { Route, Redirect, Switch } from "react-router";

const Main = () => {
    return (
        <Switch>
            <Route path="/signin" component={SignIn} />
            <Route path="/" component={Home} />
        </Switch>
    );
}

export default Main;
