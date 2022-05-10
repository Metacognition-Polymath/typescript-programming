# 4. 함수

- 학습 목표
  - 타입스크립트에서 함수를 선언하고 실행하는 다양한 방법
  - 시그니처 오버로딩
  - 다형적 함수
  - 다형적 타입 별칭

## 4.1 함수 선언과 호출

- 자바스크립트의 함수는 일급 객체이다.
  - 함수를 객체처럼 사용할 수 있다
- 타입 추론을 이용하자
  - 타입스크립트가 할 일을 개발자가 할 필요는 없다
- parameter vs. argument

### 4.1.1 선택적 매개변수와 기본 매개변수

- default parameter
- optional type

```ts
// 선택적 매개변수
function log(message: string, userId?: string) {
  const time = new Date().toISOString();
  console.log(time, message, userId || "Not signed in");
}

// 기본 매개변수
function log(message: string, userId = "Not signed in") {
  // userId가 string으로 자동으로 추론된다
  const time = new Date().toISOString();
  console.log(time, message, userId);
}
```

### 4.1.2 나머지 매개변수

- arguments 변수 대신 ...numbers: number[] 와 같이 rest parameter를 이용하자

### 4.1.3 call, apply, bind

- 함수를 호출 하는 또 다른 방법들(this binding methods)

### 4.1.4 this의 타입

- this : 접근연산자 왼쪽 값을 갖는다

### 4.1.5 제너레이터 함수

```ts
// 4.1.5 제너레이터
function* createFibonacciGenerator() {
  let a = 0;
  let b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const fibonacciGen = createFibonacciGenerator();
console.log(fibonacciGen.next()); // { value: 0, done: false }
console.log(fibonacciGen.next()); // { value: 1, done: false }
console.log(fibonacciGen.next()); // { value: 1, done: false }
console.log(fibonacciGen.next()); // { value: 2, done: false }
```

### 4.1.6 반복자(iterator)

- 이터러블 프로토콜의 next 메서드를 정의한 객체

### 4.1.7 호출 시그니처

함수의 타입을 표현하는 방법

```ts
// 1
type Sum = (a: number, b: number) => number;
function sum(a: number, b: number) {
  return a + b;
}

// 2
type Log = (message: string, userId?: string) => void;
function log(message: string, userId = "Not signed in") {
  const time = new Date().toISOString();
  console.log(time, message, userId);
}
```

### 4.1.8 문맥적 타입화

```ts
// 기본 매개변수
function log(message: string, userId = "Not signed in") {
  // userId가 string으로 자동으로 추론된다
  const time = new Date().toISOString();
  console.log(time, message, userId);
}
```

위 와 같이 타입을 지정하지 않아도 타입스크립트는 타입을 잘 추론한다

### 4.1.9 오버로드된 함수 타입

```ts
// 단축형 호출 시그니처
type Log = (message: string, userId?: string) => void;

// 전체 호출 시그니처
type Log = {
  (message: string, userId?: string): void;
};
```

- 간단한 함수는 단축형을 사용하고 복잡한 함수라면 전체 시그니처를 사용하는 것이 좋을 때도 있다

  - 함수타입의 오버로딩(overloading)

- 오버로딩 할 생각 하지말자
  - 제네릭을 이용하자

## 4.2 다형성

- 오버로딩 X
- 제네릭 O

```ts
type Filter = {
  <T>(array: T[], f: (item: T) => boolean): T[];
};
```

- T : 제네릭 타입의 매개변수 | 제네릭 타입 | 제네릭
- 제네릭 매개변수

  - T, U, V, W 순으로 필요한 만큼 사용

- 가능하면 제네릭을 사용하자
- 제네릭은 코드를 일반화하고, 재사용성을 높이고, 간결하게 유지하는 데 도움을 준다

### 4.2.1 언제 제네릭 타입이 한정되는가?

- 제네릭 타입을 `사용하는 순간`에 타입을 한정한다
  - 함수 : 함수 호출 시
  - 클래스 : 인스턴스 생성 시

### 4.2.2 제네릭을 어디에 선언할 수 있을까?

```ts
type Filter = <T>(arr: T[], f: (item: T) => boolean) => T[];

const filter: Filter = (arr, f) => arr.filter(f);

// 보통 함수에 직접 사용함(내 개인적으로)
const filter1 = <T>(arr: T[], f: (item: T) => boolean): T[] => {
  return arr.filter(f);
};

function filter2<T>(arr: T[], f: (item: T) => boolean): T[] {
  return arr.filter(f);
}
```

### 4.2.3 제네릭 타입 추론

- 제네릭으로 만든 함수에서 제네릭을 사용하지 않아도 자동으로 추론이 된다
  - 개인적으로 제네릭에 전달하는 것을 선호함

```ts
const promise = new Promise<number>((resolve) => resolve(45));
promise.then((result) => result * 4); // result : number
```

### 4.2.4 제네릭 타입 별칭

```ts
type MyEvent<T> = {
  target: T;
  type: string;
};

type TimedEvent<T> = {
  event: MyEvent<T>;
  from: Date;
  to: Date;
};
```

### 4.2.5 한정된 다형성

```ts
function numOrStr<T extends number | string>(param: T): T {
  return param;
}

console.log(numOrStr<string>(`1`));
```

- T가 string 이나 number가 아니면 에러가 발생

```ts
type Side = {
  side: string;
};

type SideExtends = Side & {
  isExtend?: boolean;
};
```

### 4.2.6 제네릭 타입 기본값

```ts
type MyEvent<T extends HTMLElement = HTMLElement> = {
  target: T;
  type: string;
};

type MyEvent1<Type extends string, Target extends HTMLElement = HTMLElement> = {
  target: Target;
  type: Type;
};
```

- extends와 기본값을 같이 사용할 수 있다

## 4.3 타입 주도 개발

- 타입 시그니처를 먼저 정하고 값을 나중에 채우는 프로그래밍 방식

```ts
function map<T, U>(array: T[], f: (item: T) => U): U[] {
  // ...
}
```

- 위 함수의 타입만 봐도 어떤 동작을 하는지 어느정도 감을 잡을 수 있다
  - 이 처럼 타입을 먼저 정의하고 그 안을 나중에 채우는 방식이 타입 주도 개발이다

## 4.4 마치며

- 이번 장에서 공부한 것들
  - 매개변수의 타입 지정 방법
  - 매개변수 기본 값
  - 나머지 매개변수
  - 제네레이터 함수
  - 제네릭

## 연습문제

1. 모두
2. arguments는 나머지 매개변수로 대체하자
3. X
4. X
5. 아래 코드

```ts
function is<T>(...arr: T[]): boolean {
  const [first, second] = arr;
  return first === second;
}
```
