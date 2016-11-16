/**
 * Created by sheldonshen on 11/16/2016.
 */

/*
* typescript interface
* */
interface Person{
    firstName:string;
    lastName :string;
}

function greeter(person:Person){
    return "Typescript," + person.firstName + ' ' + person.lastName;
}

var user = {
    firstName:'Cong',
    lastName :'Bird'
};

document.body.innerHTML=greeter(user);
