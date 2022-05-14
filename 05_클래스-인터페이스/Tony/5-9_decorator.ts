{
  type Payload = any;

  type ClassConstructor<T> = new (...args: any[]) => T;

  function serializable<
    T extends ClassConstructor<{
      getValue(): Payload;
    }>
  >(AConstructor: T) {
    return class extends AConstructor {
      serialize() {
        console.log("serializable");
        console.log(this.getValue().toString());
        return this.getValue().toString();
      }
    };
  }

  @serializable
  class APIPayLoad {
    getValue(): Payload {
      return {
        id: 1,
        name: "Tony",
      };
    }
  }

  const apiPayload = new APIPayLoad();
  // console.log(apiPayload.getValue());
}
{
  /* ** 데코레이터 각 대상에 따른 파라미터 시그니처 ** */

  // 클래스
  type ClassDecorator = (Constructor: new (...anyArr: any[]) => any) => any;

  // 메서드
  type MethodDecorator = (
    ClassPrototype: {},
    methodName: string,
    descriptor: PropertyDescriptor
  ) => any;

  // 정적 메서드
  type StaticMethodDecorator = (
    Constructor: new (...anyArr: any[]) => any,
    methodName: string,
    descriptor: PropertyDescriptor
  ) => any;

  // 메서드 매개변수
  type MethodPropertyDecorator = (
    ClassPrototype: {},
    paramName: string,
    index: number
  ) => void;

  // 정적 메서드 매개변수
  type StaticMethodPropertyDecorator = (
    Constructor: new (...anyArr: any[]) => any,
    paramName: string,
    index: number
  ) => void;

  // 프로퍼티
  type PropertyDecorator = (ClassPrototype: {}, propertyName: string) => any;

  // 정적 프로퍼티
  type StaticPropertyDecorator = (
    Constructor: new (...anyArr: any[]) => any,
    propertyName: string
  ) => any;

  // 프로퍼티 게터/세터
  type PropertyGetterSetterDecorator = (
    ClassPrototype: {},
    propertyName: string,
    descriptor: PropertyDescriptor
  ) => any;

  // 정적 프로퍼티 게터/세터
  type StaticPropertyGetterSetterDecorator = (
    Constructor: new (...anyArr: any[]) => any,
    propertyName: string,
    descriptor: PropertyDescriptor
  ) => any;
}
{
  // 데코레이터 합성
  function f() {
    console.log("f(): evaluated");
    return function (
      target: any,
      propertyKey: string,
      descriptor: PropertyDescriptor
    ) {
      console.log("f(): called");
    };
  }

  function g() {
    console.log("g(): evaluated");
    return function (
      target: any,
      propertyKey: string,
      descriptor: PropertyDescriptor
    ) {
      console.log("g(): called");
    };
  }

  class C {
    @f()
    @g()
    method() {}
  }
  // method - 데코레이터 대상 - 를 호출하지 않아도 데코레이터들은 실행이 됨
  /**
    // 콘솔에서 다음과 같이 출력됨
    f(): evaluated
    g(): evaluated
    g(): called
    f(): called
   */
}
