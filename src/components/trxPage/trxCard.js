import React from 'react';
import Translate from "react-translate-component";
import {IconStar} from "../../svg";

const TrxCard = ({title, num, icon}) => (
    <div className="card card--totals">
        <div className="card__ico-wrapper">
            {icon}
        </div>
        <div className="card__info-wrapper">
            <span className='title text--xs'>
                <Translate content={title} />
            </span>
            <span className='text--lg card__num'>{num}</span>
        </div>
    </div>
);

export default TrxCard;