import React from 'react';
import TrxGraphList from "./trxGraphList";
import TrxListTable from "./trxListTable";

const Transactions = () => (
    <section className='container transactions__container'>
        <TrxGraphList />
        <TrxListTable />
    </section>
);

export default Transactions;
