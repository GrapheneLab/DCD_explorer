export const digitalWatch = async (prop) => {
    const s = 1000,
        m = 60 * s,
        h = 60 * m;

    const date = (72 * h) - (new Date().getTime() - new Date(prop).getTime());

    if(date > 0){
        let hours = Math.floor(date / h),
            minutes = Math.floor((date % h) / m),
            seconds = Math.floor((date % m) / s);

        if (hours < 10) hours = "0" + hours;
        if (minutes < 10) minutes = "0" + minutes;
        if (seconds < 10) seconds = "0" + seconds;

        return {
            hours, minutes, seconds
        }
    }
};
