// 데코레이터는 장식하는 대상의 함수를 호출하는 기능을 제공하는 문법으로 
// 타입스크립트의 실험적 기능이다. (언제사라질지 모름)
// 클래스, 메서드, 필드, 메서드 매개변수를 활용한 메타 프로그래밍 문법을 제공한다.
// tsconfig.json에 "experimentalDecorators": true를 추가해야 사용가능
// npm 에 다양한 데코레이터가 등록되어있으니 참고

// method decorator
{
  function LogMethod(
    target: any, // foo 함수 자체
    propertyKey: string | symbol, //함수명 foo
    descriptor: PropertyDescriptor // 함수 속성
  ) {
    console.log(target); // Demo {}
    console.log(propertyKey); // foo
    console.log(descriptor); 
    // { 
    //   value: [λ: foo], 
    //   writable: true, 
    //   enumerable: false, 
    //   configurable: true 
    // }
  }
   
  class Demo {
    @LogMethod
    public foo(bar: number) {
      return bar;
    }
  }  

  let demo = new Demo
  demo.foo(10) // 10
  
  // 메서드 데코레이터인 @LogMethod는 foo() 함수를 감싸고 있으며 선택적으로 이를 대체하는 새 함수를 반환한다.
} 

// class decorator
{
  type ClassConstructor<T> = new (...args:any[]) => T

  function serializable<T extends ClassConstructor<{getValue():string}>>(constructor:T){
    return class extends constructor{
      serialize() {
        return this.getValue()
      }
    }
  }
  @serializable
  class APIPayload {
    getValue():string {
      return "API Payload"
    }
  }


  let decorator = serializable(APIPayload)
  let payload = new decorator()
  payload.serialize() // "API Payload"

  // 함수 데코레이터는 실행하지 않아도 데코데이터가 작동하는데
  // 클래스 데코레이터는 따로 실행해야 작동.
}
