{

  sum(1, 2, 3, 4, 5) // 여러개의 인수를
  function sum(...numbers:number[]):number { // 스프레드를 통해
    numbers // 배열로 묶어사용이 가능
    return numbers.reduce((acc, cur) => acc + cur, 0)
  }

}0