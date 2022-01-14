import * as React from 'react';
import Paper from '@material-ui/core/Paper'
import classes from './charts.module.css'
import {
    ArgumentAxis,
    ValueAxis,
    Chart,
    LineSeries,
    Title,
} from '@devexpress/dx-react-chart-material-ui';
const data = [
    { argument: 'Jan', value: 65 },
    { argument: 'Feb', value: 59 },
    { argument: 'Mar', value: 80 },
    { argument: 'Apr', value: 56 },
    { argument: 'May', value: 55 },
    { argument: 'Jun', value: 40 },
    { argument: 'Jul', value: 65 },
    { argument: 'Aug', value: 59 },
    { argument: 'Sep', value: 81 },
    { argument: 'Oct', value: 50 },
    { argument: 'Nov', value: 55 },
    { argument: 'Dec', value: 190 },


];
export default function LineChart() {

    return (
        <Paper >
            <Chart className={classes.cht}
                data={data}
                height={300}
                width={500}
            >
                <Title color='brown' text="Crime Rate in 2021">
                </Title>
                <ArgumentAxis />
                <ValueAxis />
                <LineSeries color='rgb(74, 74, 202)' valueField="value" argumentField="argument" />

            </Chart>

        </Paper>
    )

} 