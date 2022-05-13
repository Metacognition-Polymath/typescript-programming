{
  // 호출 시그니쳐 (타입 시그니쳐)
  // 함수 자체의 타입을 표현하는 방법
  // 매개변수 타입, this타입, 반환타입, 나머지 타입, 조건부 타입을 표현할 수 있지만
  // 매개변수 기본값은 표현할 수 없다. (a:string, b=1)
  // 반환타입은 추론할 수 없어 명시해야한다.

  // 이 sum 함수의 타입은 Function이다. Any 타입과 다를바가 없다.
  // function sum(a: number, b: number): number { 
  //   return a + b 
  // }

  // 타입시그니처를 통해 아래처럼 사용 할 수 있다.
  type Sum = (a: number, b: number) => number;
  const sum:Sum = function(a,b) {
    return a+b
  }
  // 함수에 마우스를 올리면 
  // (local function)(a: number, b: number): number
  // 매개변수 타입 추론을 하는데 이를 문맥적 타입화(contextual typing) 라 한다.


  // 타입시그니처는 여러개를 오버로딩할 수 있게 지원한다. 9절로 이동
  type Sum2 = {
    (a: number, b: number):number,
    (a: number, b: number, c:number):number
  }
  const sum2:Sum2 = function(a,b) {
    return a+b
  }
  const sum3:Sum2 = function(a,b,c) {
    return a+b+c
  }
  console.log(sum3(1,2,3))
}