import axios, {AxiosRequestConfig} from "axios";
import {HttpsProxyAgent} from "https-proxy-agent";
import {ProxyConfig, RequestMethod} from "./types";

export async function request(method: RequestMethod, path: string, headers: any, proxy: ProxyConfig | string | false = false, data: any | false = false, body: any | false = false, retry: boolean = true): Promise<any> {
    console.log(`${method} ${path}, ${retry}`);

    let requestOptions: AxiosRequestConfig = {
        method: method,
        url: path,
        headers,
        validateStatus: () => true,
        ...(data && {data}),
        ...(body && {body})
    };

    if(proxy) {
        requestOptions.httpsAgent = new HttpsProxyAgent(proxy as any);
    }

    return await axios.request(requestOptions).catch(async (error) => {
        console.log(error);
        console.log(`request(${method}, ${path}, ${retry}) - ${error.message}`, 2);
        if (retry) {
            await sleep(5);
            return await request(method, path, headers, proxy, data, body, false);
        }
    });
}

export async function sleep(seconds: number) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

export function generateRandomNumber(min: number, max: number): number {
    // Ensure min is less than max
    if (min > max) {
        [min, max] = [max, min];
    }

    // Generate and return the random number
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
}
