// 반복자(iterator)와 제너레이터는 상생관계다. 제너레이터로 값의 스트림을 생성할 수 있고 반복자로 생성된 값을 소비할 수 있기 때문이다.
// 이터러블(iterable; 반복할 수 있는)
// Symbol.iterator라는 프로퍼티(반복자를 반환하는 함수)를 가진 모든 객체
// 반복자(iterator)
// next라는 메서드(value, done 두 프로퍼티를 가진 객체를 반환)를 정의한 객체
{
  let numbers = { 
    *[Symbol.iterator]() {
      for (let n = 1; n <= 10; n++){ 
        yield n 
      } 
    } 
  } 

  for (let n of numbers) { // for of 이터러블 반복
    console.log(n) 
  }
  let allNumbers = [...numbers] // 스프레드
  console.log(allNumbers)
  let [one, two, ...rest] = numbers // 디스트럭쳐
  console.log(one, two, rest)
}