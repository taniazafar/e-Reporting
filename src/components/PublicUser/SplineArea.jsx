import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
    Chart,
    ArgumentAxis,
    ValueAxis,
    AreaSeries,
    Title,
} from '@devexpress/dx-react-chart-material-ui';
import { ArgumentScale, Animation } from '@devexpress/dx-react-chart';
import {
    curveCatmullRom,
    area,
} from 'd3-shape';
import { scalePoint } from 'd3-scale';
import classes from './charts.module.css'
const data = [
    { month: 'Jan', islamabad: 101, rawalpindi: 13 },
    { month: 'Feb', islamabad: 89, rawalpindi: 15 },
    { month: 'Mar', islamabad: 107, rawalpindi: 20 },
    { month: 'Apr', islamabad: 113, rawalpindi: 17 },
    { month: 'May', islamabad: 105, rawalpindi: 21 },
    { month: 'Jun', islamabad: 91, rawalpindi: 22 },
    { month: 'Jul', islamabad: 110, rawalpindi: 23 },
    { month: 'Aug', islamabad: 111, rawalpindi: 25 },
    { month: 'Sep', islamabad: 112, rawalpindi: 27 },
    { month: 'Oct', islamabad: 111, rawalpindi: 30 },
    { month: 'Nov', islamabad: 120, rawalpindi: 35 },
    { month: 'Dec', islamabad: 160, rawalpindi: 45 },
];



const Area = props => (
    <AreaSeries.Path
        {...props}
        path={area()
            .x(({ arg }) => arg)
            .y1(({ val }) => val)
            .y0(({ startVal }) => startVal)
            .curve(curveCatmullRom)}
    />
);

export default class Demo extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data,
        };
    }

    render() {
        const { data: chartData } = this.state;
        return (
            <Paper>
                <Chart
                className={classes.cht}
                    data={chartData}
                    height={300}
                    width={500}
                >
                    <ArgumentScale factory={scalePoint} />
                    <ArgumentAxis />
                    <ValueAxis />

                    <AreaSeries
                        name="Islamabad"
                        valueField="islamabad"
                        argumentField="month"
                        seriesComponent={Area}
                    />
                    <AreaSeries
                        name="Rawalpindi"
                        valueField="rawalpindi"
                        argumentField="month"
                        seriesComponent={Area}
                    />
                    <Animation />
                     <Title text="Islamabad vs Rawalpindi (2021)" />
                </Chart>
            </Paper>
        );
    }
}

