export const defaultNodesList = [
    // 'http://136.243.82.203:8888/v1',
    // 'https://api-eos.blckchnd.com/v1',
    // 'https://api10-eos.blckchnd.com/v1',
    // 'https://api2-eos.blckchnd.com/v1',
    // 'https://jungle-eos.blckchnd.com/v1',
    // 'https://node.eosflare.io/v1',
    // 'https://eos.greymass.com/v1'

    // 'https://fn.eossweden.se/v1',
    // 'http://api.hkeos.com/v1',

    'https://fork-api-1.pokerchained.com/v1'
];

export const apiUrl = 'https://api-data.eosexplorer.app/';

export const socialLink = {
    steemit: 'blockchained',
    telegram: 'EOS_RU',
    medium: 'eos.blckchnd',
    golos: 'blockchained',
    twitter: 'BLCKCHND'
};

export const defaultBreakPoint = {
    xs: 0,
    sm: 500,
    md: 900,
    lg: 1200
};

export const checkCrowdin = window.location.host.match(new RegExp('crowdin'));

export const tokensList = {
    title: 'tokensList',
    list: ['EOS', 'USD']
}; //for resource calculator
export const bytesList = {
    title: 'bytesList',
    list: ['bytes', 'KB', 'MB', 'GB']
}; //for resource calculator
export const bytesPerDayList = {
    title: 'bytesPerDayList',
    list:  ['bytes/day', 'KB/day', 'MB/day', 'GB/day']
}; //for resource calculator
export const daySecondsList = {
    title: 'daySecondsList',
    list:  ['mu/day', 'ms/day', 's/day']
}; //for resource calculator
export const secondsList = {
    title: 'secondsList',
    list:  ['mu', 'ms', 's']
}; //for resource calculator


export const defaultTableParams = {
    json: true,
    code: "eosio",
    scope: "eosio",
    table: "",
    key_type: "",
    table_key: "",
    lower_bound: "",
    upper_bound: "",
    limit: 1
};
