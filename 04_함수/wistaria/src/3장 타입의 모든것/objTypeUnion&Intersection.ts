{
  // 인터섹션타입 유니온타입

  type age = { name:string; age:number }
  type job = { name:string; job:string }

  const test1 : age & job = {
    name: '1',
    age: 1,
    // job: '2' // 없어서 오류
  }
  test1.name
  test1.age
  test1.job

  const test2 : age | job = {
    name: '1',
    age: 1,
    job: '2' // 오류표시는 안됨. 정의에선 합집합까지 되지만
  }
  test2.name
  test2.age // 호출오류.
  test2.job // 호출오류. 호출시에는 교집합만 가능

  const test3 : age | job = {
    name: '1',
    age: 1,
  }
  test3.name
  test3.age // 한 타입을 기준으로 작성된 문서에선 (|)가 교집합의 의미가 아닌 or의 의미를 가진다.

  // 인터섹션과 유니온은 문법 자체가 엉망으로 보인다.
  // union(|)은 속성의 호출에 있어서 교집합(intersection)으로 사용되며
  // intersection(&)은 속성의 호출에 있어서 합집합(union)으로 사용된다.

  // 결론. &는 합집합으로 |는 or 의 의미로만 코드를 작성하고 사용하도록 하자.
}