import React from 'react'
import {
    ResponsiveContainer,
    AreaChart,
    XAxis,
    YAxis,
    Area,
    Tooltip,
    CartesianGrid,
} from "recharts";
import { format, parseISO } from "date-fns";

const Chart = (props) => {
    const CustomTooltip = ({ active, payload, label }) => {
        if (active) {
            return (
                <div className="tooltip">
                    <h4>{format(parseISO(label), "eeee, d MMM, yyyy")}</h4>
                    <p>{payload[0].value} {props.measure}</p>
                </div>
            );
        }
        return null;
    }

    return (
        <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={props.data}>
                <defs>
                    <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4} />
                        <stop offset="75%" stopColor="#2451B7" stopOpacity={0.05} />
                    </linearGradient>
                </defs>

                <Area dataKey="value" stroke="#2451B7" fill="url(#color)" />

                <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(str) => {
                        const date = parseISO(str);
                        if (date.getDate() % 7 === 0) {
                            return format(date, "MMM, d");
                        }
                        return "";
                    }}
                />

                <YAxis
                    datakey="value"
                    axisLine={false}
                    tickLine={false}
                    tickCount={1}
                    tickFormatter={(number) => `${number}`}
                />

                <Tooltip content={<CustomTooltip />} />

                <CartesianGrid opacity={0.1} vertical={false} />
            </AreaChart>
        </ResponsiveContainer>
    );
}

export default Chart
