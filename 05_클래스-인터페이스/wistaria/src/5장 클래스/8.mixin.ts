/*
  역할 지향 프로그래밍(role-oriented-programming)

  믹스인(다중상속)을 이용하면 역할지향으로 클래스를 구성할 수 있다.
  객체지향이 이것은 shape이다 라고 표현한다면
  역할지향은 이것을 할 수 있다, 이것들을 갖고있다. 처럼 속성을 묘사하는 방식을 사용
  `is-a` 대신 `can` `has-a` 관계를 사용한다.

  믹스인이란 동작과 프로퍼티를 클래스로 혼합할 수 있게 해주는 패턴으로
  1. 상태를 가질 수 있다 (인스턴스 필드)
  2. 구체 메서드만 제공한다 (추상메서드x)
  3. 생성자를 가질 수 있다. (클래스가 믹스인 순서로 호출)

  믹스인은 필요한 수의 믹스인을 클래스에 제공하고 
  더 풍부한 동작을 제공할 수 있으며 타입안전성도 보장된다. 
  믹스인은 동작을 캡슐화할 뿐 아니라 동작을 재사용 할 수 있도록 도와준다.
*/

// 클래스 디버그 코드를 클래스로 짜서 다른 클래스에 믹스인해보자.
{
  type ClassConstructor = new (...args:any[])=>{}
  // 1. 모든 생성자를 표현하는 ClassConstructor를 선언
  // 타입스크립트는 구조기준으로 타입을 결정하므로, 
  // new로 만들 수 있는 모든것을 생성자라 규정한다.
  // 생성자에 어떤 매개변수가 올지 모르므로 any타입의 인수를 받게 지정

  function withEzDebug<C extends ClassConstructor>(ClassA:C){
    // 함수의 매개변수로 하나의 클래스 C(생성자)를 받게 셋팅 
    return class extends ClassA {
      // 믹스인은 생성자를 인수로 받아 생성자를 반환
      constructor(...args:any[]){
        super(...args) // Class를 상속받아 사용하므로 Class의 생성자를 호출해야 함
      }
      debugMethod(){}
    }
  }
}// 컴포지션

// 디버깅이 작동하도록 만들어보자.
{
  type ClassConstructor = new (...args:any[])=>{}

  function withEzDebug<C extends ClassConstructor>(Class:C){
    return class extends Class {
      constructor(...args:any[]){
        super(...args)
      }
      debug() {
        let Name = this.constructor.name
        let value = this.getDebugValue() // 이 메서드를 강제하려면
        return Name + `(${JSON.stringify(value)})`
      }
    }
  }
  // 기존의 클래스를 받지 않고 제네릭 타입을 이용하면
  // 이지디버그클래스가 getDebugValue() 메서드를 정의하게 강제할 수 있다.
}

{
  type ClassConstructor<T> = new (...args:any[]) => T
  // 제네릭 타입 매개변수를 추가해주고
  function withEzDebug<C extends ClassConstructor<{getDebugValue():object}>>(Class:C) {
    // C가 ClassConstructor를 상속하면서 getDebugValue()를 구현하게끔 생성
    return class extends Class {
      constructor(...args:any[]){
        super(...args)
      }
      debug() {
        let Name = this.constructor.name
        let value = this.getDebugValue() // this 가 getDebugValue() 타입을 가지고 있으므로 오류가 없음
        return Name + `(${JSON.stringify(value)})`
      }
    }
  }
}

{
  type ClassConstructor<T> = new (...args:any[]) => T

  function withEzDebug<C extends ClassConstructor<{getDebugValue():object}>>(Class:C) {
    return class extends Class {
      constructor(...args:any[]){
        super(...args)
      }
      debug() {
        let Name = this.constructor.name
        let value = this.getDebugValue()
        return Name + `(${JSON.stringify(value)})`
      }
    }
  }

  class HardToDebugUser {
    constructor(
      private id:number,
      private firstName:string,
      private lastName:string
    ){ }
    
    getDebugValue(): object {
      return {
        id: this.id,
        name: this.firstName + ' ' + this.lastName
      }
    }
  }

  let User = withEzDebug(HardToDebugUser) 
  // getDebugValue 주석처리 하면 오류
  let user = new User(1, 'John', 'Doe')
  user.debug() // HardToDebugUser({"id":1,"name":"John Doe"})
}