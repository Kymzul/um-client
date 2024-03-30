"use client";

import { BarChart as DashChart, ResponsiveContainer, XAxis, YAxis, Bar, LineChart, CartesianGrid, Line, Legend, Tooltip } from "recharts";



interface DataProps {
    name: string
    total: number
}

interface DashDataProps {
    name: string
    totalSuccess: number
    totalFailure: number
}

const data: DataProps[] = [
    {
        name: "Jan",
        total: Math.floor(Math.random() * 5000) + 1000
    },
    {
        name: "Feb",
        total: Math.floor(Math.random() * 5000) + 1000
    },
    {
        name: "Mar",
        total: Math.floor(Math.random() * 5000) + 1000
    },
    {
        name: "Apr",
        total: Math.floor(Math.random() * 5000) + 1000
    },
    {
        name: "May",
        total: Math.floor(Math.random() * 5000) + 1000
    },
    {
        name: "Jun",
        total: Math.floor(Math.random() * 5000) + 1000
    },
    {
        name: "Jul",
        total: Math.floor(Math.random() * 5000) + 1000
    },
    {
        name: "Aug",
        total: Math.floor(Math.random() * 5000) + 1000
    },
    {
        name: "Sep",
        total: Math.floor(Math.random() * 5000) + 1000
    },
    {
        name: "Oct",
        total: Math.floor(Math.random() * 5000) + 1000
    },
    {
        name: "Nov",
        total: Math.floor(Math.random() * 5000) + 1000
    },
    {
        name: "Dec",
        total: Math.floor(Math.random() * 5000) + 1000
    }
];

const dashData: DashDataProps[] = [
    {
        name: "Jan",
        totalSuccess: Math.floor(Math.random() * 5000) + 1000,
        totalFailure: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Feb",
        totalSuccess: Math.floor(Math.random() * 5000) + 1000,
        totalFailure: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Mar",
        totalSuccess: Math.floor(Math.random() * 5000) + 1000,
        totalFailure: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Apr",
        totalSuccess: Math.floor(Math.random() * 5000) + 1000,
        totalFailure: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "May",
        totalSuccess: Math.floor(Math.random() * 5000) + 1000,
        totalFailure: Math.floor(Math.random() * 5000) + 1000
    },
    {
        name: "Jun",
        totalSuccess: Math.floor(Math.random() * 5000) + 1000,
        totalFailure: Math.floor(Math.random() * 5000) + 1000
    },
    {
        name: "Jul",
        totalSuccess: Math.floor(Math.random() * 5000) + 1000,
        totalFailure: Math.floor(Math.random() * 5000) + 1000
    },
    {
        name: "Aug",
        totalSuccess: Math.floor(Math.random() * 5000) + 1000,
        totalFailure: Math.floor(Math.random() * 5000) + 1000
    },
    {
        name: "Sep",
        totalSuccess: Math.floor(Math.random() * 5000) + 1000,
        totalFailure: Math.floor(Math.random() * 5000) + 1000
    },
    {
        name: "Oct",
        totalSuccess: Math.floor(Math.random() * 5000) + 1000,
        totalFailure: Math.floor(Math.random() * 5000) + 1000
    },
    {
        name: "Nov",
        totalSuccess: Math.floor(Math.random() * 5000) + 1000,
        totalFailure: Math.floor(Math.random() * 5000) + 1000
    },
    {
        name: "Dec",
        totalSuccess: Math.floor(Math.random() * 5000) + 1000,
        totalFailure: Math.floor(Math.random() * 5000) + 1000
    }
];



export default function BarChart() {
    return (
        <ResponsiveContainer width={'100%'} height={200}>
            <LineChart width={500} height={300} data={dashData}>
                <XAxis dataKey={'name'}
                    tickLine={false}
                    axisLine={false}
                    stroke="#888888"
                    fontSize={12}
                />
                <YAxis
                    tickLine={false}
                    axisLine={false}
                    stroke="#888888"
                    fontSize={12}
                    tickFormatter={(value) => `${value}`}
                />
                <Tooltip />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="totalSuccess" stroke="#82ca9d" />
                <Line type="monotone" dataKey="totalFailure" stroke="#8884d8" />
                8884d8
            </LineChart>
        </ResponsiveContainer>
    )
}

function BuildDashChart({ data }: { data: DataProps[] }) {
    return (
        <DashChart data={data} >
            <XAxis dataKey={'name'}
                tickLine={false}
                axisLine={false}
                stroke="#888888"
                fontSize={12}
            />
            <YAxis
                tickLine={false}
                axisLine={false}
                stroke="#888888"
                fontSize={12}
                tickFormatter={(value) => `${value}`}
            />
            <Bar dataKey={"total"} radius={[4, 4, 0, 0]} />
        </DashChart>
    )
}