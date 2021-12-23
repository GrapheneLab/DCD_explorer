import React from 'react';
import Translate from "react-translate-component";
import {Link} from "react-router-dom";

const BtnLink = ({type, className}) => (
    <Link to="/" className={className}>
        <Translate content={`buttons.${type}`} />
        <svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0L4.00001 4L8 0H0Z" transform="translate(0.21582 8.18213) rotate(-90)" fill="white"/>
        </svg>
    </Link>
);

export default BtnLink;