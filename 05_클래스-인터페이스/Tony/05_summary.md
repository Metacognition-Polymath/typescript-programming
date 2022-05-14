# 5장. 클래스와 인터페이스

- 객체지향 필수 양식, 클래스
- 클래스
  - 캡슐화의 주요 단위
  - 클래스의 주요 기능은 대부분 C#에서 가져왔음
- mixin(?) 같은 자바스크립트 표현식도 타입 안전성을 유지하며 사용할 수 ㅇ있다

  - 메서드들을 외부에서 클래스로 주입, Object.assign 이용
  - 참고
    - https://velog.io/@moggy/Javascript-%EB%AF%B9%EC%8A%A4%EC%9D%B8-%EA%B8%B0%EB%B2%95Mixin-technique
    - https://ko.javascript.info/mixins

- 클래스의 기능들
  - 런타임에도 존재 : 프로퍼티 초기자, 데코레이터 등
    - 자바스크립트 기능들
  - 컴파일에만 존재 : 가시성 접근자, 인터페이스, 제네릭 등

## 5.1 클래스와 상속

- 체스 엔진을 만들어보자

```ts
// Piece 클래스에 색과 위치를 추가
type Color = "Black" | "White";
type XAxis = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H";
type YAxis = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

// 체스 말의 좌표 집합
class Position {
  constructor(private xAxis: XAxis, private yAxis: YAxis) {}
}

// 체스 말
abstract class Piece {
  protected position: Position;
  constructor(private readonly color: Color, xAxis: XAxis, yAxis: YAxis) {
    this.position = new Position(xAxis, yAxis);
  }

  moveTo(position: Position) {
    this.position = position;
  }
  abstract canMoveTo(position: Position): boolean;
}
```

- 생성자의 접근 한정자는 자동으로 변수를 this에 할당
- Piece 클래스의 protected : private과 달리 인스턴스와 서브(자식)클래스 인스턴스 모두에 접근을 허용 (X)
  - protected : 해당 클래스와 자식클래스에서는 접근 가능하지만 인스턴스(외부)에선 접근 불가능

#### 접근 한정자

- public : 어디에서나 접근할 수 있다. 기본적으로 주어지는 접근 수준
- protected : 이 클래스와 서브클래스의 인스턴스에서만 접근할 수 있다
- private : 이 클래스의 인스턴스에서만 접근할 수 있다

#### abstract class

- 직접 인스턴스화를 시도하면 에러를 발생시킴
- 인스턴스화 할 수 없고
- 필요한 메서드를 추상 클래스에 자유롭게 추가할 수 있음

- moveTo와 같이 기본 구현을 포함할 수 있다(필요하다면 서브클래스에서 오버라이드 할 수 있다)

  - 메서드에 접근 한정자를 추가하지 않으면 기본적으로 public이다

- canMoveTo : 추상 메서드 => abstract 클래스를 상속받는 클래스에서 구현해야 하는 메서드
- String.prototype.charCodeAt(index) : charCodeAt() 메서드는 지정된 인덱스에서 UTF-16 코드 단위를 나타내는 0에서 65535 사이의 정수를 반환합니다.
  - '😄'.charCodeAt(0) => 55357
  - 'a' => 97
  - 'A' => 65

#### field

- 클래스 필드(프로퍼티)를 선언할 때 readonly를 추가할 수 있다
  - Piece 클래스의 color

## 5.2 super

- 자바스크립트 처럼 타입스크립트도 super 호출을 지원한다
- 자식 클래스가 부모 클래스에 정의된 메서드를 오버라이드하면 자식 인스턴스는 super를 이용해 부모버전의 메서드를 호출할 수 있다
- super 호출 예시
  - super.take
  - 생성자 함수에서만 호출할 수 있는 super()
    - 자식 클래스에 생성자 함수가 있다면 super()를 호출해야 부모 클래스와 정상적으로 연결된다
      - 이 호출을 깜박 잊으면 타입스크립트가 경고를 해준다
    - 자식 클래스에서 생성자를 생략하고 인스턴스를 만들면 부모클래스의 생성자함수(super)가 실행된다

## 5.3 this를 반환 타입으로 사용하기

```ts
class Set {
  add(value: number): this {
    // ...
  }
}
```

- this : 해당 클래스의 인스턴스
  - this를 반환타입으로 지정할 수도 있다

## 5.4 인터페이스

- 클래스는 인터페이스를 통해 사용할 때가 많다
- 타입 별칭(type, type alias)과 같이 인터페이스도 타입에 이름을 지어주는 수단으로 사용할 수 있다
  - type과 interface는 거의 같은 기능을 수행한다

### type vs. interface

#### 공통점

- 타입 선언

```ts
type Food = {
  calories: number;
  tasty: boolean;
};

interface Food {
  calories: number;
  tasty: boolean;
}
```

#### 차이점

- 타입 확장

```ts
// type에서 확장 : &
type Food = {
  calories: number;
  tasty: boolean;
};

type Sushi = Food & {
  salty: boolean;
};

// interface에서 확장 : extends
interface Food {
  calories: number;
  tasty: boolean;
}

interface Sushi extends Food {
  salty: boolean;
}
```

- 인터페이스는 객체타입, 클래스, 다른 인터페이스 모두를 상속받을 수 있다

```ts
// 인터페이스론 아래와 같은 타입을 작성할 수 없다
type A = number;
type B = A | string;
```

### 5.4.1 선언 합침

```ts
interface User {
  name: string;
}

interface User {
  age: number;
}

const aUser: User = {
  name: "Tony",
  age: 30,
};
```

- interface는 중복 선언이 가능하고 겹치지 않으면 합쳐진다

```ts
type User = {
  name: string;
};

type User = {
  // 에러 => 중복된 식별자
  age: number;
};
```

