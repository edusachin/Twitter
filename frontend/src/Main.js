import React from "react";
import Home from "./components/home-module/home";
import SignIn from "./components/signin-module/signin";
import { Route, Redirect, Switch } from "react-router";
import Alert from './components/common/alert';

const Main = () => {
    return (
        <>
        <Alert />
        <Switch>
            <Route path="/signin" component={SignIn} />
            <Route path="/:id" component={Home} />
        </Switch>
        </>
    );
}

export default Main;
