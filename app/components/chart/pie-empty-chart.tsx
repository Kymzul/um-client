'use client'
import React, { PureComponent } from 'react';
import { Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import { PieChart } from '@mui/x-charts';


const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function PieEmptyChart() {
    return (
        <PieChart
            series={[
                {
                    data: [
                        { id: 0, value: 10, label: 'Shariah', },
                        { id: 1, value: 15, label: 'Non-Shariah' },

                    ],
                },
            ]}
            width={400}
            height={200}
        />
    )
}