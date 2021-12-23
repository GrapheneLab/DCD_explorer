import React from 'react'
import Translate from "react-translate-component";

const TrxStatistic = ({data}) => (
    <div className="col-md-4">
        <div className="card transactions__card transactions__activity">
            <Translate content="transactions.transactionActivity" component="h2" className="transactions__header title" />
            <div className="activity">
                {
                    data.map((elem, index) => (
                        <div key={`${elem.name}-${index}`} className="activity__props">
                            <p className="activity__heading text--lg">
                                <Translate content={`transactions.${elem.name}.title`} />
                                <span className="num">{elem.number}</span>
                            </p>
                            <Translate content={`transactions.${elem.name}.subtitle`} className="activity__desc title" />
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
);

export default TrxStatistic;


