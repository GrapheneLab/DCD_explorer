export const countChartSumm = (data) => {
    let result = Number(data.max) ? (Number(data.used) / Number(data.max) * 100).toFixed(2) : '100';
    if( result > 100 ) result = '>100';
    return result === 'NaN' ? 0 : result;
};
