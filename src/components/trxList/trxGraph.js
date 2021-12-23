import React from 'react'
import {bytesList, defaultBreakPoint} from "../data_temp";
import {Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis} from "recharts";
import CustomTooltip from "../dashboard/CustomTooltip";
import {setMeasure} from "../../actions";

const tickFormatter = data => {

    const titles = ['k', 'mm'];
    let resultTitle = '';
    let resultNum = data;

    if(data > 1000){

        for(let i = 0; i < titles.length; i++ ){

            resultNum = Number(resultNum / 1000);
            resultTitle = titles[i];

            if(resultNum < 1000){
                break;
            }

        }
    }

    return resultNum + resultTitle;
};

const TrxGraph = ({graphData = {}, chartWidth = 250, chartHeight = 250, gradientParams = {}, animationSpeed = 30}) => {
    return (
        <div className="transactions__chart">
            <AreaChart width={chartWidth} height={chartHeight} data={graphData}>
                <defs>
                    <linearGradient id="chart2_stroke" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={gradientParams.stroke.from} stopOpacity={0.7}/>
                        <stop offset="95%" stopColor={gradientParams.stroke.to} stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="chart2_fill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={gradientParams.fill.from} stopOpacity={0.3}/>
                        <stop offset="95%" stopColor={gradientParams.fill.to} stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <XAxis dataKey="timestamp" interval={graphData.length > 12 ? Math.floor(graphData.length / 12) : 0} height={50} padding={{right: 20, left: 20}}/>
                {window.innerWidth > defaultBreakPoint.md &&
                    <YAxis orientation='left' dataKey="trxData" unit=' trx' tickFormatter={tickFormatter}/>
                }
                <CartesianGrid vertical={false} />
                <Tooltip content={<CustomTooltip showDate={false} />} className='tooltip'/>
                <Area type="monotone"
                      dataKey="trxData"
                      stroke="url(#chart2_stroke)"
                      strokeWidth={2}
                      fillOpacity={1}
                      animationDuration={animationSpeed}
                      animationEasing="linear"
                      fill="url(#chart2_fill)"
                />
            </AreaChart>
        </div>
    )
};


export default TrxGraph;