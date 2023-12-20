interface Cookies { [key: string]: string}

export const parseCookies = (cookiesString: string) => {
    let cookies = {} as Cookies;
    try {
        let cookieStrings = cookiesString.split(";");
        cookieStrings.forEach((cookie: string) => {
            try {
                let parsed = cookie.split("=");
                if (parsed.length >= 2) {
                    const key = parsed[0].trim();
                    const value = parsed[1].trim();
                    cookies[key] = value;
                }
            } catch (e) {}
        })
    } catch (e) {}
    return cookies;
}

export const stringifyCookies = (cookies: Cookies) => {
    let cookieString = "";
    for (let key in cookies) {
        cookieString += `${key}=${cookies[key]}; path="/"`;
    }
    return cookieString;
}