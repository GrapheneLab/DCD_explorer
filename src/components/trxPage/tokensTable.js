import React from 'react';
import Table from "../table/table";
import {cleanDoubles} from "../../actions/userActions";
import {setInternalLink} from "../../actions/tableDecoration/wrappers";

function TokenItem({from, to, quantity, memo}){
    this.from = from;
    this.to = to;
    this.quantity = quantity;
    this.memo = memo;
}

const tokensDecorator = {
    from: ({from}) => setInternalLink('/accounts/', from),
    to: ({to}) => setInternalLink('/accounts/', to),
    quantity: ({quantity}) => <span className='text--success'>{quantity}</span>,
};

const TokensTable = ({data}) => {

    const tableData = cleanDoubles(
        data.filter(elem => elem.act.name === 'transfer')
    ).map(elem => new TokenItem(elem.act.data));

    const thead = [
        {key: 'from', title: 'from'},
        {key: 'to', title: 'to'},
        {key: 'quantity', title: 'quantity'},
        {key: 'memo', title: 'memo'}
    ];

    const classNames = {
        table: 'text--grey table--transfers'
    };

    return (
        <Table
            head={thead}
            classNames={classNames}
            data={tableData}
            onEmpty="trx.tokensTable"
            decorate={tokensDecorator}
        />
    )
};

export default TokensTable;
