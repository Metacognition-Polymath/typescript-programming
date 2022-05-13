1. 클래스와 인터페이스의 차이는?

인터페이스는 생성자가 없고, 필드의 타입, 타입시그니쳐등 타입형식만 존재하고 값이 존재하지 않는다.
클래스는 인터페이스를 구현할 수있다.
클래스는 생성자 필드 메서드로 구성되어있고, 형식과 데이터를 모두 다루며, 자바스크립트 코드를 생성하고 런타임시 인스턴스 검사를 지원한다. 클래스의 필드는 수정가능할 수 있다.


2. 클래스의 생성자를 private로 선언하면 인스턴스를 만들수 없고 클래스를 확장할 수도 없다. 생성자를 protected로 선언하면 어떻게 되는지 확인하자.

```ts
{
  class ProtectedConstructor {
    protected constructor() {}
  }

  class SubClass extends ProtectedConstructor {
    createInstance(){
      return super()
    }
  }

  // const pro = new ProtectedConstructor(); // 접근불가
  // const sub = new SubClass(); // 접근불가
}
{
  class ProtectedConstructor {
    protected constructor() {}
  }

  class SubClass extends ProtectedConstructor {
    constructor() { super(); } // 서브클래스에 생성자를 달아주면
  }

  // const pro = new ProtectedConstructor(); // 접근불가
  const sub = new SubClass(); // 접근가능
  // 자식클래스만 생성가능하도록 만들 수 있다. 
  // 근데 이럴거면 추상클래스를 사용할듯
}
```

3. 팩토리 패턴에서 개발한 코드에서 추상화원칙을 어기는 대신 안전성을 확보할 수 있도록 개선하자. 기존에는 항상 Shoe 가 반환되었지만 이번에는 사용자가 Shoe.create('balletFlat')를 호출하면 BalletFlat을 반환할 것임을 컴파일 타임에 알 수 있도록 바꿔보자.
   
   