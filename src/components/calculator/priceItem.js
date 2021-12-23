import React from "react";
import Translate from "react-translate-component";

const PriceItem = ({data}) => (
    <div className="price-item col-lg-4">
        <Translate
            content="calculator.priceItems.title"
            component="h3"
            className="price-item__title text--lg"
            with={{title: data.title}}
        />
        {/*<h3 className="price-item__title text--lg">current {data.title} price</h3>*/}
        <div className="card">
            <div className="price-item__card-top">
                <div className="price-item__icon">
                    {data.icon}
                </div>
                <div className="price-item__info">
                    <div className="text--lg"><span className="text--success">{data.eosPrice} EOS </span>{data.per}</div>
                    <div className="text--lg"><span className="text--success">~ ${data.usdPrice} USD </span>{data.per}</div>
                </div>
            </div>
            <div className="price-item__card-bottom">
                <Translate content={`calculator.priceItems.${data.title}`} component="div" className="text--sm" />
            </div>
        </div>
    </div>
);

export default PriceItem
