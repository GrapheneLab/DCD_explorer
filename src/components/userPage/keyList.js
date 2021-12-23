import React, {Fragment} from 'react';
import Translate from "react-translate-component";
import Table from "../table/table";

export const KeyList = ({data}) => {
    return (
        <Fragment>
            <Translate content="account.permission" component="h2" className='col-md-12 heading'/>
            <Table
                classNames={{table: 'permission__table'}}
                head={[
                    {key: 'permName', title: 'name'},
                    {key: 'parent', title: 'parent'},
                    {key: 'threshold', title: 'threshold'},
                    {key: 'keyAcc', title: 'keyAcc'}
                ]}
                data={data}
            />
        </Fragment>
    );
};
