import React, {Component} from 'react';
import {Sector} from "recharts";

export const ActiveShape = ({ cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill }) => (
    <g>
        <Sector
            cx={cx}
            cy={cy}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            startAngle={startAngle}
            endAngle={endAngle}
            cornerRadius={startAngle < 3 ? 0 : 6}
            fill={fill}
        />
        <Sector
            cx={cx}
            cy={cy}
            startAngle={startAngle}
            endAngle={endAngle}
            innerRadius={outerRadius - 14}
            outerRadius={outerRadius - 6}
            cornerRadius={startAngle < 3 ? 0 : 6}
            fill={fill}
        />
    </g>
);
