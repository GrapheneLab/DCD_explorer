export const getClaimRewards = (arr) => {
    const arrKeys = ['eosio.bpay', 'eosio.vpay'];

    return arr.reduce((acc, next) => {
        let funds = next.action_trace.inline_traces
            .reduce((accum, next) => {
                let action = next.act.data,
                    sum = Number(action.quantity.split(' ')[0]);

                return arrKeys.includes(action.from)
                    ? accum + sum
                    : accum
            }, 0);

        return acc + funds;
    }, 0)
};
