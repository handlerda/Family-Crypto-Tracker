// twilio envs
require("dotenv").config({ path: "../../.env" });
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_NUMBER;

console.log(accountSid, twilioAuthToken, twilioNumber);

const client = require("twilio")(accountSid, twilioAuthToken);

async function sendTxtMsg(msg, number) {
  const message = await client.messages.create({
    body: msg,
    to: `+1${number}`,
    from: twilioNumber,
  });
  return message;
}

module.exports = sendTxtMsg;
