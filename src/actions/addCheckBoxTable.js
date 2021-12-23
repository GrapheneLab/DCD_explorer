import React from 'react';
import {store} from "../index";
import TableCheckBox from '../components/helpers/checkBoxTable';

export const addCheckBox = (type, data, fn) => {
    return data.map((el, index) => ({
        ...el,
        checkbox: <TableCheckBox index={index} fn={fn} name={el.name ? el.name : el.owner} votingData={store.getState().voting} type={type}/>
    }))
};
