/**
 * Created by sheldonshen on 11/15/2016.
 */
function greeter(person: string){//string:type annotation
    return "Hello," + person;
}

var user = 'Cong Bird';
//var user = [0,1,2];

document.body.innerHTML = greeter(user);
//document.getElementById('inp').value=greeter(user);
//document.getElementById('inp').value = greeter(user);
