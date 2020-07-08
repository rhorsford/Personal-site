import React from 'react';

import './Chart.css'


const Chart = () => {

    var index = 0;
    const charStats = [

        {skill: 'CSS', percent: '90%', bar: 'calc(90% - 120px)'},
        {skill: 'HTML 5', percent: '90%', bar: 'calc(90% - 120px)'},
        {skill: 'Javascript', percent: '85%', bar: 'calc(85% - 120px)'},
        {skill: 'JQuery', percent: '85%', bar: 'calc(85% - 120px)'},
        {skill: 'React Js', percent: '65%', bar: 'calc(65% - 120px)'},
        {skill: 'Node Js', percent: '65%', bar: 'calc(65% - 120px)'},
        {skill: 'UI Design', percent: '50%', bar: 'calc(50% - 120px)'},
        {skill: 'Accessibility', percent: '60%', bar: 'calc(60% - 120px)'},

    ];

    return (
        <div id="chart">
            {charStats.map((charStat) => {
                    index++;
                    return (
                        <div className="bar" key={index}>
                            <div className="bar-fill" style={{width: charStat.bar}}>
                            </div>
                            <div className="tag">{charStat.skill}</div>
                            <span>{charStat.percent}</span>
                        </div>
                    )
                }
            )}
        </div>
    )
};

export default Chart;