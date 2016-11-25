/**
 * Created by sheldonshen on 11/16/2016.
 */
//可迭代性
//当一个对象实现了Symbol.iterator属性时，我们认为它是可迭代的。
//for...of语句
let someArray = [1,"string",false];
for(let entry of someArray){
    console.log(entry);
}
//for...of vs for...in语句
//for..in迭代的是对象的 键 的列表
//而for..of则迭代对象的键对应的值
let list = [4,5,6];
for(let i in list){
    console.log(i);
}
for(let i of list){
    console.log(i);
}

let pets = new Set(["Cat", "Dog", "Hamster"]);
pets["species"] = "mammals";
for(let pet in pets){
    console.log(pet);//"species"
}

for(let pet of pets){
    console.log(pet);//"Cat", "Dog", "Hamster"
}

//代码生成
//目标为 ES5 和 ES3
var numbers = [1,2,3];
for(let num of numbers){
    console.log(num);
}

//目标为 ECMAScript 2015 或更高
