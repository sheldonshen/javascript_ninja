/**
 * Created by sheldonshen on 11/16/2016.
 */
//介绍
//函数
   //Named function
   function add(x,y){
      return x + y;
   }
   //Anonymous function
   let myAdd = function(x,y){return x + y;};
   let z = 100;
   function addToZ(x,y){
       return x + y + z;
   }
//函数类型
//为函数定义类型
function addT(x: number,y: number):number{
    return x + y;
}

let myAddT = function(x: number, y: number): number{return x + y;};

//书写完整函数类型
let myAddC: (x:number,y:number)=>number =
    function(x: number,y: number):number { return x + y;}
let myAddA: (baseValue:number, increment:number)=> number =
    function(x:number, y:number):number{
          return x + y;
    }

//推断类型
// myAdd has the full function type
let myAddB = function(x: number,y: number):number{ return x + y;};
// The parameters `x` and `y` have the type number
let myAddD:(baseValue:number,increment: number)=>number =
    function(x,y){return x + y;};

//可选参数与默认参数
function buildName(firstName: string,lastName: string){
    return firstName + " " + lastName;
}
//let result1 = buildName("Bob");// error, too few parameters
//let result2 = buildName("Cong",'Bird',"SB");//error, too many parameters
let result3 = buildName("cong",'bird');//ah,just right
//JavaScript里，每个参数都是可选的，可传可不传。 没传参的时候，它的值就是undefined。
//在TypeScript里我们可以在参数名旁使用?实现可选参数的功能
function buildNameOption(firstName: string,lastName?: string){
    if(lastName){
        return firstName + " " + lastName;
    }else{
        return firstName;
    }
}

let r1 = buildNameOption("Cong");
let r2 = buildNameOption("Cong","Bird");
//let r3 = buildNameOption("Cong","Bird","SB");//error
function buildNameDefault(firstName:string,lastName="Smith"){
    return firstName + " " + lastName;
}
let result11 = buildNameDefault("Bob");                  // works correctly now, returns "Bob Smith"
let result21 = buildNameDefault("Bob", undefined);       // still works, also returns "Bob Smith"
//let result31 = buildNameDefault("Bob", "Adams", "Sr.");  // error, too many parameters
let result41 = buildNameDefault("Bob", "Adams");         // ah, just right

function buidlNameTest(firstName = "Will",lastName: string){
    return firstName + " " + lastName;
}
//let result12 = buidlNameTest("Bob");                  // error, too few parameters
//let result22 = buidlNameTest("Bob", "Adams", "Sr.");  // error, too many parameters
let result32 = buidlNameTest("Bob", "Adams");         // okay and returns "Bob Adams"
let result42 = buidlNameTest(undefined, "Adams");     // okay and returns "Will Adams"
//剩余参数
function buildNameVargs(firstName:string,...restOfName:string[]){
    return firstName + restOfName.join(" ");
}
let employeeName = buildNameVargs("Joseph", "Samuel", "Lucas", "MacKinzie");
let buildNameVargsFun: (fname:string,...rest: string[]) => string = buildNameVargs;

//this
//this和箭头函数
let deck = {
    suits:["hearts",'spades','clubs','diamonds'],
    cards:Array(52),
    createCardPicker:function(){
        return function(){
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);
            return {suit:this.suits[pickedSuit],card:pickedCard % 13};
        };
    }
}

/*let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();
console.log("card: " + pickedCard.card + " of " + pickedCard.suit);*/
// 箭头函数能保存函数创建时的this值，而不是调用时的值
let deck1 = {
    suits:["hearts",'spades','clubs','diamonds'],
    cards:Array(52),
    createCardPicker:function(){
        /*return function(){
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);
            return {suit:this.suits[pickedSuit],card:pickedCard % 13};
        };*/
        return ()=>{
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        };
    }
}

let cardPicker1 = deck1.createCardPicker();
let pickedCard1 = cardPicker1();
console.log("card: " + pickedCard1.card + " of " + pickedCard1.suit);
//TypeScript会警告你犯了一个错误，如果你给编译器设置了--noImplicitThis标记。
//它会指出this.suits[pickedSuit]里的this的类型为any

//this参数
/*interface Card{
    suit: string;
    card : number;
}

interface Deck{
    suits:string[];
    cards:number[];
    createCardPicker(this: Deck): () => Card;
}
let deck: Deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    // NOTE: The function now explicitly specifies that its callee must be of type Deck
    createCardPicker: function(this: Deck) {
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

alert("card: " + pickedCard.card + " of " + pickedCard.suit);*/

//this参数在回调函数里
/*interface UIElement{
    addClickListener(onclick: (this:void,e:Event) => void):void;
}*/

/*class Handler{
    info:string;
    onClickBad(this:Handler,e:Event){
        //oops, used this here. using this callback would crash at runtime
        this.info = e.message;
    }
}
let h = new Handler();
uiElement.addClickListener(h.onClickBad);//error*/
//重载
//JavaScript本身是个动态语言。 JavaScript里函数根据传入不同的参数而返回不同类型的数据是很常见的
/*let suits = ["hearts", "spades", "clubs", "diamonds"];
function pickCard(x):any{
    // Check to see if we're working with an object/array
    // if so, they gave us the deck and we'll pick the card
    if(typeof x == "object"){
        let pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    //Otherwise just let them pick the card
    else if(typeof x == 'number'){
        let pickedSuit = Math.floor(x / 13);
        return {suit:suits[pickedSuit],card:x % 13};
    }
}

let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
let pickedCard3 = myDeck[pickCard(myDeck)];
alert("card: " + pickedCard3.card + " of " + pickedCard3.suit);

let pickedCard2 = pickCard(15);
alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);*/

let suits = ["hearts", "spades", "clubs", "diamonds"];

function pickCard(x: {suit: string; card: number; }[]): number;
function pickCard(x: number): {suit: string; card: number; };
function pickCard(x): any {
    // Check to see if we're working with an object/array
    // if so, they gave us the deck and we'll pick the card
    if (typeof x == "object") {
        let pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    // Otherwise just let them pick the card
    else if (typeof x == "number") {
        let pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}

let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
let pickedCard3 = myDeck[pickCard(myDeck)];
alert("card: " + pickedCard3.card + " of " + pickedCard3.suit);

let pickedCard2 = pickCard(15);
alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);



