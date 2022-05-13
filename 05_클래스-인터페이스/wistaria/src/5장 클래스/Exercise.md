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
   
```ts
interface Shoe { purpose:string }
class BalletFlat implements Shoe { purpose = "dancing" }
class Boot implements Shoe { purpose = "woodCutting" }
class Sneaker implements Shoe { purpose = "walking" }

interface ShoeCreator { // 추가
  create(type: 'balletFlat'): BalletFlat
  create(type: 'boot'): Boot
  create(type: 'sneaker'): Sneaker
}

let Shoe : ShoeCreator= {
  create(type: 'balletFlat' | 'boot' | 'sneaker'): Shoe {
    switch(type) {
      case 'balletFlat': return new BalletFlat()
      case 'boot': return new Boot()
      case 'sneaker': return new Sneaker()
    }
  }
}

Shoe.create('balletFlat') // (method) ShoeCreator.create(type: 'balletFlat'): BalletFlat (+2 overloads)
Shoe.create('boot')
Shoe.create('sneaker')
```
```ts
interface Shoe { purpose:string }
class BalletFlat implements Shoe { purpose = "dancing" }
class Boot implements Shoe { purpose = "woodCutting" }
class Sneaker implements Shoe { purpose = "walking" }

let Shoe = {
  create(type: 'balletFlat' | 'boot' | 'sneaker') {
    // 리턴타입을 없에 타입추론으로 해결
    switch(type) {
      case 'balletFlat': return new BalletFlat()
      case 'boot': return new Boot()
      case 'sneaker': return new Sneaker()
    }
  }
}

Shoe.create('balletFlat') 
// (method) create(type: 'balletFlat' | 'boot' | 'sneaker'): BalletFlat | Boot | Sneaker
Shoe.create('boot')
Shoe.create('sneaker')

```

4. 타입 안전성을 갖춘 빌더 패턴을 설계하는 방법을 고안해보자. 5.11.2 빌더패턴에서 구현한 빌더패턴을 다음처럼 확장하라
  - 최소한 URL과 method를 설정한 다음에만 .send를 호출 할 수 있음을 컴파일 타임에 보장한다.메서드를 특정 순서로만 호출 하도록 강제하면 이 기능을 더 쉽게 구현할 수 있는가? 그렇다면 this대신에 무엇을 반환 할 수 있는가? 
```ts
// 메서드의 순서를 강제하기 위해 순서별 메서드를 서브클래스로 옮겨놓고
// 특정 메서드가 수행될때 서브클래스의 인스턴스를 리턴하는 방식으로 사용

class RequestBuilder {
  protected data: object | null = null
  protected method: 'get' | 'post' | null = null
  protected url: string | null = null

  setMethod(method: 'get' | 'post'): RequestBuilderWithMethod {
    return new RequestBuilderWithMethod().setMethod(method).setData(this.data)
  } // setMethod를 호출해야만 서브클래스인 RequestBuilderWithMethod 객체가 리턴되고
  setData(data: object | null): this {
    this.data = data
    return this
  }
}

class RequestBuilderWithMethod extends RequestBuilder {
  setMethod(method: 'get' | 'post' | null): this {
    this.method = method
    return this
  }
  // setURL 을 사용해야만 RequestBuilderWithMethodAndURL객체를 리턴받아 서브클래스의 메서드를 사용할 수 있다.
  setURL(url: string): RequestBuilderWithMethodAndURL {
    return new RequestBuilderWithMethodAndURL() 
      .setMethod(this.method)
      .setURL(url)
      .setData(this.data)
  }
}

class RequestBuilderWithMethodAndURL extends RequestBuilderWithMethod {
  setURL(url: string): this {
    this.url = url
    return this
  }
  send() {
    // ...
  }
}

new RequestBuilder() // 상위클래스로 생성
  .setMethod('get') // setURL을 갖고잇는 서브클래스 리턴
  // (method) RequestBuilder.setMethod(method: 'get' | 'post'): RequestBuilderWithMethod!!
  .setData({})
  .setURL('foo.com') // send를 갖고있는 서브클래스 리턴
  // (method) RequestBuilderWithMethod.setURL(url: string): RequestBuilderWithMethodAndURL!!
  .send()
```
  - 위 조건을 만족하면서도 호출자가 원하는 순서대로 메서드들을 호출하도록 허용할 수 있는가?
```ts
interface BuildableReqConditions {
  data?: object
  method: 'get' | 'post'
  url: string
} // BuildableReqConditions 에서는 메서드와 url이 필요

class RequestBuilder {
  data?: object
  method?: 'get' | 'post'
  url?: string

  setData(data: object): this & Pick<BuildableReqConditions, 'data'> {
    return Object.assign(this, {data})
  }
  // Pick<타입시그니처, 픽속성>

  setMethod(method: 'get' | 'post'): this & Pick<BuildableReqConditions, 'method'> {
    return Object.assign(this, {method})
  }

  setURL(url: string): this & Pick<BuildableReqConditions, 'url'> {
    return Object.assign(this, {url})
  }

  build(this: BuildableReqConditions) { // 매개변수 입력값으로 BuildableReqConditions 인터페이스를 만족해야 하는데, 이는 적어도 setMethod, setURL를 호출해야 한다.
    return this
  }
}

console.log(
  new RequestBuilder()
  .setURL('http://example.com')
  .setMethod('post')
  .build() 
  //BuildableReqConditions를 리턴하고, 여기엔 메서드가 없어 이후 메서드 호출이 안됨
  .data({aa:"aaa"})
  //(property) BuildableReqConditions.data?: object 이 식은 호출할 수 없습니다. '{}' 형식에 호출 시그니처가 없습니다.ts(2349)
)
```