export const getDateString = (date) => {
    const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const now = new Date();
    let hoursSince  = date.getTime() - now.getTime();
    hoursSince = hoursSince / 1000 / 60 / 60;

    if (date == null || date.getTime() === 0) {
        return `Never`;
    }

    if (Math.abs(hoursSince) < 0.016) return "now";

    if (hoursSince > -24 && hoursSince < 24) {
        if (date.getDate() !== now.getDate()) {
            const day = (date.getDate() > now.getDate()) ? "Tomorrow" : "Yesterday";
            return `${day} at ${date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`
        }
        const hrs = parseInt(hoursSince.toFixed(0));
        const min = parseInt((60 * Math.abs(hoursSince - hrs)).toFixed(0));
        const hourStr = (Math.abs(hrs) === 0) ? "" : `${Math.abs(hrs)} hour${(Math.abs(hrs)>1)?"s":""} `;
        const minStr = `${min} minute${(Math.abs(min)>1)?"s":""}`;
        return (hoursSince > 0) ? `In ${hourStr}${minStr}` : `${hourStr}${minStr} ago`;
    }

    console.log(date);

    // if (hoursSince > -24 && hoursSince < 0) {
    //     const hrs = parseInt(hoursSince.toFixed(0));
    //     const min = parseInt((60 * Math.abs(hoursSince - hrs)).toFixed(0));
    //     return `${Math.abs(hrs)} hour${(Math.abs(hrs)>1)?"s":""} ${min} minutes ago`;
    // }
    //
    // if (hoursSince > 0 && hoursSince < 24) {
    //     const hrs = parseInt(hoursSince.toFixed(0));
    //     const min = parseInt((60 * Math.abs(hoursSince - hrs)).toFixed(0));
    //     return `In ${Math.abs(hrs)} hour${(Math.abs(hrs)>1)?"s":""} ${min} minutes`;
    // }

    return `${month[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
};
export const getTimeString = (date) => date.toLocaleString('en-us', { hour: 'numeric', hour12: true, minute: "2-digit", timeZoneName: "short" });

export const getCookie = (name) => {
    let cookies = {};
    document.cookie.split(';').forEach(function(el) {
        let [k,v] = el.split('=');
        cookies[k.trim()] = v;
    });
    return cookies[name];
};

export const setCookie = (name, value = "", { expires, maxAge, domain, path, secure, sameSite }) => {
    let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
    if (expires) {
        if (Object.prototype.toString.call(expires) !== '[object Date]') {
            expires = new Date(expires);
        }
        cookie += `;expires=${expires.toUTCString()}`;
    }
    if (maxAge) cookie += `;max-age=${maxAge}`;
    if (domain) cookie += `;domain=${domain}`;
    if (path) cookie += `;path=${path}`;
    if (secure && secure === true) cookie += `;secure`;
    if (sameSite) {
        sameSite = sameSite.toLowerCase();
        if (sameSite === 'strict' || sameSite === 'lax') {
            cookie += `;sameSite=${sameSite}`;
        } else {
            console.warn(`-setCookie() ${name}: sameSite had an unsupported value of ${sameSite}. Supported values are: strict, lax.`);
        }
    }
    return document.cookie = cookie;
};
