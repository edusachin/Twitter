import React, { Component } from 'react';
import './postTweet.css';
import placeholder from '../common/placeholder.jpg';

class PostTweet extends Component {
    state = {}
    render() {
        return (
            <div className="row post-tweet">
                <div className="col-sm-12">
                    <div className="row">
                        <div className="col-sm-1 d-flex justify-content-center m-auto">
                            <img src={placeholder} className="tweet-owner-image ml-3" />
                        </div>
                        <form className="col-sm-11">
                            <div className="form-group col-sm-12">
                                <input type="text" className="form-control" placeholder="What's Happening?" />
                            </div>
                            <div className="form-group col-sm-12 ml-2">
                                <label for = "file-input">
                                    <i class="far fa-image fa-2x"></i>
                                </label>
                                <input type="file" id = "file-input"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default PostTweet;