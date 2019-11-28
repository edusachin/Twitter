import React, { Component } from 'react';
import RightPanel from "../right-panel/rightPanel";

class TweetPage extends Component {
    state = {}
    render() {
        return (
            <div className="row tweetpage">
                <div className="col-sm-7">
                    <div className="row">
                        <h2 className="content-title col-sm-12">Tweet</h2>
                    </div>
                </div>
                <RightPanel />
            </div>
        );
    }
}

export default TweetPage;