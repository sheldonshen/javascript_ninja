/**
 * Created by sheldonshen on 11/16/2016.
 */
class Student{
    fullName:string;
    //the use of public on arguments to the constructor is a shorthand
    //that allows us to automatically create properties with that name.
    constructor(public firstName,public middleInitial,public lastName){
          this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

interface Person{
    firstName:string;
    lastName:string;
}

function greeter(person:Person){
    return "Hello," + person.firstName + " " + person.lastName;
}

var user = new Student('Cong','M.',"Bird");
document.body.innerHTML=greeter(user);
