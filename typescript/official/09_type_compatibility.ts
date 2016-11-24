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

//函数参数双向协变
//可选参数及剩余参数
//函数重载
//枚举
//类
//类的私有成员
//泛型
//高级主题
//子类型与赋值
