import React, { Component } from 'react';
import { Route, Switch, Redirect, NavLink } from "react-router-dom";
import ListTweets from './listTweets';
import ListMembers from './listMembers';
import ListSubscribers from './listSubscribers';
import RightPanel from "../right-panel/rightPanel";

class ListDetails extends Component {
    state = {}
    render() {
        return (
            <div className="row">
                <div className="col-sm-7">
                    <div className="row">
                        <div className="content-title col-sm-12">
                            <h4 className="col-sm-12">List Details</h4>
                            <p className="tagline col-sm-12">@listDescription</p>
                        </div>

                        <div className="col-sm-12">
                            <div className="row nav-tabs text-center">
                                <div className="navlinkItem col-sm-4 py-2 ">
                                    <NavLink className="p-2" to="/listdetails/tweets" exact={true}>Tweets</NavLink>
                                </div>
                                <div className="navlinkItem col-sm-4 py-2 ">
                                    <NavLink className="p-2" to="/listdetails/members" exact={true}>Members</NavLink>
                                </div>
                                <div className="navlinkItem col-sm-4 py-2 ">
                                    <NavLink className="p-2 " to="/listdetails/subscribers" exact={true}>Subscribers</NavLink>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-12">
                            <Switch>
                                <Route
                                    path="/listdetails/tweets"
                                    render={() => <ListTweets />}
                                />
                                <Route
                                    path="/listdetails/members"
                                    component={ListMembers}
                                />
                                <Route
                                    path="/listdetails/subscribers"
                                    component={ListSubscribers}
                                />
                                <Redirect
                                    from="/listdetails"
                                    to="/listdetails/tweets"
                                    render={() => <ListTweets />}
                                />
                            </Switch>
                        </div>
                    </div >
                </div >
                <RightPanel />
            </div >
        );
    }
}

export default ListDetails;