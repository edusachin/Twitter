import React, { Component } from 'react';

class ListCard extends Component {

    render() {
        var listData = this.props.listData
        return (
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">{listData.}</h5>
                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
            </div>);
    }
}

export default ListCard;