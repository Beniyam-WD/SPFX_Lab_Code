"use strict";
console.log("Hello world");

function welcomeuser(user) {
    console.log(`Hey ${user.firstname} ${user.lastname} - Welcome to SPFx training`);
    return `Hey ${user.firstname} ${user.lastname} - Welcome to SPFx training`;
}
const username = {
    firstname: "Jenkins",
    lastname: "NS"
};
welcomeuser(username);