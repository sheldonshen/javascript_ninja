/**
 * Created by shenyao on 2016/11/24.
 */
//交叉类型（Intersection Types）
//混入(mixins)
function extend<T,U>(first:T,second:U):T & U{
    let result = <T & U>{};
    for(let id in first){
        (<any>result)[id]=(<any>first)[id];
    }
    for(let id in second){
        if(!result.hasOwnProperty(id)){
            (<any>result)[id] = (<any>second)[id];
        }
    }
    return result;
}

class Person{
    constructor(public name: string){}
}

interface Loggable{
    log():void;
}

class ConsoleLogger implements Loggable{
    log(){
        //...
        console.log("log method");
    }
}

var jim = extend(new Person("Jim"),new ConsoleLogger());
let n = jim.name;
console.log(n);
jim.log();

//联合类型
/**
 * Takes a string and adds "padding" to the left.
 * If 'padding' is a string, then 'padding' is appended to the left side.
 * If 'padding' is a number, then that number of spaces is added to the left side.
 */
function padLeft(value: string,padding: any){
    if(typeof padding === 'number'){
        return Array(padding + 1).join(" ") + value;
    }
    if(typeof padding === 'string'){
        return padding + value;
    }
    //throw new Error(`Excepted string or number,got '${padding}'`);
}

console.log(padLeft('Hello World',4));//return "     Hello World"
console.log(padLeft('hello world',true));//编译时通过,运行时报错
//代替any,我们可以使用联合类型作为padding的参数
/**
 * Takes a string and adds "padding" to the left.
 * If 'padding' is a string, then 'padding' is appended to the left side.
 * If 'padding' is a number, then that number of spaces is added to the left side.
 */
function padLeftUnion(value: string,padding: number | string | boolean){

}

padLeftUnion("hello world",1);
padLeftUnion("hello world","welcome");
padLeftUnion("hello world",true);//error during compilation

interface Bird{
    fly();
    layEggs();
}

interface Fish{
    swim();
    layEggs();
}

function getSmallPet(): Fish | Bird{
    return;
}

let pet = getSmallPet();
//
//pet.layEggs();//ok
//pet.fly();//error

//类型保护与区分类型
let pet1 = getSmallPet();
//每一个成员访问都会报错
/*if(pet1.swim){
    pet1.swim();
}else if(pet1.fly){
    pet1.fly();
}*/
//为了让这段代码工作，我们要使用类型断言
if((<Fish>pet1).swim){
    (<Fish>pet1).swim();
}else if((<Bird>pet1).fly){
    (<Bird>pet1).fly();
}

//用户自定义的类型保护
//pet is Fish就是类型断言
function isFish(pet: Fish | Bird): pet is Fish{
    return (<Fish>pet).swim !== undefined;
}
//// 'swim' 和 'fly' 调用都没有问题了
if(isFish(pet)){
    pet.swim();
}else{
    pet.fly();
}

//typeof类型保护
function isNumber(x:any): x is number{
    return typeof x === "number";
}
function isString(x:any): x is string{
    return typeof x === "string";
}
function padLeftTypeOf(value: string,padding: string|number){
         if(isNumber(padding)){
             return Array(padding+1).join(" ") + value;
         }
         if(isString(padding)){
             return padding + value;
         }
         //throw new Error(`Excepted string or number,got '${padding}'`);
}
function padLeftBodyguard(value: string,padding: string|number){
    if(typeof padding === 'number'){
        return Array(padding+1).join(" ") + value;
    }
    if(typeof padding === 'string'){
        return padding + value;
    }
    //throw new Error(`Excepted string or number,got '${padding}'`);
}
//instanceof类型保护
interface Padder{
    getPaddingString(): string
}

class SpaceRepeatingPadder implements Padder{
    constructor(private numSpaces: number){ }
    getPaddingString(){
        return Array(this.numSpaces + 1).join(" ");
    }
}

class StringPadder implements Padder{
    constructor(private value: string){}
    getPaddingString(){
        return this.value;
    }
}

