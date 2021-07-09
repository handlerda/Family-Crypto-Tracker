//grab family id
const family = {
  name: "demo-user",
};

const users = [
  {
    email: "demo-head-household@crypfam.com",
    password: "password",
    firstName: "Family member 1 (head of household)",
    lastName: "demo user",
    phone: "01234567891",
    headOfHouseHold: true,
    demoUser: true,

    //add the family id
  },
  {
    email: "demo1-user@crypfam.com",
    password: "password",
    firstName: "Family member 2",
    lastName: "demo user",
    phone: "123456781231",
    headOfHouseHold: false,
    demoUser: true,

    //add the family id
  },
  {
    email: "demo2-user@crypfam.com",
    password: "password",
    firstName: "Family member 3",
    lastName: "demo user",
    phone: "12345678912",
    headOfHouseHold: false,
    demoUser: true,

    //add the family id
  },
];

module.exports = { family, users };
