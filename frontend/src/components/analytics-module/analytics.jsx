import React, { Component } from 'react';
import RightPanel from "../right-panel/rightPanel";
import { Bar, Line, Pie } from 'react-chartjs-2';

// TODO: To be replaced with httpService
import axios from 'axios';

const backgroundColor = [
    'rgba(255, 99, 132, 0.6)',
    'rgba(54, 162, 235, 0.6)',
    'rgba(255, 206, 86, 0.6)',
    'rgba(75, 192, 192, 0.6)',
    'rgba(153, 102, 255, 0.6)',
    'rgba(0, 0, 128, 0.6)',
    'rgba(128, 128, 0, 0.6)',
    'rgba(128, 0, 0, 0.6)',
    'rgba(128, 0, 0, 1.0)',
    'rgba(128, 0, 128, 1.0)'
];

class Analytics extends Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            legendPosition: "bottom",
            chartData: {
                labels: [],
                datasets: [
                    {
                        label: '',
                        data: [],
                        backgroundColor: []
                    }
                ]
            }
        }
    }

    componentDidMount() {
        document.title = "Home / Twitter";

        // TODO: To be replaced with localStorage user_id
        axios.get('http://localhost:3001/api/analytics/topViewedTweets')
            .then(response => {
                if (response.status === 200) {
                    let tweets = response.data;
                    this.setState({
                        chartData: {
                            labels: Array.from(tweets, tweet => tweet.tweet_text),
                            datasets: [
                                {
                                    label: '',
                                    data: Array.from(tweets, tweet => tweet.view_count),
                                    backgroundColor: backgroundColor.slice(0, (tweets.length - 1))
                                }
                            ]
                        }
                    });
                }
            })
            .catch(err => {
                if (err.response && err.response.data) {
                    console.log(err.response.data);
                }
            });
    };

    handleClick = (event) => {
        // Todo :Add code here if we want to show tweet page or a pop up on click
        console.log("Hello");
    }

    static defaultProps = {
        displayTitle: true,
        displayLegend: true,
        legendPosition: 'right'
    }

    render() {
        return (
            <div className="row analytics-section">
                <div className="col-sm-7">
                    <div className="row">
                        <h2 className="content-title col-sm-12">Analytics</h2>
                        <div className="col-sm-12">
                            <div className="chart">
                                <Pie
                                    data={this.state.chartData}
                                    options={{
                                        title: {
                                            display: this.props.displayTitle,
                                            text: 'Top 10 tweets by views',
                                            fontSize: 20
                                        },
                                        legend: {
                                            display: this.props.displayLegend,
                                            position: this.props.legendPosition
                                        },
                                        onClick: this.handleClick
                                    }}
                                />
                                <br/> <br/> <br/>
                                <Bar
                                    data={this.state.chartData}
                                    options={{
                                        title: {
                                            display: this.props.displayTitle,
                                            text: 'Top 10 tweets by likes',
                                            fontSize: 20
                                        },
                                        legend: {
                                            display: this.props.displayLegend,
                                            position: this.state.legendPosition
                                        },
                                        onClick: this.handleClick
                                    }}
                                />
                                <br /> <br /> <br />
                                <Line
                                    data={this.state.chartData}
                                    options={{
                                        title: {
                                            display: this.props.displayTitle,
                                            text: 'Top 5 tweets by retweets',
                                            fontSize: 20
                                        },
                                        legend: {
                                            display: this.props.displayLegend,
                                            position: this.state.legendPosition
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <RightPanel />
            </div>
        );
    }
}

export default Analytics;