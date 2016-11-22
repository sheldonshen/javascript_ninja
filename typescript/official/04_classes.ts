/**
 * Created by shenyao on 2016/11/22.
 */
//介绍
//类
class Greeter{
    greeting:string;
    constructor(message:string){
        this.greeting = message;
    }
    greet(){
        return "hello," + this.greeting;
    }
}

let greeter = new Greeter('world');
console.log(greeter.greet());
//继承
class Animal{
    name:string;
    constructor(theName:string){
        this.name = theName;
    }
    move(distanceInMeters: number = 0){
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}

class Snake extends Animal{
    constructor(name:string){
        super(name);
    }
    move(distanceInMeters = 5){
        console.log("slithering...");
        super.move(distanceInMeters);
    }
}

class Horse extends Animal{
    constructor(name:string){
        super(name);
    }
    move(distanceInMeters = 45){
        console.log("galloping...");
        super.move(distanceInMeters);
    }
}

let sam = new Snake('Sammy the Python');
let tom : Animal = new Horse("Tommy the Palomino");
sam.move();
tom.move(34);
//公共,私有与受保护的修饰符
//默认为public
//理解private
class AnimalM{
    private name:string;
    public constructor(theName:string){
        this.name = theName;
    }
    public move(distanceInMeters: number = 0){
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}
var am = new AnimalM("CongBirdGG");
//console.log(am.name);//name is private
class AnimalA{
    private name: string;
    constructor(theName: string){
        this.name = theName;
    }
}

class Rhino extends AnimalA{
    constructor(){
        super("Rhino");
    }
}

class Employee{
    private name: string;
    constructor(theName: string){
        this.name = theName;
    }
}

let animal = new AnimalA("Goat");
let rhino = new Rhino();
let employee = new Employee("Bob");
animal = rhino;
//animal = employee;// Error: Animal and Employee are not compatible

//理解protected
/*class Person{
    protected name: string;
    constructor(name: string){
        this.name = name;
    }
}

class EmployeeP extends Person{
    private department:  string;
    constructor(name: string,department: string){
        super(name);
        this.department = department;
    }
    public getElevatorPitch(){
        return `Hello,my name is ${this.name} and I work in ${this.department}`;
    }
}

let howard = new EmployeeP("Howard","Sales");
console.log(howard.getElevatorPitch());
//console.log(howard.name);//error*/

/*class Person{
    protected name: string;
    protected constructor(theName: string) { this.name = theName; }
}

//EmployeeM can extend Person
class EmployeeM extends Person{
    private department: string;
    constructor(name:string,department:string){
        super(name);
        this.department = department;
    }
    public getElevatorPitch(){
        return `Hello,my name is ${this.name} and I work in ${this.department}`;
    }
}

let  howard = new EmployeeM('howard','Sales');
let  john   = new Person('John');//Error: The 'Person' constructor is protected*/

//readonly修饰符
/*class Octopus{
    readonly name: string;
    readonly numberOfLegs: number = 8;
    constructor(theName:string){
        this.name = theName;
    }
}
let dad = new Octopus("man with 8 strong legs");
dad.name = "change value";//error , name is readonly*/
//参数属性
class AnimalT{
    constructor(private name:string){}
    move(distanceInMeter: number){
       console.log(`${this.name} moved ${distanceInMeter}`);
    }
}

let  animal1 = new AnimalT('parameter');
animal1.move(100);
//存取器(setter,getter)
/*class Employer{
    fullName: string;
}
let employer = new Employer();
employer.fullName = 'Bob Smith';
if(employer.fullName){
    console.log(employer.fullName);
}*/

/*let passcode = "secret password";
class Employer{
    private _fullName: string;
    get fullName(){
        return this._fullName;
    }
    set fullName(newName: string){
        if(passcode && passcode === 'secret password'){
            this._fullName = newName;
        }else{
            console.log("Error: Unauthorized update of employee!");
        }
    }
}

let employer = new Employer();
employer._fullName = "Bob Smith";
if(employer.fullName){
    alert(employer.fullName);
}*/

//静态属性
class Grid{
    static orign  = {x:0,y:0};
    calculateDistanceFromOrigin(point: {x: number,y: number}){
            let xDist = (point.x - Grid.orign.x);
            let yDist = (point.y - Grid.orign.y);
            return Math.sqrt(xDist * xDist + yDist * yDist);//this.scale
    }
    constructor(public scale: number){}
}

let grid1 = new Grid(1.0);
let grid2 = new Grid(5.0);
console.log(grid1.calculateDistanceFromOrigin({x: 10, y: 10}));
console.log(grid2.calculateDistanceFromOrigin({x: 10, y: 10}));
//抽象类
abstract class AnimalK{
    abstract  makeSound():void;
    move(): void{
        console.log("roaming the earch...");
    }
}

abstract class Department{
    constructor(public name: string){
    }

    printName():void{
        console.log("Department name:" + this.name);
    }

    abstract printMeeting():void;//必须在派生类中实现
}

class AccountingDepartment extends Department{
    constructor(){
        super("Accounting and Auditing");//constructors in derived classes must call super()
    }
    printMeeting():void{
        console.log("The Accounting Department meets each Monday at 10am.");
    }
    generateReports():void{
        console.log("Generating accounting reports...");
    }
}
// ok to create a reference to an abstract type
let department: Department;
//error: cannot create an instance of an abstract class
//department = new Department();
//ok to create and assign a non-abstract subclass
department = new AccountingDepartment();
department.printName();
department.printMeeting();
//error: method doesn't exist on declared abstract type
//department.generateReports();

//高级技巧
//构造函数
class Greeter1{
    greeting: string;
    constructor(message: string){
        this.greeting = message;
    }
    greet(){
        return "Hello," + this.greeting;
    }
}

let greeter1:Greeter1;
greeter1 = new Greeter1("world");
console.log(greeter1.greet());

class Greeter2{
    static standardGreeting = "Hello,there";
    greeting: string;
    greet(){
        if(this.greeting){
            return "Hello," + this.greeting;
        }else{
            return Greeter2.standardGreeting;
        }
    }
}

let greeter2: Greeter2;
greeter2 = new Greeter2();
console.log(greeter2.greet());

let greeterMaker: typeof Greeter2 = Greeter2;
greeterMaker.standardGreeting = "Hey there!";

let greeterOther: Greeter2 = new  greeterMaker();
console.log(greeterOther.greet());

//把类当做接口使用
class Point{
    x: number;
    y: number;
}

interface Point3d extends Point{
    z: number;
}

let point3d: Point3d = {x:1,y:2,z:3};
console.log(point3d.x);
console.log(point3d.y);
console.log(point3d.z);
