import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect, NavLink } from "react-router-dom";
import ListTweets from './listTweets';
import ListMembers from './listMembers';
import ListSubscribers from './listSubscribers';

class ListDetails extends Component {
    state = {}
    render() {
       return (
            <BrowserRouter>
                <nav className="navbar navbar-expand-lg navbar-light text-center">
                    <div className="col-sm-4 ">
                        <NavLink className="nav-link" to="/lists/details/tweets" exact={true}>Tweets</NavLink>
                    </div>
                    <div className="col-sm-4">
                        <NavLink className="nav-link" to="/lists/details/members" exact={true}>Members</NavLink>
                    </div>
                    <div className="col-sm-4">
                        <NavLink className="nav-link" to="/lists/details/subscribers" exact={true}>Subscribers</NavLink>
                    </div>
                </nav>
                <div className="row">
                    <Switch>
                        <Route
                            path="/lists/details/tweets"
                            render={() => <ListTweets />}
                        />
                        <Route
                            path="/lists/details/members"
                            component={ListMembers}
                        />
                        <Route
                            path="/lists/details/subscribers"
                            component={ListSubscribers}
                        />
                        <Redirect
                            from="/lists/details"
                            to="/lists/details/tweets"
                            render={() => <ListTweets />}
                        />
                    </Switch>
                </div>
            </BrowserRouter>);
    }
}

export default ListDetails;