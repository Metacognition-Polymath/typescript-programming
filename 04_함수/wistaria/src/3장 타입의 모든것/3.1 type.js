function squareOf(n) {
    return n * n;
}
console.log(squareOf(2)); //4
console.log(squareOf("z")); //NaN (Not a Number)
function squareOf2(n) {
    return n * n;
}
console.log(squareOf2(2)); //4
console.log(squareOf2("z"));
/*
error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.

14 console.log(squareOf2("z")) //NaN (Not a Number)
                         ~~~


Found 1 error.
 */
