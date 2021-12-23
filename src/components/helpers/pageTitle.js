import React from 'react';
import Translate from "react-translate-component";

const PageTitle = ({pageName}) => <Translate content={`${pageName}.title`} component="h2" className="heading" />;

export default PageTitle;