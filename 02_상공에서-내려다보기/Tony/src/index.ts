console.log("Hello Typescript!");

// 연습문제 1
// let a = 1 + "2"; // error at `let d`
let a = 1 + 2;
let b = a + 3;
let c = {
  apple: a,
  banana: b,
};
let d = c.apple * 4;

console.log("b", b);
