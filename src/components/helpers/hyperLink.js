import React from 'react';
import {scrollToElem} from "../../actions/";

const HyperLink = ({id, children}) => (
    <a className="link--hyperlink" href={`#${id}`} onClick={e => scrollToElem(e)}>{children}</a>
);

export default HyperLink
