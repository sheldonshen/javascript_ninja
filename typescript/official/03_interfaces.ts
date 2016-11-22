/**
 * Created by shenyao on 2016/11/22.
 */
//介绍
//接口初探
/*function printLabel(labelledObj:{label:string}){
    console.log(labelledObj.label);
}
let myObj = {size:10,label:"size 10 Object"};
printLabel(myObj);*/

interface LabelledValue{//接口
    lable:string//必要属性
}

function printLabel(labelledObj:LabelledValue){//接口类型
    console.log(labelledObj.lable);
}

let myObj = {size:10,lable:"Cong Size 10 Object"};
printLabel(myObj);
//它代表了有一个label属性且类型为string的对象

//可选属性(option bag)
/*interface SquareConfig{
    color?:string;
    width?:number;//带有可选属性的接口与普通的接口定义差不多，只是在可选属性名字定义的后面加一个?符号
}

function createSquare(config:SquareConfig):{color: string; area: number}{
    let newSuqare = {color:"white",area:100};
    if(config.color){
        newSuqare.color = config.color;
    }
    if(config.width){
        newSuqare.area = config.width * config.width;
    }
    return newSuqare;
}

let mySquare = createSquare({color:"black"});
console.log(mySquare);//{color: "black", area: 100}
let mySquare1 = createSquare({color:"red",width:100});
console.log(mySquare1);*/


//可选属性的好处之一是可以对可能存在的属性进行预定义，好处之二是可以捕获引用了不存在的属性时的错误
interface SquareConfig{
    color?:string;
    width?:number;
}

function createSquare(config:SquareConfig):{color:string,area:number}{
    let newSquare = {color:"white",area:100};
    if(config.color){
        //// Error: Property 'collor' does not exist on type 'SquareConfig'
        //newSquare.color = config.collor;//Type-checker can catch the mistyped name here
        newSquare.color = config.color;
    }
    if(config.width){
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}

let mySquare = createSquare({color:"black"});

//只读属性
interface Point{
     readonly x:number;
     readonly y:number;
}
let p1: Point = {x:10,y:20};
console.log(p1.x);
console.log(p1.y);
p1.x = 5;//error

//ReadonlyArray<T>类型,与Array<T>,它与Array<T>相似,只是把可变方法去掉,
//因此可以确保数组被创建后再也不能被修改
let a: number[] = [1,2,3,4];
let ro : ReadonlyArray<number> = a;
//alert(a);
//alert(ro);
ro[0]=12;//error
ro.push(5);//error
ro.length = 100;//error
a = ro;//error
a = ro as number[];//使用类型断言重写,ok

//readonly vs const
//变量使用const
//属性使用readonly

//额外的属性检查
interface SquareConfig{
    color?:string;
    width?:number;
}
function createSquare(config:SquareConfig):{color:string,area:number}{
    //return {};
}

//函数类型
interface SearchFunc{
    (source:string,subString:string):boolean;
}
let mySearch:SearchFunc;
mySearch = function(src:string,sub:string){
    let result = src.search(sub);
    if(result === -1){
        return false;
    }else{
        return true;
    }
};

//可索引的类型
//这个索引签名表示了当用number去索引StringArray时会得到string类型的返回值。
interface StringArray{
    [index:number]:string;
}
let myArray: StringArray;
myArray=["Bob","Freed"];
let myStr = myArray[0];
console.log(myStr);

class Animal{
    name:string;
}
class Dog extends Animal{
    breed:string;
}

//Error: indexing with a 'string' will sometimes get you a Dog!
/*interface NotOkay{
    [x:number]:Animal;
    [x:string]:Dog;
}*/
interface NumberDictionary{
    [index:string]:number;
    length:number;//// Error: indexing with a 'string' will sometimes get you a Dog!
    //name:string//// 错误，`name`的类型不是索引类型的子类型
}
/*interface  ReadonlyStringArray{
    readonly [index:number]:string;
}
let myarray : ReadonlyStringArray = ["Alice","Bob"];
myArray[2]="CongBird";//error,你不能设置myArray[2]，因为索引签名是只读的。*/


//类类型
//实现接口
/*interface ClockInterface{
    currentDate:Date;
    setTime(d:Date);
}*/

/*class Clock implements ClockInterface{
    currentDate:Date;
    setTime(d:Date){
        this.currentDate = d;
    }
    constructor(h:number,m:number){}
}*/
//接口描述了类的公共部分，而不是公共和私有两部分。 它不会帮你检查类是否具有某些私有成员

//类静态部分与实例部分的区别
/*interface ClockConstructor{
    new (hour: number,minute:number);
}

class Clock implements ClockConstructor{
    currentTime:date;
    //constructor(h:number,m:number);
}*/
interface ClockConstructor{
    new (hour: number,minute: number):ClockInterface;
}
interface ClockInterface{
    tick();
}

function createClock(ctor:ClockConstructor,hour:number,minute:number):ClockInterface{
    return new ctor(hour,minute);
}

class DigitalClock implements ClockInterface{
    constructor(h:number,m:number){}
    tick(){
        console.log("beep beep");
    }
}

class AnalogClock implements ClockInterface{
    constructor(h:number,m:number){}
    tick(){
        console.log("tick tock");
    }
}

var digital = createClock(DigitalClock,12,17);
var analog  = createClock(AnalogClock,7,32);

//扩展接口

//混合类型

//接口继承类

//https://zhongsp.gitbooks.io/typescript-handbook/content/doc/handbook/Interfaces.html
