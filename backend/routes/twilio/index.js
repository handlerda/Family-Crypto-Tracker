// twilio envs
require("dotenv").config({ path: "../../.env.development" });
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_NUMBER;

const client = require("twilio")(accountSid, twilioAuthToken);

// send text msg
// ONLY US MSGS ARE SUPPORTED RN
async function sendTxtMsg(msg, number) {
  const message = await client.messages.create({
    body: msg,
    to: `+1${number}`,
    from: twilioNumber,
  });
  return message;
}

module.exports = sendTxtMsg;
