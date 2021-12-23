import React from 'react';
import Translate from "react-translate-component";

const Loader = ({show}) => (
    <div className={`loader${show ? ' loader--display' : ''}`}>
        {show
            ? <div className="loader__content-wrapper">
                <div className="loader__icon">
                    <svg className="circle" width="100%" height="100%" viewBox="0 0 35 35">
                        <path fill="none" stroke="url(#loaderGradient)" strokeWidth="3" d="M17.5,2C26.1,2,33,8.9,33,17.5S26.1,33,17.5,33S2,26.1,2,17.5S8.9,2,17.5,2" transform="rotate(160.804 17.5 17.5)">
                            <animate id="anim1" begin="0; anim2.end" attributeType="CSS" attributeName="stroke-dashoffset" from="97" to="0" dur="1s" fill="freeze" />
                            <animateTransform begin="0; anim2.end" attributeType="XML" attributeName="transform" type="rotate" from="0 17.5 17.5" to="360 17.5 17.5" dur="1s" fill="freeze" />
                            <animate id="anim2" begin="anim1.end" attributeType="CSS" attributeName="stroke-dashoffset" from="0" to="97" dur="1s" fill="freeze" />
                            <animateTransform begin="anim1.end" attributeType="XML" attributeName="transform" type="rotate" from="0 17.5 17.5" to="720 17.5 17.5" dur="1s" fill="freeze" />
                        </path>
                        <defs>
                            <linearGradient xmlns="http://www.w3.org/2000/svg" id="loaderGradient" x2="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(113) scale(113 193.507) rotate(90)">
                                <stop stopColor="#715AFF"/>
                                <stop offset="1" stopColor="#4DE2D9"/>
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
                <Translate content="global.loader" component="div" className="loader__text" />
            </div>
            : ''
        }
    </div>
);

export default Loader
