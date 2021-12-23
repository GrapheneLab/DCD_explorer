import React from 'react';

export const Active =
    <defs>
        <linearGradient id="active" x2="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-0.981073 1.10201) scale(18) rotate(-6.64556)">
            <stop stopColor="#4DE2D9"/>
            <stop offset="1" stopColor="#715AFF"/>
        </linearGradient>
        <linearGradient xmlns="http://www.w3.org/2000/svg" id="charts" x2="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(132.07 72.7507) scale(111) rotate(147.696)">
            <stop stopColor="#8D4DE8"/>
            <stop offset="1" stopColor="#FF2366"/>
        </linearGradient>
        <linearGradient xmlns="http://www.w3.org/2000/svg" id="grd_acc1" x2="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(113) scale(113 193.507) rotate(90)">
            <stop stopColor="#EC6080"/>
            <stop offset="1" stopColor="#FADA79"/>
        </linearGradient>
        <linearGradient xmlns="http://www.w3.org/2000/svg" id="grd_acc2" x2="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(141.085 140.915) scale(141) rotate(179.931)">
            <stop stopColor="#715AFF"/>
            <stop offset="1" stopColor="#4DE2D9"/>
        </linearGradient>
        <filter id="dropshadow" height="130%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
            <feOffset dx="2" dy="2" result="offsetblur"/>
            <feComponentTransfer>
                <feFuncA type="linear" slope="0.5"/>
            </feComponentTransfer>
            <feMerge>
                <feMergeNode/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
        </filter>
    </defs>;
