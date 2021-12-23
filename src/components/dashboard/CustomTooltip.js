import React from 'react';
import Translate from "react-translate-component";

const customTooltip = ({label = Date.now(), payload, separator, showDate = true}) => {
    let date = '';

    if(label && showDate){
        date = String(new Date(label)).split(' ');
    }

    return (
        <div className="recharts-default-tooltip">
            {date
                ? <Translate
                    content={`graphDate.${date[1]}`}
                    with={{day: date[2]}}
                    component="p"
                    className="recharts-tooltip-label"
                />
                : <p className="recharts-tooltip-label">{label}</p>
            }
            {payload.length > 0 &&
                <ul className="recharts-tooltip-item-list">
                    {payload.map((elem, index) => (
                        <li key={index} className="recharts-tooltip-item">
                            <Translate content={`graphTooltip.${elem.name}`} className="recharts-tooltip-item-name" />
                            <span className="recharts-tooltip-item-separator">{separator}</span>
                            <span className="recharts-tooltip-item-value">{elem.value}</span>
                        </li>
                    ))}
                </ul>
            }
        </div>
    )
};

export default customTooltip;
