import {miningBoostCheckEnergyLimit, miningBoostCheckPaintReward, miningBoostCheckReChargeSpeed, miningClaim, miningStatus, repaintStart, usersMe} from "./notpixel";
import {generateRandomNumber, getRandomColor, sleep} from "./utils";
import { Telegraf } from "telegraf";


(async () => {
    /*const bot = new Telegraf("");
    const chatId = "";*/

    const tokens = [
        ""
    ];

    const applyBoosts = false; // true - boost account, false - not

    let jobs = [];
    for (const token of tokens) {
        jobs.push(job(token));
    }

    Promise.allSettled(jobs);

    async function job(token: string) {
        try {
            console.log(`job() :: loading user data`);
            let userData = await usersMe(token);


            while(true) {
                console.log(`job() :: loading mining status`);
                let miningData = await miningStatus(token);
                for(let i = 1; i <= miningData.charges; i ++) {
                    await repaintStart(token, generateRandomNumber(1, 1000000), getRandomColor());
                    await sleep(generateRandomNumber(1,5));
                }
                await miningClaim(token);
                if(applyBoosts) {
                    await miningBoostCheckPaintReward(token);
                    await sleep(1);
                    await miningBoostCheckReChargeSpeed(token);
                    await sleep(1);
                    await miningBoostCheckEnergyLimit(token);
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
