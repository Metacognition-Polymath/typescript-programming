{// ### any
  // any 타입은 모든 타입이므로 타입검사기를 무시한다.
  // any타입에 예외를 일으키고 싶다면 noImplicitAny, 또는 strict 옵션을 사용한다

  let a:any = 1 // any 오류 안남. 컴파일 잘 댐???
}
{// ### unknown
  // 타입을 알 수 없는 값에는 any 말고 unknown을 사용한다.
  // 지원연산 연산 : 비교(== === || && ??), 반전(!)

  // 1. 타입스크립트가 unknown 을 추론하지 않기 때문에 사용자 명시적으로 사용한다.
  let a:unknown = 1
  // 2. unknown 타입과 다른 타입의 값을 비교할 수 있다.
  let b = a===123
  // 3. unknown 타입이 특정 타입이라고 가정하여 동작을 수행할 수는 없다.
  let c = c + 10 //'+' 연산자를 'unknown' 및 '10' 형식에 적용할 수 없습니다.ts(2365)
  // 4. 특정 타입의 동작을 수행하려면 다음처럼 타입정제를 이용한다.
  if ( typeof(a) === 'number' ) {// typeof, instanceof 로 정제, 넘버타입인 경우만 실행
    let d = a + 10
  }  
}
{// ### boolean
  // 지원연산 : 비교(== === || && ??), 반전(!)

  let a3 = true // 타입추론 boolean
  let b3 = false // 타입추론 boolean
  const c3 = true // 타입추론 true
  let d3:boolean = true // 타입명시 boolean

  // ### 타입 리터럴 : 오직 하나의 값을 나타내는 타입
  let e3:true = true 
  let f3:false = true // 'true' 형식은 'false' 형식에 할당할 수 없습니다.ts(2322)
}
{// ### number
  // 2^52 이하의 정수표현
  // 모든 숫자(정수, 소수, 양수, 음수, Inficity, NaN)
  // 지원연산 : + - * / % ** < 등

  let a4 = 1234 // 추론 number
  let b4 = Infinity * 0.1 // 추론 number
  const c4 = 5678 // 5678
  let d4 = a4>b4 // boolean
  let e4: number = 100 // number
  let f4: 26.31 = 26.31 // 26.31
  let g4: 26.31 = 31 // '31' 형식은 '26.31' 형식에 할당할 수 없습니다.ts(2322)
}

{// ### bigint
  // 타입스크립트에 새로 추가된 정수 타입, number보다 큰 정수처리에 좋다
  // 지원연산 : + - * / < 등
  let a5 = 1234n // 추론 bigint
  const b5 = 5678n // 추론 5678n
  let c5 = a5 + b5 // 추론 bigint
  let d5 = a5 < 1234 // 추론 boolean
  let e5 = 88.5n // bigint 리터럴은 정수여야 합니다.ts(1353)
  let f5: bigint = 100n // 명시 bigint
  let g5: 100n = 100n // 명시 100n
  let h5: bigint = 100 // 'number' 형식은 'bigint' 형식에 할당할 수 없습니다.ts(2322)
}

{// ### string
  let a6 = 'hello' // 추론 string
  let b6 = 'billy' // 추론 string
  const c6 = '!' // 추론 '!'
  let d6 = 1 + ' ' + b + c // 추론 string
  let e6: string = 'zoom' // 명시 string
  let f6:'jhon' = 'jhon' // 명시 'jhon'
  let g6:'jhon' = 'zoe' // '"zoe"' 형식은 '"jhon"' 형식에 할당할 수 없습니다.ts(2322)
  
  type AUnion = "a" | "b"
  const str:AUnion = "a" as const  
}

