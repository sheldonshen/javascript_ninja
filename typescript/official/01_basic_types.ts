/*
* typescript basic types*
* */

//Boolean
let isDone: boolean = true;
console.log(isDone);

//Number
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0xf00d;
let octal: number = 0xf00d;
console.log(decimal);
console.log(hex);
console.log(binary);
console.log(octal);

//String
let color:string = 'blue';
color='red';
console.log(color);

//template strings
let fullName:string = `Bob Bobbington`;
let age:number = 37;
let sentence:string = `hello,my name is ${fullName}.
I'll be ${age+1} years old next month`;
console.log(fullName);
console.log(age);
console.log(sentence);

//Array
let list: number[] = [1,2,3];
let numbers:Array<number> = [1,2,3];
console.log(list);
console.log(numbers);

//Tuple
//Declare a tuple type
let x:[string,number];
//Initialize it
x = ['hello',10];//OK
//x = [10,'hello'];//Error;
console.log(x);
console.log(x[0].substr(1));//OK
//console.log(x[1].substr(1));//Error,'number' does not have 'substr'
x[5]="world";//OK, 'string' can be assigned to 'string | number'
console.log(x[5].toString());//// OK, 'string' and 'number' both have 'toString'
//x[6]=true;//// Error, 'boolean' isn't 'string | number'
//console.log(x[6]);

//Enum
enum Color{Red=1,Green=2,Blue=4};
let c:Color = Color.Blue;
console.log(c);
let colorName:string = Color[2];
console.log(colorName);

//Any
let notSure: any = 4;
console.log(notSure);
notSure = "maybe a string instead";
console.log(notSure);
notSure = false;// okay, definitely a boolean
console.log(notSure);

//let notSure: any = 4;
//notSure.ifItExists();// okay, ifItExists might exist at runtime
//notSure.toFixed(); // okay, toFixed exists (but the compiler doesn't check)

let prettySure: Object = 4;
//prettySure.toFixed(); // Error: Property 'toFixed' doesn't exist on type 'Object'.

let lists: any[] = [1,true,'free'];
lists[1]=100;

//Void
function warnUser():void{
    console.log("this is my warning message");
}

warnUser();
//Declaring variables of type void is not useful because you can only
//assign undefined or null to them:
let unusable: void = null;
console.log(unusable);

//Null and Undefined
// Not much else we can assign to these variables!
//let u: undefined = undefined;
//let n: null = null;

//Never
//Function returning never must have unreachable end point
/*function error(message:string):never{
    throw new Error(message);
}*/

// Inferred return type is never
function fail(){
    //return error("something failed");
}

// Function returning never must have unreachable end point
/*function infiniteLoop():never{
    while(true){

    }
}*/

//Type assertions(type cast)
let someValue: any = "this is a string";
let strLength1: number = (<string>someValue).length;
console.log(strLength1);
let strLength2: number = (someValue as string).length;
console.log(strLength2);

//A note about let
// many common problems in JavaScript are alleviated by using let, 
// so you should use it instead of var whenever possible.
