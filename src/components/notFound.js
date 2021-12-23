import React from 'react';
import Logo from "./helpers/logo";
import Translate from "react-translate-component";
import BtnLink from "./helpers/btnLink";

const NotFound = () => (
    <div className="not-found">
        <Logo />
        <Translate content="notFound.title" component="h1" className="not-found__title" />
        <Translate content="notFound.subtitleFirst" className="not-found__subtitle" />
        <Translate content="notFound.subtitleSecond" className="not-found__subtitle" />
        <BtnLink type="toDashboard" className="btn--gradient" />
    </div>
);

export default NotFound
