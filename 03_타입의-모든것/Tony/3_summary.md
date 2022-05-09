# 3장. 타입의 모든 것

- 타입(type) : 값과 이 값으로 할 수 있는 일의 집합

![그림3-1 타입스크립트의 타입 계층](https://gusrb3164.github.io/assets/images/posts/ts-types.jpg)

- 그림3-1 타입스크립트의 타입 계층

## 3.1 타입을 이야기하다

```ts
function squareOf(n: number) {
  return n * n;
}
```

- 함수의 파라미터에 어노테이션(타입)을 지정하지 않으면 아무타입이나 인수로 전달할 수 있다

## 3.2 타입의 가나다

- 타입 extends

  - https://www.typescriptlang.org/docs/handbook/advanced-types.html#interfaces-vs-type-aliases
  - 이번 챕터와는 관련없지만 개인적으로 궁금해서 찾아봄 - intersection type 때문에

### 3.2.1 any

![as any meme](https://pbs.twimg.com/media/EmaLvbBXcAAJwQV.jpg)

- any로 뭐든 할 수 있지만 타입스크립트를 사용하는 의미가 없어진다

### 3.2.2 unknown

- 타입을 미리 알 수 없는 어떤 값이 있을 때 any 대신 unknown을 사용하자
- 제네릭을 만들어서 사용한다면 any 대신 unknown을 사용할 수 있을 것 같다
- unknown 이 지원하는 연산
  - 비교(==, ===, ||, &&, ?), 반전(!)
  - 자바스크립트의 typeof, instanceof

```ts
let a: unknown = 30;
let b = a === 123; // unknown도 비교연산 지원 됨
// let c = a + 10; // 산술연산 지원 안됨 - Operator '+' cannot be applied to types 'unknown' and '10'.
```

### 3.2.3 boolean

### 3.2.4 number

### 3.2.5 bigint

### 3.2.6 string

### 3.2.7 symbol

### 3.2.8 객체

```ts
let seats: { [seatNumber: string]: string }; // 인덱스 시그니처
```

- 인덱스 시그니처 : 해당 타입이 여러 개 포함될 수 있다는 의미

### 3.2.9 타입별칭, 유니온, 인터섹션

- 유니온(TypeA | TypeB) => 각각, 합쳐진 것, 합치다 만것 모두 다 됨
- 인터섹션(TypeA & TypeB) => 모두 합쳐진 것만 됨

### 3.2.10 배열

### 3.2.11 튜플

### 3.2.12 null, undefined, void, never

### 3.2.13 열거형

- 단점 : tree shaking이 안됨
