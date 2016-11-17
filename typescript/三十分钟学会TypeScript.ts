/**
 * Created by sheldonshen on 11/17/2016.
 */

//使用 TypeScript 的好处
//安装TypeScript
//支持 TypeScript 的文本编辑器
//编译成 JavaScript
//静态类型
var burger: string = 'hamburger',//String
    calories: number = 300,//Number
    tasty: boolean = true;
// Alternatively, you can omit the type declaration:
// var burger = 'hamburger';

// The function expects a string and an integer.
// It doesn't return anything so the type of the function itself is void.
function speak(food:string,energy: number):void{
    console.log("Our " + food + " has " + energy + " calories.");
}
speak(burger,calories);

/*
*
 Number (数值类型)  –  所有数字都是数值类型的，无论是整数、浮点型或者其他数值类型都相同。
 String（字符串类型） –  文本类型，就如 vanilla JS 字符串一样可以使用单引号或者双引号。
 Boolean（布尔类型） –   true 或者 false，用 0 和 1 会造成编译错误。
 Any（任意类型） – 该类型的变量可以设定为字符串类型，数值类型或者任何其他类型。
 Arrays（数组类型） – 有两种语法：my_arr: number[];或者my_arr: Array<number>
 Void （空类型）- 用在不返回任何值的函数中。
 * */

//Interfaces 接口
//接口通常会根据一个对象是否符合某种特定结构来进行类型检查。通过定义一个接口我们可以命名一个特殊的组合变量，
//确保它们会一直一起运行。当转译成 JavaScript 时，接口会消失 – 它们唯一的目的是在开发阶段里起到辅助的作用
// Here we define our Food interface, its properties, and their types.
interface Food{
    name:string;
    calories:number;
}

// We tell our function to expect an object that fulfills the Food interface.
// This way we know that the properties we need will always be available.
function tell(food:Food):void{
    console.log("Our " + food.name + " has " + food.calories + " calories.");
}

// We define an object that has all of the properties the Food interface expects.
// Notice that types will be inferred automatically.
var ice_cream={
    name:'cong_bird',
    calories:250
};

tell(ice_cream);

//类
class Menu{
    // Our properties:
    // By default they are public, but can also be private or protected.
    items:Array<string>;// The items in the menu, an array of strings.
    pages:number;// How many pages will the menu be, a number.
    // A straightforward constructor.
    constructor(item_list:Array<string>,total_pages:number){
        // The this keyword is mandatory.
        this.items = item_list;
        this.pages = total_pages;
    }
    // Methods
    list():void{
        console.log("Our menu for today:");
        for(var i=0; i<this.items.length; i++){
            console.log(this.items[i]);
        }
    }
}

// Create a new instance of the Menu class.
var sundayMenu = new Menu(["pancakes","waffles","orange juice"],1);
// Call the list method.
sundayMenu.list();

//继承
class HappyMeal extends Menu{
    // Properties are inherited

    // A new constructor has to be defined.
    constructor(item_list:Array<string>,total_pages:number){
        // In this case we want the exact same constructor as the parent class (Menu),
        // To automatically copy it we can call super() - a reference to the parent's constructor.
        super(item_list,total_pages);
    }

    // Just like the properties, methods are inherited from the parent.
    // However, we want to override the list() function so we redefine it.
    list():void{
        console.log("Our special menu for children:");
        for(var i=0; i < this.items.length; i++){
            console.log(this.items[i]);
        }
    }
}
// Create a new instance of the HappyMeal class.
var menu_for_children = new HappyMeal(["candy","drink","toy"],1);
// This time the log message will begin with the special introduction.
menu_for_children.list();

//泛型
// The <T> after the function name symbolizes that it's a generic function.
// When we call the function, every instance of T will be replaced with the actual provided type.
// Receives one argument of type T,
// Returns an array of type T.
function genericFunc<T>(argument:T):T[]{
    var arrayOfT:T[]=[];//Create empty array of type T.
    arrayOfT.push(argument);// Push, now arrayOfT = [argument].
    return arrayOfT;
}

var arrayFromString = genericFunc<string>("beep");
console.log(arrayFromString[0]);
console.log(typeof arrayFromString[0]);
var arrayFromNumber = genericFunc(42);//automatic infer
console.log(arrayFromNumber[0]);
console.log(typeof arrayFromNumber[0]);

//模块化
//commonjs,require.js,AMD

//第三方声明文件
//DefinitelyTyped

//TypeScript 2.0将带来的新特性
/*Non-nullable 类型标志，防止变量值被设定为 null 或者 undefined。
通过 npm install 来直接获取声明文件的新改进系统。
控制流类型分析来抓取之前被编译器漏掉的错误。
模块导入/导出语句方面的一些创新。

另一个被期待已久的特性是在 async/await 块中能够控制异步流功能*/

//扩展阅读

//总结
