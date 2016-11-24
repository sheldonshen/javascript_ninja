/**
 * Created by sheldonshen on 11/16/2016.
 */
//基础
let x = 3;
//最佳通用类型
let xy = [0,1,null];

//let zoo = [new Rhino(), new Elephant(), new Snake()];
//let zoo: Animal[] = [new Rhino(), new Elephant(), new Snake()];

//上下文类型
window.onmousedown = function(mouseEvent : any) {
    //console.log(mouseEvent.buton);  //<- Error
    console.log(mouseEvent.buton);  //<- Now, no error is given
};

/*
function createZoo(): Animal[] {
    return [new Rhino(), new Elephant(), new Snake()];
}*/
