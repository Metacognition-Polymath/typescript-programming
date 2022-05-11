{
  // 자바스크립트의 함수는 입력값에 따라 반환 타입이 달라질 수 있다.
  type Log = { (message: string, userId?: string): void }

  type Sum2 = {
    (a: number, b: number):number,
    (a: number, b: number, c:number):number
  }
  const sum2:Sum2 = function(a,b) {
    return a+b
  }
  const sum3:Sum2 = function(a,b,c) { // 오류나는데 뭐지
    return a+b+c
  }
  console.log(sum3(1,2,3))
}