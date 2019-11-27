import React, { Component } from 'react';
import RightPanel from "../right-panel/rightPanel";
class Bookmarks extends Component {
    state = {};
    componentDidMount() {
        document.title = "Bookmarks / Twitter";
    }
    render() {
        return (
            <div className="row bookmarks-section">
                <div className="col-sm-7">
                    <div className="row">
                        <h2 className="content-title col-sm-12">Bookmarks</h2>
                        <div className="col-sm-12"></div>
                    </div>
                </div>
                <RightPanel />
            </div>
        );
    }
}

export default Bookmarks;