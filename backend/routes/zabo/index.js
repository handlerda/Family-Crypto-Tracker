// zabo object
const Zabo = require("zabo-sdk-js");
// get dotenv
require("dotenv").config({ path: "../../.env" });

function zabo() {
  return Zabo.init({
    apiKey: process.env.ZABO_PUBLIC_KEY,
    secretKey: process.env.ZABO_PRIVATE_KEY,
    env: "sandbox",
  });
}

module.exports = zabo;
