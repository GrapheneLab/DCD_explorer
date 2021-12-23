import React, {Fragment} from 'react';
import Translate from "react-translate-component";
import {bytesList, bytesPerDayList, daySecondsList} from "../data_temp";
import ResourcePieChart from "./resourcePieChart";

export const AccountResource = ({data}) => {

    const {ram, net, cpu} = data;

    const arrResource = [
        {title: 'RAM', data: ram, measure: { titles: bytesList, divider: 1024 } },
        {title: 'CPU', data: cpu, measure: { titles: daySecondsList, divider: 1000 } },
        {title: 'NET', data: net, measure: { titles: bytesPerDayList, divider: 1024 } },
    ];

    return (
        <Fragment>
            <Translate content="account.resource" component="h2" className='col-md-12 heading'/>
            {arrResource.map(el =>
                <div className="col-md-4" key={el.title}>
                    <ResourcePieChart
                        paramName={el.title}
                        data={el.data}
                        measure={el.measure}
                    />
                </div>
            )}
        </Fragment>
    );
};
