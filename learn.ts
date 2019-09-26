//bool
let isDone: boolean = false;
//number
let binary: number = 0b1010;
let octal: number = 0o744;   //前导直面量
let dec: number = 6;
let hex: number = 0xf00d;
//string
let name1: string = "alex";
name1 = "butter";

let name2: string = 'Coco';
let age: number = 37;
let sentence: string = `Hello,my name is ${name}.I'll be ${age + 1} years old next month. `;

let sen: string = "Hello, my name is " + name + ".\n\n" + "I`ll be" + (age + 1) + "years old next month.";

//array
let list: number[] = [1, 2, 3];
let list1: Array<number> = [1, 2, 3];

//tuple
//Declare tuple type 
let x: [string, number];
x = ['hello', 10];
// x = [10,'hello'] //初始化错误
console.log(x[0].substr(1));
// console.log(x[1].substr(1))

//越界 联合类型
x[3] = 'world';

x[6] = 'true'
//
//enum
enum Color { Rea, Greed, Blue }
let c: Color = Color.Blue;
let colorName: string = Color[2];

//any
let notSure: any = 4;
notSure = 'maybe a string instead';
notSure = false

notSure.ifItExists(); // okay, ifItExists might exist at runtime
notSure.toFixed(); // okay, toFixed exists (but the compiler doesn't check)

let prettySure: Object = 4;
// prettySure.toFixed; 
let list2: any[] = [1, true, "free"];
list2[1] = 100;


function padLeft(value: string, padding: any) {
    if (typeof padding === "number") {
        return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
        return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
}

padLeft("Hello world", 4); // returns "    Hello world"



//////////////////////////////////////
//this 和箭头函数
//JavaSctipt 中的this指向的对象是运行时决定，而不是定义是决定的
//TypeScript中箭头函数，可以是this指定定义是的对象
let deck = {
    suits: ['hearts', 'spades', 'clubs', 'diamonds'],
    cards: Array(52),
    createCardPicker: function () {
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);
            console.info(typeof this);

            console.info(this);
            return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
        }
    }
}
let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();
console.info(pickedCard);


//this 参数的使用
//this 参数是一个假参数，它出现在参数列表的最前面
//this 参数指定箭头函数中this的具体类型
interface Card {
    suit: string;
    card: number;
}
interface Deck {
    suits: string[];
    cards: number[];
    createCardPicker(this: Deck): () => Card;
}
let deck: Deck = {
    suits: ['hearts', 'spades', 'clubs', 'diamonds'],
    cards: Array(52),
    createCardPicker: function (this: Deck) {
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);
            console.info(typeof this);
            return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
        }
    }
}
let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();






// //函数重载
// //TypeScript中，目前出现两个名字相同的函数出现编译异常
// //使用弱类型的形参和返回参数内部定义处理，实现方法重载
// //重载定义，编译不通过
// function pickCard(x: { suit: string; card: number; }): number {
//     return 2;
// }
// function pickCard(x: number): { suit: string; card: number; } {
//     return { suit: 'asdf', card: 3 };
// }
//重载实现，编译通过
function pickCard(x): any {
    if (typeof x == "object") {
        let pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    else if (typeof x == "number") {
        let pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
