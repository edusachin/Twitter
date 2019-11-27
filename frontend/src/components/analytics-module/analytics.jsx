import React, { Component } from 'react';
import RightPanel from "../right-panel/rightPanel";
class Analytics extends Component {
    state = {}
    render() {
        return (
            <div className="row analytics-section">
                <div className="col-sm-7">
                    <div className="row">
                        <h2 className="content-title col-sm-12">Analytics</h2>
                        <div className="col-sm-12"></div>
                    </div>
                </div>
                <RightPanel />
            </div>
        );
    }
}

export default Analytics;