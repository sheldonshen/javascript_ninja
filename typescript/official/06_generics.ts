/**
 * Created by sheldonshen on 11/16/2016.
 */
//介绍
//泛型之Hello World
function identity1(arg:number):number{
    return arg;
}
function identity2(arg:any):any{
    return arg;
}
//T泛型
function identity3<T>(arg:T):T{
    return arg;
}
let output1 = identity3<string>("mystring");
let output2 = identity3("mystringinfer");//类型推断

//使用泛型变量
function loggingIndentity1<T>(arg:T):T{
    //console.log(arg.length);//Error: T doesn't have .length
    return arg;
}
function loggingIndentity2<T>(arg:T[]):T[]{
    console.log(arg.length);//Array has a .length, so no more error
    return arg;
}
function loggingIndentity3<T>(arg:Array<T>):Array<T>{
    console.log(arg.length);
    return arg;
}
//泛型类型
function identity<T>(arg:T):T{
    return arg;
}
//let myIdentity:<T>(arg:T)=>T = identity;
//let myIdentity:<U>(arg:U)=>U = identity;
/*let myIdentity:{<T>(arg:T):T} = identity;

interface GenericIdentityFn{
    <T>(arg:T):T;
}
function identityOther<T>(arg:T):T{
    return arg;
}
let mmIdentity: GenericIdentityFn = identityOther;*/

interface GenericIdentityFn<T> {
    (arg: T): T;
}

function identityOther<T>(arg: T): T {
    return arg;
}

let mmIdentity: GenericIdentityFn<number> = identityOther;

//泛型类
class GenericNumber<T>{
    zeroValue:T;
    add:(x:T,y:T)=> T;
}
let genericNumber = new GenericNumber<number>();
genericNumber.zeroValue = 0;
genericNumber.add = function(x,y){
    return x + y;
};

let mygenericNumber = new GenericNumber<string>();
mygenericNumber.zeroValue = "0";
mygenericNumber.add = function(x,y){
    return x + y;
};
console.log(mygenericNumber.add(mygenericNumber.zeroValue,"test"));

//泛型约束
interface Lengthwise{
    length:number;
}
function loggingIndentityT<T extends Lengthwise>(arg: T):T{
    console.log(arg.length);//泛型约束,// Now we know it has a .length property, so no more error
    return arg;
}
loggingIndentityT([1,2,3]);//ok
loggingIndentityT({length:10,value:3});
//loggingIndentityT(3);// Error, number doesn't have a .length property

//在泛型约束中使用类型参数
function copyFields<T extends U,U>(target:T,source:U):T{
    for(let id in source){
        target[id] = source[id];
    }
    return target;
}

let x = {a:1,b:2,c:3,d:4};
copyFields(x,{b:10,d:20});
//copyFields(x, { Q: 90 });  // error: property 'Q' isn't declared in 'x'.

//在泛型里使用类类型
function create<T>(c:{new():T;}){
    return new c();
}

class Beekeeper{
    hasMask:boolean;
}

class ZooKeeper{
    nametag:string;
}

class Animal{
    numLegs:number;
}

class Bee extends Animal{
    keeper:Beekeeper;
}

class Lion extends Animal{
    keeper:ZooKeeper;
}

function findKeeper<A extends Animal, K> (a: {new(): A;
    prototype: {keeper: K}}): K {

    return a.prototype.keeper;
}

findKeeper(Lion).nametag;  // typechecks!
