import React, { Component } from 'react';
import RightPanel from "../right-panel/rightPanel";
import { Bar, Line, Pie } from 'react-chartjs-2';

class Analytics extends Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            location: "Massachusetts",
            legendPosition: "bottom",
            chartData: {
                labels: ['Tweet1', 'Tweet2', 'Tweet3', 'Tweet4', 'Tweet5', 'Tweet6'],
                datasets: [
                    {
                        label: 'Views',
                        data: [
                            10,
                            7,
                            6,
                            4,
                            2,
                            1
                        ],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(153, 102, 255, 0.6)',
                            'rgba(255, 159, 64, 0.6)',
                            'rgba(255, 99, 132, 0.6)'
                        ]
                    }
                ]
            }
        }
    }

    handleClick = (event) => {
        console.log("Hello");
    }

    static defaultProps = {
        displayTitle: true,
        displayLegend: true,
        legendPosition: 'right',
        location: 'City'
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
                                            fontSize: 25
                                        },
                                        legend: {
                                            display: this.props.displayLegend,
                                            position: this.props.legendPosition
                                        },
                                        onClick: this.handleClick
                                    }}
                                />
                                <Bar
                                    data={this.state.chartData}
                                    options={{
                                        title: {
                                            display: this.props.displayTitle,
                                            text: 'Top 10 tweets by views',
                                            fontSize: 25
                                        },
                                        legend: {
                                            display: this.props.displayLegend,
                                            position: this.state.legendPosition
                                        },
                                        onClick: this.handleClick
                                    }}
                                />
                                <Line
                                    data={this.state.chartData}
                                    options={{
                                        title: {
                                            display: this.props.displayTitle,
                                            text: 'Top 10 tweets by views',
                                            fontSize: 25
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