import React from 'react';
import Translate from "react-translate-component";
import {Link} from "react-router-dom";
import {IconBlock} from "../../svg";
import {addNumSpaces} from "../../actions";

export const TrxBlock = ({block, blockTime, expireTime}) => {
    const scales = [
        {title: 'blockDate', value: blockTime},
        {title: 'blockExp', value: expireTime},
    ];

    return (
        <div className="card personal__card personal__balance">
            <div className="total">
                            <span className="total__ico">
                                <IconBlock />
                            </span>
                <p className="total__value">
                    <Translate className="title" content="trxPage.blockNum" />
                    {block
                        ? <Link to={`/block/${block}`} className='switch-value__text'>{addNumSpaces(block)}</Link>
                        : <Translate content='trxPage.wait'/>
                    }
                </p>
            </div>
            <div className="scales">
                {scales.map(el =>
                    <div key={el.title} className="scales__item text--md">
                        <Translate content={`trxPage.${el.title}`} component="p" className='scales__title title text--sm' />
                        {el.value}
                    </div>
                )}
            </div>
        </div>
    );
}
