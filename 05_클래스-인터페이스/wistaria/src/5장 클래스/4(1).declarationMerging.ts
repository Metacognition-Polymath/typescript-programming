// 선언합침(declaration merging)
// 타입알리아스는 선언합침이 일어나지 않는다.
// 인터페이스끼리 충돌해서는 안된다.
// 제네릭을 사용하게 되면 제네릭 선언방법과 이름까지 같아야 한다.

{
  interface A {
    good(x:number):string
  }
  interface A {
    bad(x:number):string
  }
  const a:A = { // 합쳐진 인터페이스
    good(x){ return x.toString() },
    bad(x){ return x.toString() }
  }
}

{
  // 타입알리아스는 선언합침이 일어나지 않는다.
  type A = {
    good(x:number):string
  }
  type A = {
    bad(x:number):string
  }
  const a:A = { 
    good(x){ return x.toString() },
    bad(x){ return x.toString() }
  }
}

{
  // 인터페이스끼리 충돌해서는 안된다.
  interface A {
    good(x:number):string
  }
  interface A {
    good(x:string):number
  } // 선언시엔 오류가 드러나지 않지만,

  const a:A = {
    good(x){ return x.toString() } // ts(2322) 사용시 나타난다.
  }
}

{
  // 제네릭을 사용하게 되면 제네릭 선언방법과 이름까지 같아야 한다.
  interface A<T extends number> { // 'A'의 모든 선언에는 동일한 형식 매개 변수가 있어야 합니다.ts(2428)
    good(x:T):string
  }
  interface A<T extends string> { // 'A'의 모든 선언에는 동일한 형식 매개 변수가 있어야 합니다.ts(2428)
    bad(x:T):string
  }
}
