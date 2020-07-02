console.log("Hello world")
var string1:string = "string val"
let string2:string = "string val 2"
function welcomeuser(user: User): string
{
    console.log(`Hey ${user.firstname} ${user.lastname} - Welcome to SPFx training`);
    return `Hey ${user.firstname} ${user.lastname} - Welcome to SPFx training`

}
const username = {
    firstname: "Jenkins",
    lastname: "NS"
}

interface User{
    firstname: string;
    lastname: string;
}

welcomeuser(username)
