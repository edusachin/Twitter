import React, { Component } from 'react';
import { Route, Switch, Redirect, NavLink } from "react-router-dom";
import ExploreUsers from './ExploreUsers';
import ExploreTweets from './ExploreTweets';
import RightPanel from "../right-panel/rightPanel";

class Explore extends Component {
    state = {};
    componentDidMount() {
        document.title = "Explore / Twitter";
    }
    render() {
        return (
            <div className="row explore-section">
                <div className="col-sm-7">
                    <div className="row">
                        <h2 className="content-title col-sm-12">Explore</h2>
                        <div className="col-sm-12">
                            <div className="nav-tabs row text-center">
                                <div className="navlinkItem col-sm-6 py-2 ">
                                    <NavLink className="p-2" to={{ pathname: `/explore/users` }} exact={true}>Users</NavLink>
                                </div>
                                <div className="navlinkItem col-sm-6 py-2 ">
                                    <NavLink className="p-2" to={{ pathname: `/explore/tweets` }} exact={true}>Tweets</NavLink>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <Switch>
                                <Route
                                    path="/explore/users"
                                    component={ExploreUsers}
                                />
                                <Route
                                    path="/explore/tweets"
                                    component={ExploreTweets}
                                />
                                <Redirect
                                    from="/explore"
                                    to="/explore/users"
                                    exact
                                    component={ExploreUsers}
                                />
                            </Switch>
                        </div>
                    </div>
                </div>
                <RightPanel />
            </div>
        );
    }
}

export default Explore;