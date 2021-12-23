import React from 'react';

export const IconAccounts = ({className, stroke, defs}) => {
    return (
        <svg className={className} width="20" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M16 6V4C16 2.93913 15.5786 1.92172 14.8284 1.17157C14.0783 0.421428 13.0609 0 12 0H4C2.93913 0 1.92172 0.421428 1.17157 1.17157C0.421427 1.92172 0 2.93913 0 4V6"
                transform="translate(1 13)" stroke='#525580' strokeWidth="2" strokeLinecap="round"
                strokeLinejoin="round"/>
            <path d="M4 8C6.20914 8 8 6.20914 8 4C8 1.79086 6.20914 0 4 0C1.79086 0 0 1.79086 0 4C0 6.20914 1.79086 8 4 8Z"
                  transform="translate(5 1)" stroke='#525580' strokeWidth="2" strokeLinecap="round"
                  strokeLinejoin="round"/>
            <path d="M3 5.87V3.87C2.99934 2.98373 2.70436 2.12277 2.16137 1.42231C1.61838 0.721857 0.85813 0.221568 0 0"
                  transform="translate(20 13.1299)" stroke='#525580' strokeWidth="2" strokeLinecap="round"
                  strokeLinejoin="round"/>
            <path
                d="M0 0C0.860415 0.220301 1.62304 0.720701 2.16764 1.42231C2.71224 2.12392 3.00784 2.98683 3.00784 3.875C3.00784 4.76317 2.71224 5.62608 2.16764 6.32769C1.62304 7.0293 0.860415 7.5297 0 7.75"
                transform="translate(16 1.12988)" stroke='#525580' strokeWidth="2" strokeLinecap="round"
                strokeLinejoin="round"/>
            {defs}
        </svg>
    )
};