- type은 중복선언을 할 수 없다

그 외 type vs. interface => interface.ts 참고

### 5.4.2 구현

```ts
{
  interface Animal {
    // readonly name: string;
    eat: (food: string) => void;
    sleep(hours: number): void;
  }

  interface Feline {
    meow: () => void;
  }

  class Cat implements Animal, Feline {
    eat(food: string) {
      console.info("Ate some", food, ". Mmm!");
    }
    sleep(hours: number) {
      console.info("Slept for", hours, "hours");
    }
    meow: () => void;
  }
}
{
  type Animal = {
    // readonly name: string;
    eat: (food: string) => void;
    sleep(hours: number): void;
  };

  type Feline = {
    meow: () => void;
  };

  // type도 클래스에서 interface와 동일하게 implements 될 수 있음
  class Cat implements Animal, Feline {
    eat(food: string) {
      console.info("Ate some", food, ". Mmm!");
    }
    sleep(hours: number) {
      console.info("Slept for", hours, "hours");
    }
    meow: () => void;
  }
}
// readonly 둘다 사용 가능
```

### 5.4.3 인터페이스 구현 vs. 추상 클래스 상속

- 인터페이스 구현과 추상 클래스 상속은 아주 비슷하지만
- 인터페이스가 더 범용적으로 쓰이고 가볍다
- 추상 클래스는 특별한 목적과 풍부한 기능을 갖는는 것이 장점이다
- 인터페이스는 컴파일 타임에만 존재한다
- 추상 클래스는 런타임의 자바스크립트 클래스 코드를 만든다

- 두 개 다 동시에 사용할 수 있다

```ts
class King extends Piece implements Point {}
```

## 5.5 클래스는 구조 기반 타입을 지원한다

- 이름이 달라도 그 안의 구조가 같다면 교차 사용이 허용된다

```ts
class Zebra {
  private trot() {
    console.log("zebra");
  }
}

class Poodle {
  private trot() {
    console.log("poodle");
  }
}

function ambleAround(animal: Zebra) {
  animal.trot();
}

const zebra = new Zebra();
const poodle = new Poodle();

ambleAround(zebra); // OK
ambleAround(poodle); // OK
```

## 5.6 클래스는 값과 타입을 모두 선언한다.

```ts
// 값 또는 타입인 경우
// 값
let a = 999;

// 타입
type a = number;

// 문맥상 타입스크립트는 값 a로 추론하기도 한다
if (a + 1 > 3)
  // 값과 타입을 동시에 생성하는 경우 - class, enum
  class C {}
const c: C = new C(); // C(class)는 타입이면서 동시에 값(생성자 함수)이다

const Week = { Monday: 1 };
const day: Week = Week.Monday; // Week(enum)은 타입이면서 동시에 값(enum)이다
```

## 5.7 다형성

- class에서도 제네릭을 사용할 수 있다

```ts
class MyMap<K, V> {
  constructor(initialKey: K, initialValue: V) {
    // ...
  }
  get(key: K): V {
    // ...
  }
  set(key: K, value: V): void {
    // ...
  }
  // ...
}
```

## 5.8 믹스인

- 타입스크립트에서 trait, mixin 키워드를 제공하지 않지만 손쉽게 구현할 수 있다
- 믹스인 : 동작과 프로퍼티를 클래스로 혼합(mix)할 수 있게 해주는 패턴
  - 믹스인 규칙
    - 상태를 가질 수 있다(e.g., 인스턴스 프로퍼티)
    - 구체 메서드만 제공할 수 있다(추상 메서드는 안 됨)
    - 생성자를 가질 수 있다(클래스가 혼합된 순서와 같은 순서로 호출됨)

## 5.9 데코레이터

- 장식하는 대상의 함수를 호출하는 기능을 제공하는 문법

```ts
@serializable
class APIPayLoad {
  getValue(): Payload {
    // ...
  }
}

// 위와 동일한 코드
let APIPayload = serializable(
  class APIPayLoad {
    getValue(): Payload {
      // ...
    }
  }
);
```

- @serializable은 APIPayLoad를 감싸고 있으며 선택적으로 이를 대체하는 새 클래스를 반환한다
- serializable이라는 함수의 parameter로 데코레이터 아래에 있는 것을 받은 후
  - serializable을 실행 시키고
  - 그 return값을 APIPayload로 전달

#### more about decorator

- [5-9_decorator](./5-9_decorator.md)

## 5.10 final 클래스 흉내내기

- final 클래스 : 클래스나 메서드를 확장하거나 오버라이드할 수 없게 만드는 기능
- private으로 생성자를 만드는 것과 static 메서드를 이용해서 final 클래스를 흉내낼 수 있다

## 5.11 디자인 패턴

### 5.11.1 팩토리 패턴

어떤 객체를 만들지 전적으로 팩토리에 위임한다

```ts
// factory pattern
// type 대신 interface를 이용해도 됨
type Shoe = {
  purpose: string;
};

class BalletFlat implements Shoe {
  purpose = "dancing";
}

class Boot implements Shoe {
  purpose = "woodcutting";
}

class Sneaker implements Shoe {
  purpose = "walking";
}

const Shoe = {
  create(type: "balletFlat" | "boot" | "sneaker") {
    switch (type) {
      case "balletFlat":
        return new BalletFlat();
      case "boot":
        return new Boot();
      case "sneaker":
        return new Sneaker();
      default:
        throw new Error("unexpected type");
    }
  },
};

const balletFlat: BalletFlat = Shoe.create("balletFlat");
```

### 5.11.2 빌더 패턴

- ES6의 Map, Set 등의 자료 구조에서도 사용

```ts
new RequestBuilder()
  .setURL("/users")
  .setMethod("get")
  .setData({ firstName: "Tony" })
  .send();
```
