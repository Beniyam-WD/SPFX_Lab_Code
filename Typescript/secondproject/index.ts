import {greeter} from './Mgreeter'

class Student {
    fullName: string;
    constructor(public firstName: string, public middleInitial: string, public lastName: string) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

let user = new Student("Jane", "M.", "User");

document.body.textContent = greeter(user);