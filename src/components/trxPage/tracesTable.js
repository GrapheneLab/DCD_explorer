import React from 'react';
import Table from "../table/table";
import {cleanDoubles} from "../../actions/userActions";
import {Action, trxActionsDecorator} from "../../actions/tableDecoration/trxActionsDecorator";

const TracesTable = ({data}) => {

    const tableData = cleanDoubles(data).map(elem => new Action(elem.act));

    const thead = [
        {key: 'contract', title: 'contract'},
        {key: 'type', title: 'type'},
        {key: 'authorization', title: 'authorization'},
        {key: 'info', title: 'info'}
    ];

    const classNames = {
        table: 'text--grey'
    };

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

export default TracesTable;