{// ## symbol
  // es6 에서 추가된 타입
  // 객체와 맵에서 문자열 키를 대신하는 용도로 사용
  // 심벌키를 사용하면 잘 알려진 키만 사용하도록 강제할 수 있다.
  // 이터레이터를 사용하거나 인스턴스를 런타임에 오버라이딩하는것과 비슷한 기능을 제공한다???
  // 심볼은 같은 이름으로 생성해도 다른 고유의 값을 갖는다.
  let a7 = Symbol('hello') // 추론 symbol
  let b7:Symbol = Symbol('b') // 추론 Symbol
  let c7 = a7 === b7 // boolean
  let d7 = a7 + 'x' // '+' 연산자는 'symbol' 유형에 적용될 수 없습니다.ts(2469)
  const e7 = Symbol('e7') // 추론 typeof e7
  // 하나의 심볼로 명시할 때는 unique symbol을 사용한다.
  const f7:unique symbol = Symbol('f7') // 명시 typeof f7
  let g7:unique symbol = Symbol('g7') // 에러 떠야 하는데 안뜸.
  // unique symbol 타입은 const 사용해야함
  let h7 = e7 === e7 // boolean
  let i7 = e7 === f7 // 'typeof e7' 및 'typeof f7' 형식에 겹침이 없기 때문에 이 조건은 항상 'false'을(를) 반환합니다.ts(2367)
}

{// ### object
  /* 구조기반타입화
  구조기반타입화에서는 개체의 이름에 상관없이 객체가 어떤 프로퍼티를 갖고있는지 따진다.
  일부 언어에서는 덕 타이핑이라고 한다.
  */
  let a :object ={ b:'x' }
  a.b // 'object' 형식에 'b' 속성이 없습니다.ts(2339)
  // object 타입으로 명시하면 기본 타입 이외의 속성을 가질 수 없다.
  let b = {a:'x'} // let b: { a: string; }
  let c = {c:{d:'f'}} // 중괄호 안에서 타입을 명시할 수 있다.
  let d:{b:number} = {b:12}
  
  // const 선언 타입추론
  const co: {b:number} = { b:12 }
  // 타입 리터럴처럼 b:12로 구체화되지 않는다.

  // #### 객체 리터럴
  let name : {
    firstName:string,
    lastName:string,
  } = {
    firstName:'jhon',
    lastName:'doe'
  }

  class Person {
    constructor(public firstName:string, public lastName:string) {}
  } // public은 this.firstName = firstName의 단축어
  name = new Person('matt','smith')
  // 객체와 클래스의 필드 형태가 같아서 오류를 내지 않는다.

  let numberObj:{b:number}
  numberObj = {} // 'b' 속성이 '{}' 형식에 없지만 '{ b: number; }' 형식에서 필수입니다.ts(2741)
  
  numberObj = {
    b:12,
    c:13
  } // '{ b: number; c: number; }' 형식은 '{ b: number; }' 형식에 할당할 수 없습니다. 개체 리터럴은 알려진 속성만 지정할 수 있으며 '{ b: number; }' 형식에 'c'이(가) 없습니다.ts(2322)

  // #### 확실한 할당
  




}


{
  const a ={}
  a[Symbol.iterator]=function () {
    yield 1;
    yield 1;
    yield 1;      
    yield 1;
  }
  console.log([...a])
  type O = {
    a: number;
    b: string;
    c: number;
  }
  
  type O2 = {
    c: number;
    d: string;
  }

  type And = O & O2
  type Or = O | O2

  const o:And = {
    a: 1,
    b: '2',
    c: 3,
    d: '4'
  }

  const o2:Or = {
    a: 1,
    b: '2',
    c: 3,
    d: '4'
  }
  
  const o3 = Object.freeze({
    a: 1,
  })
  o3.b=2;

  const o4:Readonly<{a:number}> ={
    a:1
  }

  // enum 단점 트리세이킹??이 안됨

  const a:[number, string] = [1, '2']
}
{
  let j = [1,2,3]
  j.push(4)
  j.push("5")
  let a:string&number = 1
  console.log(a)
  interface Person {
    name: string;
    age: number;
  }

  interface Developer {
      name: string;
      skill: number;
  }

  type Capt = Person & Developer;

}