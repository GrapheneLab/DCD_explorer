import React from 'react';
import Translate from "react-translate-component";

const CustomAxis = ({fill, x, y, width, height, index, stroke, textAnchor, verticalAnchor, payload}) => {

    const date = String(new Date(payload.value)).split(' ');

    return (
        <text height={height}
              width={width}
              x={x}
              y={y}
              stroke={stroke}
              fill={fill}
              vertical-anchor={verticalAnchor}
              textAnchor={textAnchor}
              className="recharts-text recharts-cartesian-axis-tick-value"
        >
            <Translate
                content={`graphDate.${date[1]}`}
                with={{day: date[2]}}
                component="tspan"
                offset={payload.offset}
                x={payload.coordinate}
                dy="0.71em"
            />
        </text>
    )
};

export default CustomAxis;
