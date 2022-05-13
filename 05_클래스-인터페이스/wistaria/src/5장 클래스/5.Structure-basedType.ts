// 타입스크립트의 클래스는 이름이 아닌 구조기반의 타입을 지원한다.
// 덕타이핑 : 구조기반타입
{
  class Zebra {
    trot() {}
  }
  class Poodle {
    trot() {}
  }
  function ambleAround(animal:Zebra) {
    animal.trot()
  }
  let zebra = new Zebra()
  let poodle = new Poodle()
  ambleAround(zebra)
  ambleAround(poodle) // 오류없음. 두 클래스가 구조적으로 호환가능.
  // 자바였다면 이름이 다른 클래스 타입이기 때문에 호환이 되지 않지만
  // 타입스크립트에서는 구조적으로 동형적이라면 이름과 상관없이 호환가능하다.
  // 단 접근제한자에 의해 제한된 필드를 갖는 클래스는 호환이 안됨
}

{
  class A {
    private x = 1
  }
  class B extends A {}

  function f(a:A) {}
  f(new A())
  f(new B())
  f({x:1}) // 'x' 속성은 'A' 형식에서 private이지만 '{ x: number; }' 형식에서는 그렇지 않습니다.ts(2345)
  // 접근제한은 구조적 차이를 만든다.
}
