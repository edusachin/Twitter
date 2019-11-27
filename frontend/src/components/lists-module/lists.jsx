import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect, NavLink, withRouter } from "react-router-dom";
import Owned from './owned';
import Subscriptions from './subscriptions';
import Memberships from './memberships';


class Lists extends Component {
    state = {}
    render() {

        return (
            <div className="container">
                <h2>List</h2>
                <BrowserRouter>
                    <nav className="navbar navbar-expand-lg navbar-light text-center">
                        <div className="col-sm-4 ">
                            <NavLink className="nav-link" to="/lists/owned" exact={true}>Owned</NavLink>
                        </div>
                        <div className="col-sm-4">
                            <NavLink className="nav-link" to="/lists/subscriptions" exact={true}>Subscribed</NavLink>
                        </div>
                        <div className="col-sm-4">
                            <NavLink className="nav-link" to="/lists/memberships" exact={true}>Member</NavLink>
                        </div>
                    </nav>
                    <div className="row">
                        <Switch>
                            <Route
                                path="/lists/owned"
                                component={Owned}
                            />
                            <Route
                                path="/lists/subscriptions"
                                component={Subscriptions}
                            />
                            <Route
                                path="/lists/memberships"
                                component={Memberships}
                            />
                            <Redirect
                                from="/lists"
                                to="/lists/owned"
                                exact
                                component={Owned}
                            />
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        );

    }
}

export default Lists;