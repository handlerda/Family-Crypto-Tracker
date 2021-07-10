//grab family id
const rn = require("random-number");
console.log(random);

function random() {
  const random = rn({
    min: -100000,
    max: 10000000,
    integer: true,
  });
  console.log(`here comes random`);
  return random;
}

const family = {
  name: `demo-family ${random()}`,
};

const users = [
  {
    email: `demo-head-household-${random()}@crypfam.com`,
    password: `${random()}`,
    firstName: "Family member 1 (head of household)",
    lastName: "demo user",
    phone: `${random()}`,
    headOfHouseHold: true,
    demoUser: true,

    //add the family id
  },
  {
    email: `demo1-user-${random()}-@crypfam.com`,
    password: `${random()}`,
    firstName: "Family member 2",
    lastName: "demo user",
    phone: `${random()}`,
    headOfHouseHold: false,
    demoUser: true,

    //add the family id
  },
  {
    email: `demo2-user-${random()}@crypfam.com`,
    password: `${random()}`,
    firstName: "Family member 3",
    lastName: "demo user",
    phone: `${random()}`,
    headOfHouseHold: false,
    demoUser: true,

    //add the family id
  },
];

module.exports = { family, users };
