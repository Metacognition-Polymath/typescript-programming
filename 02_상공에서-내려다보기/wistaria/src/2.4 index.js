console.log('Hello ts');
// terminal : tsc
// src 폴더 내 ts 파일들 자동 컴파일
// dist 폴더로 컴파일 안됨
// path 문제가 있는듯 한데, 발표때 물어볼까
// exercise
var a = 1 + 2;
var b = a + 3 + "안녕";
var c = {
    apple: a,
    banana: b
};
// let d = c.banana *4
// console.log(d)
/*
error TS2362: The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or
an enum type.

14 let d = c.banana *4
           ~~~~~~~~


Found 1 error.
*/ 
