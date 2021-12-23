import React, {Fragment} from 'react';
import {ActiveShape} from "../helpers/activeShape";
import {Pie, PieChart} from "recharts";
import Translate from "react-translate-component";
import {setMeasure} from "../../actions/formatted/setMeasure";
import {IconInfinity} from "../../svg";
import Dropdown from "../helpers/dropdown";
import {countChartSumm, setFixedNum} from "../../actions";


const ResourcePieChart = ({paramName, data, measure}) => {

    let {max, used, available, total_weight, stacked} = data;

    max = max >= 0 ? max : -1;
    used = used >= 0 ? used : -1;
    available = available >= 0 ? available : -1;

    let infinite = false,
        totalWeight = 0,
        stackedSymbol = 'EOS',
        viewDelegate = false,
        param = available > -1 ? setMeasure(data.available, measure) : <span>unlimited</span>,
        titleValue = <Translate content="account.available" className="title diagram__info" param={param}/>;

    if(total_weight){
        let splittedData = total_weight.split(' ');
        totalWeight = setFixedNum(splittedData[0]);
        stackedSymbol = splittedData[1];

        if(totalWeight === 0) max = 100;
    }

    const usedToMax = Number(used) / Number(max) * 100;

    let chartAvaliable = 0,
        chartUsage = 0;

    if(usedToMax <= 0.5){
        chartAvaliable = 100;
        chartUsage = 0;
    } else if(usedToMax < 3){
        chartAvaliable = 97;
        chartUsage = 3;
    } else {
        chartAvaliable = Number(available);
        chartUsage = Number(used);
    }

    if(available < 0 || used < 0 || max < 0){
        infinite = true;
        chartAvaliable = 0;
        chartUsage = 100;
    }


    if(stacked){
        viewDelegate = [
            {content: 'selfDelegated', number: <span className="value">{stacked.self_delegated}</span>},
            {content: 'delegatedFrom', number: <span className="value">{stacked.delegated_from}</span>},
            {content: 'delegatedTo', number: <span className="value">{stacked.delegated_to}</span>}
        ];

        let delegateList = stacked.delegatorsList.length ? <ul className="diagram__desc">{stacked.delegatorsList}</ul> : '';

        titleValue = <Dropdown
            data={
                <Fragment>
                    <ul className="diagram__desc">
                        {viewDelegate.map(el =>
                            <Translate key={el.content} content={`account.${el.content}`} component="li" className="title"
                                with={{ number: el.number, symbol: stackedSymbol }}
                            />
                        )}
                    </ul>
                    {delegateList}
                </Fragment>
            }
            title={<Translate content="account.weight" className="diagram__info title" with={{weight: totalWeight, symbol: stackedSymbol}} />}
        />
    }

    const unlim = <span className="value">unlimited</span>;

    const viewDesc = [
        {content: 'available', param: available > -1 ? setMeasure(available, measure) : unlim},
        {content: 'used', param: used > -1 ? setMeasure(used, measure) : unlim},
        {content: 'limit', param: max > -1 ? setMeasure(max, measure) : unlim},
    ];

    let percent = <IconInfinity width="40%" />;
    let graphColor = "url(#active)";

    if(!infinite){
        percent = countChartSumm(data) + '%';
        graphColor = percent === '>100%' ? "rgb(244, 70, 110)" : "url(#active)";
    }

    return (
        <div className="card personal__diagram">
            <div className="diagram__header">
                <h3 className="diagram__title">
                    {paramName}
                </h3>
                {!infinite
                    ? titleValue
                    : <span className="title diagram__info">unlimited</span>
                }
            </div>
            <div className="diagram__content">
                <div className="diagram__chart">
                    <PieChart width={120} height={120}>
                        <Pie
                            activeIndex={1}
                            activeShape={ActiveShape}
                            animationDuration={800}
                            data={[
                                {name: 'Available', value: chartAvaliable},
                                {name: 'Usage', value: chartUsage}
                            ]}
                            dataKey={'value'}
                            cx={55}
                            cy={55}
                            innerRadius={54}
                            outerRadius={55}
                            stroke={'none'}
                            fill={graphColor}
                        />
                    </PieChart>
                    <span className="diagram__label text--lg">
                        {percent}
                    </span>
                </div>
                <ul className="diagram__desc">
                    {viewDesc.map(el => <Translate key={el.content} content={`account.${el.content}`} with={{ param: el.param }} component='li' className="title" /> )}
                </ul>
            </div>
        </div>
    )
};

export default ResourcePieChart;
