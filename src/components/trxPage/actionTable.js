import React from 'react';
import Table from "../table/table";
import {trxActionsDecorator} from "../../actions/tableDecoration/";
import {Action} from "../../actions/tableDecoration";

const ActionTable = ({data}) => {

    const thead = [
        {key: 'contract', title: 'contract'},
        {key: 'type', title: 'type'},
        {key: 'authorization', title: 'authorization'},
        {key: 'info', title: 'info'}
    ];

    const classNames = {
        table: 'text--grey'
    };

    const tableData = data.map(elem => new Action(elem));

    return (
        <Table
            head={thead}
            classNames={classNames}
            data={tableData}
            onEmpty="trx.actionsTable"
            decorate={trxActionsDecorator}
        />
    )
};

export default ActionTable;
