import {chainOperation} from "..";

export const getFullVotes = async (lowBound = '', accParams = {votingUsers: 0, fullStaked: 0, votesStaked: 0, percent: 0}) => {
    const params = {
        json: true,
        code: "eosio",
        scope: "eosio",
        table_key: "",
        lower_bound: lowBound,
        table: "voters",
        upper_bound: -1,
        limit: -1
    };

    // if(!e.data.more){
    //     return array;
    // }

    let checkResult = (e) => {

        const rows = e.data.rows;
        // console.log('--lowerBond', rows[rows.length - 1].owner);

        return accParams = rows.reduce((acc, elem) => {

            acc.fullStaked += Number(elem.staked);
            acc.votingUsers += 1;

            if(elem.producers.length > 0){
                acc.votesStaked += Number(elem.staked);
            }
            acc.percent = acc.votesStaked / acc.fullStaked * 100;
            return acc;

        }, accParams);

        // if(!e.data.more){
        //     console.log(accParams);
        //     return accParams
        // }

        // console.log(rows[rows.length - 1].owner, e.data.more)

        // return getFullVotes(rows[rows.length - 1].owner, accParams);
    };

    return chainOperation('get_table_rows', params, checkResult);
};
