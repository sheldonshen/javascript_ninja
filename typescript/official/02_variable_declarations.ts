/**
 * Created by sheldonshen on 11/16/2016.
 */
//var 声明
/*var a = 10;
function f(){
    var message = "hello,world";
    return message;
}

function func(){
    var a = 10;
    return function g(){
        var b = a + 1;
        return b;
    };
}

var g = func();
console.log(g());//return 11;*/

function f(){
    var a = 1;
    a = 2;
    var b = g();
    a = 3;
    return b;
    function g(){
        return a;
    }
}
console.log(f());//2

//作用域规则
function func(shouldInitialize:boolean){
    if(shouldInitialize){
        var x = 10;
    }
    return x;
}
console.log(func(true));//10
console.log(func(false));//undefined

function sumMatrix(matrix:number[][]){
    var sum = 0;
    for(var i=0; i< matrix.length;i++){
        var currentRow = matrix[i];
        for(var i=0; i < currentRow.length; i++){
            sum += currentRow[i];
        }
    }
    return sum;
}

//变量获取怪异之处
/*for(var i=0; i<10; i++){
    setTimeout(function(){
        console.log(i);
    },100 * i);
}*/
//IIFE
for(var i=0; i<10; i++){
    (function(i){
        setTimeout(function(){
            console.log(i);
        },100 * i);
    })(i);
}

//let 声明
let hello = "Hello";

//块作用域
function funcLet(input:boolean){
    let a = 100;
    if(input){
      ///let b = a + 1;//still ok to reference 'a'
      var b = a + 1;
      return b;
    }
    return b;//Error: 'b' doesn't exist here
    //return "abc";
}
console.log("flag="+funcLet(false));

try{
   throw "oh,no";
}catch(e){
   console.log("oh,well");
}
//// Error: 'e' doesn't exist here
//console.log("error="+e);

//a++;
/*let a;
a++;*/

function foo(){
    //okay to capture 'a'
    return a;
}
// 不能在'a'被声明前调用'foo'
// 运行时应该抛出错误
console.log("let="+foo());//时间死区
let a;

//重定义及屏蔽
function duplicateVar(x){
    var x;
    var x;
    if(true){
        var x;
    }
}

let m = 10;
//let m = 20; 错误，不能在1个作用域里多次声明`m`

function flet(x){
    //let x = 100;// error: interferes with parameter declaration
}

function g(){
    //let x = 100;
    var x = 100;//// error: can't have both declarations of 'x'
}

function func_test(condition,x){
    if(condition){
        let x = 100;
        return x;
    }
    return x;
}
console.log(func_test(false,0));//reture 0
console.log(func_test(true,100));//return 100

function sumMatrix1(matrix: number[][]) {
    let sum = 0;
    for (let i = 0; i < matrix.length; i++) {
        var currentRow = matrix[i];
        for (let i = 0; i < currentRow.length; i++) {
            sum += currentRow[i];
        }
    }

    return sum;
}

//块级作用域变量的获取
function theCityThatAlwaysSleeps(){
    let getCity;
    if(true){
        let city = "Seattle";
        getCity=function(){
            return city;
        };
    }
    return getCity();
}

for(let i = 0; i < 10; i++){
    setTimeout(function(){
        console.log("let="+i);
    },100 * i);
}


//const 声明
const numLivesForCat = 9;
const kitty = {
    name:"cong",
    numLives:numLivesForCat
};

//Error
/*kitty={
    name:"liu",
    numLives:numLivesForCat
};*/

kitty.name="sheldons";
kitty.name="shen";
kitty.name="test";
kitty.numLives--;

//let vs. const

//解构

//解构数组
/*let input = [1,2];
let [first,second]=input;
console.log("first="+first);
console.log("second="+second);
//swap variables
[first,second]=[second,first];
console.log("first="+first);
console.log("second="+second);*/

/*let [first,...rest]=[1,2,3,4];
console.log("first="+first);
console.log("rest="+rest);*/

let[first]=[1,2,3,4];
console.log("first="+first);//1

let[,second,,fourth]=[1,2,3,4];

//对象解构
/*let o = {
    a:"foo",
    b:12,
    c:"bar"
};

let {a,b}=o;
({a, b} = {a: "baz", b: 101});*/

//属性重命名
//let {a:newName1,b:newName2}=o;

//默认值
function keepWholeObject(wholeObject:{a:string,b?: number}){
       let {a,b = 1001} = wholeObject;
}

//函数声明
type C = {a:string,b?:number};
function funcD({a,b}:C):void{

}

function funcAnother({a,b}={a:"",b:0}):void{

}
f(); // ok, default to {a: "", b: 0}
function fc({a, b = 0} = {a: ""}): void {
    // ...
}
fc({a: "yes"}) // ok, default b = 0
fc() // ok, default to {a: ""}, which then defaults b = 0
//fc({}) // error, 'a' is required if you supply an argument
