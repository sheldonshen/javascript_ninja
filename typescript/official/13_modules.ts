/**
 * Created by sheldonshen on 11/16/2016.
 */
//介绍
//导出
//导出声明
/*export class ZipCodeValidator implements StringValidator{
    isAcceptable(s: string){
        return s.length === 5 && numberRegexp.test(s);
    }
}*/
//导出语句
import { StringValidation } from "./Validation.ts";
class ZipCodeValidator implements StringValidator{
    isAcceptable(s: string){
        return s.length === 5 && numberRegexp.test(s);
    }
}
export {ZipCodeValidator};
export {ZipCodeValidator as mainValidator};

//重新导出
export class ParseIntBasedZipCodeValidator {
    isAcceptable(s: string) {
        return s.length === 5 && parseInt(s).toString() === s;
    }
}

// 导出原先的验证器但做了重命名
export {ZipCodeValidator as RegExpBasedZipCodeValidator} from "./ZipCodeValidator";
export * from "./StringValidator"; // exports interface StringValidator
export * from "./LettersOnlyValidator"; // exports class LettersOnlyValidator
export * from "./ZipCodeValidator";  // exports class ZipCodeValidator
//导入
//导入一个模块中的某个导出内容
import { ZipCodeValidator as ZCV } from "./ZipCodeValidator";
let myValidator = new ZCV();

//将整个模块导入到一个变量，并通过它来访问模块的导出部分

import * as validator from "./ZipCodeValidator";
let myValidator = new validator.ZipCodeValidator();

//具有副作用的导入模块
import "./my-module.js";

//默认导出
declare let $: JQuery;
export default $;

import $ from "JQuery";
$("button.continue").html( "Next Step..." );

export default class ZipCodeValidator {
    static numberRegexp = /^[0-9]+$/;
    isAcceptable(s: string) {
        return s.length === 5 && ZipCodeValidator.numberRegexp.test(s);
    }
}

import validator from "./ZipCodeValidator";
let myValidator = new validator();

const numberRegexp = /^[0-9]+$/;
export default function (s: string) {
    return s.length === 5 && numberRegexp.test(s);
}

import validate from "./StaticZipCodeValidator";

let strings = ["Hello", "98052", "101"];

// Use function validate
strings.forEach(s => {
    console.log(`"${s}" ${validate(s) ? " matches" : " does not match"}`);
});

export default "123";

import num from "./OneTwoThree";

console.log(num); // "123"


//export = 和 import = require()
//生成模块代码
//简单示例
//可选的模块加载和其它高级加载场景
//使用其它的JavaScript库
//外部模块
//外部模块简写
//模块声明通配符
//UMD模块
//创建模块结构指导
//尽可能地在顶层导出
//如果仅导出单个 class 或 function，使用 export default
//如果要导出多个对象，把它们放在顶层里导出
//明确地列出导入的名字
//使用命名空间导入模式当你要导出大量内容的时候
//使用重新导出进行扩展
//模块里不要使用命名空间
//危险信号
