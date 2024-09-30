import {request} from "./utils";

const headers = {
    "accept": "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.8",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "User-Agent": "Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.6533.64 Mobile Safari/537.36"
}

const rootEndpoint = "https://notpx.app/api/v1";

export async function usersMe(token: string, proxy: string | false = false) {
    let response = await request("GET", `${rootEndpoint}/users/me`, {
        ...headers,
        "authorization": `${token}`
    }, proxy);

    if(response.status === 401) {
        throw new Error("update token");
    }

    return response.data;
}

export async function miningStatus(token: string, proxy: string | false = false) {
    let response = await request("GET", `${rootEndpoint}/mining/status`, {
        ...headers,
        "authorization": `${token}`
    }, proxy);

    if(response.status === 401) {
        throw new Error("update token");
    }

    return response.data;
}

export async function buyList(token: string, proxy: string | false = false) {
    let response = await request("GET", `${rootEndpoint}/buy/list`, {
        ...headers,
        "authorization": `${token}`
    }, proxy);

    if(response.status === 401) {
        throw new Error("update token");
    }

    return response.data;
}

export async function miningClaim(token: string, proxy: string | false = false) {
    let response = await request("GET", `${rootEndpoint}/mining/claim`, {
        ...headers,
        "authorization": `${token}`
    }, proxy);

    if(response.status === 401) {
        throw new Error("update token");
    }

    return response.data;
}

export async function repaintStart(token: string, proxy: string | false = false, pixelId: number, newColor: string) {
    let response = await request("POST", `${rootEndpoint}/repaint/start`, {
        ...headers,
        "authorization": `${token}`
    }, proxy, JSON.stringify({pixelId, newColor}));

    if(response.status === 401) {
        throw new Error("update token");
    }

    return response.data;
}

export async function miningBoostCheckPaintReward(token: string, proxy: string | false = false) {
    let response = await request("GET", `${rootEndpoint}/mining/boost/check/paintReward`, {
        ...headers,
        "authorization": `${token}`
    }, proxy);

    if(response.status === 401) {
        throw new Error("update token");
    }

    return response.data;
}

export async function miningBoostCheckReChargeSpeed(token: string, proxy: string | false = false) {
    let response = await request("GET", `${rootEndpoint}/mining/boost/check/reChargeSpeed`, {
        ...headers,
        "authorization": `${token}`
    }, proxy);

    if(response.status === 401) {
        throw new Error("update token");
    }

    return response.data;
}

export async function miningBoostCheckEnergyLimit(token: string, proxy: string | false = false) {
    let response = await request("GET", `${rootEndpoint}/mining/boost/check/energyLimit`, {
        ...headers,
        "authorization": `${token}`
    }, proxy);

    if(response.status === 401) {
        throw new Error("update token");
    }

    return response.data;
}
