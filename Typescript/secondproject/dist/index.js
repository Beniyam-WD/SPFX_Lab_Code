"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mgreeter_1 = require("./Mgreeter");
class Student {
    constructor(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}
let user = new Student("Jane", "M.", "User");
document.body.textContent = Mgreeter_1.greeter(user);
