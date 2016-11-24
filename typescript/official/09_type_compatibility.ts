/**
 * Created by sheldonshen on 11/16/2016.
 */
//介绍
interface Named{
    name:string;
}

class Person{
    name:string;
}
let p:Named;
//Ok,because of structural typing
p = new Person();
//关于可靠性的注意事项
//开始
interface Namedd{
    name:string;
}
let x: Namedd;
//y's inferred type is {name:string,location:string}
let y = {name:'Alice',location:'Seattle'};
x = y;

function greet(n:Named){
    console.log("Hello," + n.name);
}
greet(y);//ok

//比较两个函数
let x = (a: number) => 0;
let y = (b: number,s: number) => 0;
y = x;//OK
//x = y;//Error
let items = [1,2,3];
//Don't force these extra arguments
items.forEach((item,index,array) => console.log(item));
//Should be OK!
items.forEach((item)=>console.log(item));

let m = ()=>({name:"Alice"});
let n = ()=>({name:'Alice',location:'Seattle'});
m = n;
//n = m;//Error because x() lacks a location property
//类型系统强制源函数的返回值类型必须是目标函数返回值类型的子类型

//函数参数双向协变
enum EventType{
    Mouse,Keyboard
}

interface Event{
    timestamp: number;
}

interface MouseEvent extends Event{
    j : number;
    k : number
}

interface KeyEvent extends Event{
    keyCode : number;
}

function listenEven(eventType: EventType,handler: (n:Event) => void){
       /*...*/
}

//Unsound,but useful and common
listenEven(EventType.Mouse,(e:MouseEvent) => console.log(e.j + "," + e.k));
// Undesirable alternatives in presence of soundness
listenEven(EventType.Mouse,(e:Event) => console.log((<MouseEvent>e).j + "," + (<MouseEvent>e).k));
listenEven(EventType.Mouse,<(e:Event) => void>((e:MouseEvent) => console.log(e.x + ',' + e.y)));
// Still disallowed (clear error). Type safety enforced for wholly incompatible types
//listenEven(EventType.Mouse, (e:number) => console.log(e));

//可选参数及剩余参数
function invokeLater(args:any[],callback: (...args: any[]) => void){
     /* ... Invoke callback with 'args'...*/
}

// Unsound - invokeLater "might" provide any number of arguments
invokeLater([1,2],(x,y) => console.log(x + ',' + y));
// Confusing (x and y are actually required) and undiscoverable
invokeLater([1,2],(x?,y?) => console.log(x + ',' + y));

//函数重载
//枚举
enum Status {Ready,Waiting}
enum Color  {Red,Blue,Green}

let statusA = Status.Ready;
//statusA = Color.Blue;//error
//类
class Animal{
    feet: number;
    constructor(name:string,numFeet:number){}
}

class Size{
    feet: number;
    constructor(numFeet: number){}
}

let a: Animal;
let s: Size;
a =  s;//OK
s =  a;//OK
//类的私有成员
//泛型
interface Empty<T>{
}
let p: Empty<number>;
let q: Empty<string>;
p = q;//okay, y matches structure of x

interface NotEmpty<T>{
    data: T;
}
let g:NotEmpty<number>;
let t:NotEmpty<string>;
//g = t;//error, x and y are not compatible

let identity = function<T>(x:T):T{
    return;
}
let reverse = function<U>(y:U):U{
    return;
}
identity = reverse;//Okay because (x: any)=>any matches (y: any)=>any
//高级主题
//子类型与赋值
