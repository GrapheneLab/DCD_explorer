import {formTableParams} from "../index";
import {chainOperation} from "../configRequests";

const getTopBid = async (lastBid = '', array = []) => {

    const topBidsTableParams = formTableParams({table: 'namebids', lower_bound: lastBid, key_type: 'name', limit: 1000});

    let checkResult = (e) => {

        let rows = e.rows;

        if(lastBid){
            rows = rows.slice(1,);
        }

        const tempArr = array.concat(rows);

        if(!e.more || !rows.length || !rows[rows.length - 1].newname) return tempArr;

        return getTopBid(rows[rows.length - 1].newname, tempArr);
    };

    return await chainOperation('get_table_rows', topBidsTableParams, checkResult);
};

export const getBids = async () => await getTopBid().then(e => e
    .sort((a, b) => b.high_bid - a.high_bid)
);
