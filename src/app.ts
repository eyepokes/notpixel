import {miningBoostCheckEnergyLimit, miningBoostCheckPaintReward, miningBoostCheckReChargeSpeed, miningClaim, miningStatus, repaintStart, usersMe} from "./notpixel";
import {generateRandomNumber, getRandomColor, sleep} from "./utils";
import { Telegraf } from "telegraf";


(async () => {
    /*const bot = new Telegraf("");
    const chatId = "";*/

    const tokens = [
        ""
    ];

    const proxies = [
        "" //format: protocol://username:password@host:port
    ];

    const applyBoosts = false; // true - boost account, false - not
    const useProxy = false; // true - use proxy for every account, false - not

    let jobs = [];
    let i = 0;
    for (const token of tokens) {
        if(useProxy) {
            jobs.push(job(token, proxies[i]));
        }
        else {
            jobs.push(job(token));
        }
        i++
    }

    Promise.allSettled(jobs);

    async function job(token: string, proxy: string | false = false) {
        try {
            console.log(`job() :: loading user data`);
            let userData = await usersMe(token, proxy);


            while(true) {
                console.log(`job() :: loading mining status`);
                let miningData = await miningStatus(token, proxy);
                for(let i = 1; i <= miningData.charges; i ++) {
                    await repaintStart(token, proxy, generateRandomNumber(1, 1000000), getRandomColor());
                    await sleep(generateRandomNumber(1,5));
                }
                await miningClaim(token, proxy);
                if(applyBoosts) {
                    await miningBoostCheckPaintReward(token, proxy);
                    await sleep(1);
                    await miningBoostCheckReChargeSpeed(token, proxy);
                    await sleep(1);
                    await miningBoostCheckEnergyLimit(token, proxy);
                }
                await sleep(60);
            }
        } catch (e: any) {
            if(e.message === "update token") {
                /*await bot.telegram.sendMessage(chatId, "Update Not Pixel token, exited").catch(e => {
                    console.log(e.message);
                });*/
            }
            else {
                /*await bot.telegram.sendMessage(chatId, "Not Pixel stopped, error: " + e.message).catch(e => {
                    console.log(e.message);
                });*/
            }

            console.log(e);
        }
    }
})();
