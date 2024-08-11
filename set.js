const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0doaGVmUnhJSFFUTU92emIySEpLT0xhc3k5TlRrdENDNzBqMXJaUlRGND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid2lld1FJMFNhT0VYMVhJNmtBaDBWL3VubTFlbHpDTDJORFFKa09UVWVpRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnR0R6NCtOVDdMdjgzNi9PODQ5a2htY2ttTDVVNFF3bGkvZTRVNWNSeG5vPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI1NnpTbVhvLzBBQ1ZkVmp4YWlYZUd5ZWxBdk9PMDBxR0NBRkdtYUNMMXlNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFLT1FtUFpJVnNhVVF0Wm5wTGMyd3dQcEdVdlZ0bE5DLzlicmJyNUtiRk09In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndJd3VZTjhsTXA4d3k3U3NGWGlaQmc4Zm8wRFZwTGxiOWNUZXd3eWgzUzg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUIwL0MySlVhMWVUOWcxM0xrZkU5U1VETnFabkhoandqWDhoMFZvelltRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicUI2K0FsS1hscFhTRXRNQ24rNm5QK1FWRWdFWCtGOHlpSGFrZ1NudHpqVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlhJRE95TVZaRXkzWE5YeFo3a25MdkNhUTRkckZlQXZpaVYzVUpLaTd3ZWdNMG1ZVmd5QWhhWXJVWHM4K1BKYjBqK0YxTndYWStZOEhvSitQSG1ZZkNRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTg5LCJhZHZTZWNyZXRLZXkiOiJLMUllMWxhSGxicC90VEp5Z1F4N0RkSFJRa2V3cDRDWGVkM2t2UWkyNHFBPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjkxODkzMDM1ODQ1MkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI2QjkyOEUxNkMzMzE0OERGQTM3NTNCOEY4QTZFREZBMCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzIzMzY3NTc1fSx7ImtleSI6eyJyZW1vdGVKaWQiOiI5MTg5MzAzNTg0NTJAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiN0JDQjNEMjcxREY4NzBDREUyMTVGNzAwREZBN0VDMzUifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyMzM2NzU3NX1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiaTFyd1p5NHNSdGV2VHAwSy1uSU9JUSIsInBob25lSWQiOiIyMzZiZTEwZS1lZjJmLTRmYzItYTQ3ZC1iNWQzYTUyM2NiNjgiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZm5TWTZFaTR4MFFGMmpyTnZkTXJISlE1b0dvPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVXS2Z1akVjeWtvSWZZRm9maXViaHhvVG83bz0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJTOUoxWjJIWiIsIm1lIjp7ImlkIjoiOTE4OTMwMzU4NDUyOjM4QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IvCdlYTwnZWjXG5cblxuXG7wnZWLXG5cblxu8J2VoFxuXG5cbvCdlZlcblxuXG7wnZWaXG5cblxu8J2VlSJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTTdqMHZZQkVJZUI0clVHR0FJZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoibGYwSHhpclpmNHdYTDBNOWFMU0Z1Nzg2S0lqZ21idW1TTEJhTmgrWE93ND0iLCJhY2NvdW50U2lnbmF0dXJlIjoibWdKc2pCUFNMNGFOUUY1NUU0RFNDaGNkalBFMitmVCthaXdFbnBLY2hVd1BEM2xKZTZyUnh1b2FiUysyU0plc3o4eHVDM0JiMVNYMi9kMnZwb0ZQQlE9PSIsImRldmljZVNpZ25hdHVyZSI6ImUrZ1YvY3lQQlh3SFdDNDZPM2hFeEJFU2NHY1YyZmc4VTlZaUlIQm5UNnF1UkNTWFZYY2JBN1c0b2RUbmcrVGFIcFhRc0oxMUpISTMxR0hwWjdXNUF3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTE4OTMwMzU4NDUyOjM4QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlpYOUI4WXEyWCtNRnk5RFBXaTBoYnUvT2lpSTRKbTdwa2l3V2pZZmx6c08ifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjMzNjc1NzIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQ0RZIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "𝕄𝕣    𝕋   𝕠   𝕙   𝕚   𝕕",
    NUMERO_OWNER : process.env.OWNER_NUM || "918930358452",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'TOHID KHAN',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/042cd0b6121a7923fd5d2.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa" : "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
