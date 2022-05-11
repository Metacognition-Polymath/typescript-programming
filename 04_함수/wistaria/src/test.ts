let numbers = { 
  *[Symbol.iterator]() {
    for (let n = 1; n <= 10; n++){ 
      yield n 
    } 
  } 
} 

// 이건 또 왜 타입이 제너레이터로 나오나..
// 이터러블 이터레이터로 나와야되는데
for (let n of numbers) { 
  console.log(n)
}