function getRandomPadder(){
    return Math.random()<0.5 ? new SpaceRepeatingPadder(4): new StringPadder("    ");
}

// 类型为SpaceRepeatingPadder | StringPadder
let padder = getRandomPadder();
if(padder instanceof SpaceRepeatingPadder){
    padder;//类型细化为'SpaceRepeatingPadder'
}

if(padder instanceof StringPadder){
    padder;//类型细化为'StringPadder'
}

//类型别名
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n:NameOrResolver):Name{
    if(typeof n === 'string'){
        return n;
    }else{
        return n();
    }
}
type Container<T> = { value : T};
type Tree<T> = {
    value: T;
    left: Tree<T>;
    right: Tree<T>
}

type LinkedList<T> = T & {next: LinkedList<T>};

interface Person{
    name1:  string
}

var people: LinkedList<Person>;
var s = people.name;
var s = people.next.name;
var s = people.next.next.name;
var s = people.next.next.next.name;

//type Yikes = Array<Yikes>();//error
//接口 vs. 类型别名
type Alias = {num: number};
interface Interface{
    num: number;
}
declare function aliased(arg: Alias): Alias;
declare function interfaced(arg: Interface): Interface

//字符串字面量类型
type Easing = "ease-in" | "ease-out" | "ease-in-out";
class UIElement{
    animate(dx: number,dy: number,easing: Easing){
        if(easing === 'ease-in'){
            //...
        }
        else if(easing === 'ease-out'){

        }
        else if(easing === 'ease-in-out'){

        }else{
            //error,should not pass null or undefined.
        }
    }
}

let button = new UIElement();
button.animate(0,0,"ease-in");
//button.animate(0,0,'uneasy'); // error: "uneasy" is not allowed here
//字符串字面量类型还可以用于区分函数重载
/*function createElement(tagName: "img"): HTMLImageElement;
function createElement(tagName: "input"): HTMLInputElement;
// ... more overloads ...
function createElement(tagName: string): Element {
    // ... code goes here ...
}*/

//可辨识联合（Discriminated Unions）
interface Square{
    kind: 'square';
    size: number;
}

interface Rectangle{
    kind:'rectangle';
    width:number;
    height:number;
}

interface Circle{
    kind:'circle';
    radius:number;
}

type Shape1 = Square | Rectangle | Circle;
/*function area(s: Shape){
    switch(s.kind){
        case "square": return s.size * s.size;
        case "rectangle": return s.height * s.width;
        case "circle": return Math.PI * s.radius ** 2;
    }
}*/

//完整性检查
/*type Shape = Square | Rectangle | Circle | Triangle;
function area(s: Shape) {
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.height * s.width;
        case "circle": return Math.PI * s.radius ** 2;
    }
    // should error here - we didn't handle case "triangle"
}
function area(s: Shape): number { // error: returns number | undefined
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.height * s.width;
        case "circle": return Math.PI * s.radius ** 2;
    }
}

function assertNever(x: never): never {
    throw new Error("Unexpected object: " + x);
}
function area(s: Shape) {
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.height * s.width;
        case "circle": return Math.PI * s.radius ** 2;
        default: return assertNever(s); // error here if there are missing cases
    }
}*/

//多态的this类型
class BasicCalculator{
    public constructor(protected value: number = 0){}
    public currentValue():number{
        return this.value;
    }
    public add(operand: number):this{
        this.value += operand;
        return this;
    }
    public multiply(operand: number):this{
        this.value *= operand;
        return this;
    }
    // ... other operations go here ...
}

var v = new BasicCalculator(2).multiply(5).add(1).currentValue;
console.log(v);//11

class ScientificCalculator  extends BasicCalculator{
    public constructor(value = 0){
        super(value);
    }
    public sin(){
        this.value = Math.sin(this.value);
        return this;
    }
    // ... other operations go here ...
}
var v = new ScientificCalculator(2).multiply(5).sin().add(1).currentValue;
console.log(v);//
