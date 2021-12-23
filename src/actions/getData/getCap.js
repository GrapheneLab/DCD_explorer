export const getCapData = async (days) =>
    await fetch(
        `https://api.coingecko.com/api/v3/coins/eos/market_chart?vs_currency=usd&days=${days}`,
        { method: 'GET' }
    )
        .then(response => response.json())
        .then(e => {
            const caps = e.market_caps,
                prices = e.prices;
            return prices.map((el, index) =>({
                timestamp: el[0],
                price: +el[1].toPrecision(3),
                caps: caps[index] ? +(caps[index][1]/1000000000).toFixed(3) : 0
            }))
        })
        .catch(e => console.log(e));
