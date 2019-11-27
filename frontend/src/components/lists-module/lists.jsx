import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect, NavLink, withRouter } from "react-router-dom";
import Owned from './owned';
import Subscriptions from './subscriptions';
import Memberships from './memberships';
import OwnedList from './ownedList';
import ListDetails from './listDetails';


class Lists extends Component {
    state = {}
    render() {

        return (
            <div className="container">
               
                
                    {/* <nav className="navbar navbar-expand-lg navbar-light text-center">
                        <div className="col-sm-4 ">
                            <NavLink className="nav-link" to="/lists/owned" exact={true}>Owned</NavLink>
                        </div>
                        <div className="col-sm-4">
                            <NavLink className="nav-link" to="/lists/subscriptions" exact={true}>Subscribed</NavLink>
                        </div>
                        <div className="col-sm-4">
                            <NavLink className="nav-link" to="/lists/memberships" exact={true}>Member</NavLink>
                        </div>
                    </nav> */}
                    <div className="row">
                        <Switch>
                            {/* <Route
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
                             <Route
                                    exact path="/lists/details"
                                    component={ListDetails1}
                                />
                            {/* <Redirect
                                from="/lists"
                                to="/lists/owned"
                                exact
                                component={Owned}
                            /> */} */}
                            
                            <Route
                                path="/lists/owned/:id"
                                component={OwnedList}
                            />
                            <Route
                                path="/lists/details"
                                component={ListDetails}
                            />
                        </Switch>
                    </div>
               
            </div>
        );

    }
}

export default Lists;