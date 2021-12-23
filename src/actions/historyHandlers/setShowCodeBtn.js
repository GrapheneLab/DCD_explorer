import React, {Fragment} from "react";
import Translate from "react-translate-component";
import Dropdown from "../../components/helpers/dropdown";
import {IteCode} from "./iteCode";

export const SetShowCodeBtn = ({data, type}) => {
    return (
        <Dropdown
            popup
            className='dropdown--operation'
            title={<Translate content='buttons.showData.show' className='text--md text--light tdu'/>}
            data={
                <Fragment>
                    <h3 className="heading">
                        {type} - {data.name ? data.name.substr(0,1).toUpperCase() + data.name.substr(1,) : 'JSON'}
                    </h3>
                    <IteCode code={data.data ? data.data: data} />
                </Fragment>
            }
        />
    );
}
