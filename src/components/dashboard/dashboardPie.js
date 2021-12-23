import React from "react";
import {Pie, PieChart} from "recharts";
import {ActiveShape} from "../helpers/activeShape";

export const DashboardPie = ({data}) => {
    const {content, label, classNames = '', desc} = data;
    return (
        <div className={`diagram__item ${classNames}`}>
            <div className="card">
                <div className="diagram__chart">
                    <PieChart width={180} height={180}>
                        <Pie
                            activeIndex={1}
                            activeShape={ActiveShape}
                            animationDuration={300}
                            data={content}
                            dataKey={'value'}
                            cx={85}
                            cy={85}
                            innerRadius={84}
                            outerRadius={85}
                            stroke='none'
                            fill="url(#active)"
                        />
                    </PieChart>
                    {label}
                </div>
                <div className="diagram__desc">
                    {desc}
                </div>
            </div>
        </div>
    );
};
