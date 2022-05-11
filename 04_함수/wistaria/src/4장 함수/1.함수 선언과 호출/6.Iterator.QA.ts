{
  let numbers = { 
    *[Symbol.iterator]() {
      for (let n = 1; n <= 10; n++){ 
        yield n 
      } 
    } 
  } 
  // 이건 또 왜 타입이 제너레이터로 나오나..
  // 이터러블 이터레이터로 나와야데는데
  
  for (let n of numbers) { // 오류나네.. 타입스크립트 현행 구문해석에 문제가 잇는건가?
    // 재부팅하니까 오류가 사라짐.. 
    console.log(n) 
  }

  let allNumbers = [...numbers]
}