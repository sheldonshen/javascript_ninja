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

//readonly vs const

//额外的属性检查

//函数类型

//可索引的类型

//类类型

//实现接口

//类静态部分与实例部分的区别

//扩展接口

//混合类型

//接口继承类

//https://zhongsp.gitbooks.io/typescript-handbook/content/doc/handbook/Interfaces.html
