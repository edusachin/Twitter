import React, { Component } from 'react';
import { Route, Switch, Redirect, NavLink } from "react-router-dom";
import CreateList from './createList';
import Owned from './owned';
import Subscriptions from './subscriptions';
import Memberships from './memberships';
import RightPanel from "../right-panel/rightPanel";

class Lists extends Component {
    state = {};
    componentDidMount() {
        document.title = "Lists / Twitter";
    }
    render() {

        return (
            <div className="row">
                <div className="col-sm-7">
                    <div className="row">
                        <div className="content-title col-sm-11">
                            <h4 className="col-sm-12">Lists</h4>
                            <p className="tagline col-sm-12">@username</p>
                        </div>
                        <div className="content-title col-sm-1">
                           <CreateList />
                        </div>

                        <div className="col-sm-12">
                            <div className="nav-tabs row text-center">
                                <div className="navlinkItem col-sm-4 py-2 ">
                                    <NavLink className="p-2" to="/lists/owned" exact={true}>Owned</NavLink>
                                </div>
                                <div className="navlinkItem col-sm-4 py-2 ">
                                    <NavLink className="p-2" to="/lists/subscriptions" exact={true}>Subscribed</NavLink>
                                </div>
                                <div className="navlinkItem col-sm-4 py-2 ">
                                    <NavLink className="p-2 " to="/lists/memberships" exact={true}>Member</NavLink>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12">
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
                    </div>
                </div>
                <RightPanel />
            </div >

        );
    }
}

export default Lists;