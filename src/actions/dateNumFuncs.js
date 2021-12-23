const lang = localStorage.getItem('language');

const defaultOptions = {
    hour12: false,
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
};

export const dateToLocal = (rawDate, options = defaultOptions) => {
    rawDate = !String(rawDate).includes('T') && isNaN(rawDate) ? rawDate.split(' ').join('T') : rawDate;

    let date = new Date(rawDate);

    const formatter = new Intl.DateTimeFormat(lang === 'RU' ? 'ru-RU' : 'en-EN', options);

    return formatter.format(date);
};

export const addNumSpaces = (num) => {
    let result = String(num).split('.');

    result[0] = Number(result[0]).toLocaleString('RU-ru');

    return result.join('.');
};

export const setFixedNum = (num, toSlice = 4) => {
    if(!isNaN(num)) num = num.length !== 0 ? Number(num) : 0;
    return Number((num).toFixed(toSlice));
};

export const setDefaultNumber = (num, toSlice = 4) => addNumSpaces(setFixedNum(num, toSlice));

