import React from 'react';
import Logo from "./helpers/logo";
import Translate from "react-translate-component";
import {IconReload} from "../svg";

function reload() {
    document.location.replace('/');
}

const NotConnect = () => (
    <div className="not-found">
        <Logo/>
        <Translate content="notConnect.title" component="h1" className="not-found__title"/>
        <Translate content="notConnect.subtitleFirst" className="not-found__subtitle"/>
        <button onClick={reload} className="btn--gradient">
            <Translate content={`buttons.reload`}/>
            <IconReload className="ico__reload" />
        </button>
    </div>
);

export default NotConnect
