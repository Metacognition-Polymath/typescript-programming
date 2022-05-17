# 6장. 고급타입

## 학습목표

- 타입스크립트의 서브타입화
- 할당성, 가변성, 넓히기 -> 타입스크립트 개념 확장
- 정제, 종합성 -> 제어 흐름 기반의 타입확인 기능
- 객체 타입을 키로 활용하고 매핑하는 방법
- 조건부 타입 사용
- 자신만의 타입 안전 장치 정의
- 타입 어셔션
- 확실한 할당 어서션
- 타입 안전성을 높일 수 있는 방법들
  - 컴패니언 객체 패턴
  - 튜플 타입의 추론 개선
  - 이름 기반 타입 흉내내기
  - 안전하게 프로토타입 확장하기

## 6.1 타입 간의 관계

- A와 A1가 있고 A가 A1의 서브타입이면 A1이 필요한 곳이면 어디든 A를 안전하게 사용할 수 있다

| 슈퍼타입 | 서브타입 |
| :------: | :------: |
|   객체   |   배열   |
|   배열   |   튜플   |
|   any    | 모든 것  |
| 모든 것  |  never   |

#### 슈퍼 타입(부모) <-> 서브 타입(자식)

## 6.1.2 가변성

- 타입 호환이 되려면 지정된 타입의 서브타입(자식)이 필요
- 즉 지정된 타입을 모두 포함하고 있는 타입이 와야 한다

## 6.1.3 할당성

- 할당할 수 있는가

## 6.1.4 타입 넓히기

- as const 를 사용하면 타입 넓히기가 중지되고 멤버들 까지 자동으로 readonly가 된다

  - 중첩된 자료구조에도 재귀적으로 적용된다

- as const를 제외하곤 as는 쓰지말자

## 6.1.5 정제

- 함수안의 if문에서 특정 타입일 때 return 시킴으로써 그 아래 코드들은 해당 타입을 제외하는 것으로 추론 됨
  - null 또는 undefined일 때 early return할 때 주로 사용

## 6.3 고급 객체 타입

### 6.3.1 객체 타입의 타입 연산자

#### key in

```ts
type APIResponse = {
  user: {
    userId: string;
    friendList: {
      count: number;
      friends: {
        firstName: string;
        lastName: string;
      }[];
    };
  };
};

type FriendList = APIResponse["user"]["friendList"];
```

#### keyof 연산자

- 객체의 모든 키를 문자열 리터럴 타입 유니온으로 얻을 수 있다

```ts
type UserKeys = keyof APIResponse["user"]; // "userId" | "friendList";
```

- tsconfig에서 keyofStringsOnly를 활성화하면 string으로 간주한다
  - 아니면 string | number | Symbol

### 6.3.2 Record 타입

```ts
type Weekday = "Mon" | "Tue" | "Wed" | "Thu" | "Fri";
type Day = Weekday | "Sat" | "Sun";
// 6.3.2 Record 타입
const nextDay: Record<Weekday, Day> = {
  Mon: "Tue",
};

// 6.3.3 Mapped type
const nextDay1: { [key in Weekday]: Day } = {
  Mon: "Tue",
};
```

- Mapped type은 Record보다 강력하다
  - 키인 타입과 조합하면 키 이름별로 매핑할 수 있는 값 타입을 제한할 수 있기 때문이다

```ts
/* ** Mapped type 예시 ** */
type Account = {
  id: number;
  isEmployee: boolean;
  notes: string[];
};

// 모든 필드를 선택형으로 만듦
type OptionalAccount = {
  [K in keyof Account]?: Account[K];
};

// 모든 필드를 nullable로 만듦
type NullableAccount = {
  [K in keyof Account]: Account[K] | null;
};

// 모든 필드를 읽기 전용으로 만듦
type ReadonlyAccount = {
  readonly [K in keyof Account]: Account[K];
};

// 모든 필드를 다시 쓸수 있도록 만듦(Account와 같음)
type Account2 = {
  -readonly [K in keyof ReadonlyAccount]: Account[K]; // -를 붙이는 것은 처음보네
};

// 모든 필드를 다시 필수형으로 만듦(Account와 같음)
type Account3 = {
  [K in keyof OptionalAccount]-?: Account[K];
};
```

#### 내장 매핑된 타입

`Record<keys, Values>`

- key 타입과 values 타입의 값을 갖는 객체

`Partial<Obj>`

- Obj의 모든 필드를 선택형으로 표시

`Required<Obj>`

- Obj의 모든 필드를 필수형으로 표시

`Readonly<Obj>`

- Obj의 모든 필드를 읽기 전용으로 표시

`Pick<Obj, Keys>`

- 주어진 Keys에 대응하는 Object의 서브타입을 반환

```ts
// Pick
type Student = {
  id: number;
  name: string;
  age: number;
};
const student: Pick<Student, "id" | "name"> = {
  id: 1,
  name: "Tony",
};
// type Pick<T, K extends keyof T> = { [P in K]: T[P]; }
```

### 6.3.4 컴패니언 객체 패턴

- 같은 이름을 공유하는 객체와 클래스를 쌍으로 연결
  - 스칼라에서 유래
  - e.g., Class
    - 타입과 값은 별도의 네임스페이르를 갖는데 클래스는 컴패니언 객체 패턴이 적용되어
    - 값과 타입이 같은 이름으로 한번에 정의 됨

```ts
type Currency = {
  unit: "EUR" | "GBP" | "JPY" | "USD";
  value: number;
};

let Currency = {
  DEFAULT: "USD",
  from(value: number, unit = Currency.DEFAULT): Currency {
    return { unit, value };
  },
};

// class Currency
// ...
```

## 6.4 고급 함수 타입들

### 6.4.1 튜플의 타입 추론 개선

```ts
// bad
const aTuple = [a, true]; // (number | boolean)[]

// good
function tuple<T extends unknown[]>(...t: T) {
  return t;
}

const bTuple = tuple(1, true); // [number, boolean]
```

### 6.4.2 사용자 정의 타입 안전 장치

```ts
// is : 리턴 시 파라미터의 타입을 지정 - type-predicates
// https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
function isString(a: unknown): a is string {
  return typeof a === "string";
} // return 타입은 boolean이지만 그 때 a는 string으로 좁혀진다

function parseInput(input: string | number) {
  let formattedInput: string;
  if (isString(input)) {
    formattedInput = input.toUpperCase(); // string에만 존재하는 toUpperCase()를 사용해도 에러가 발생하지 않음
  }
}
```

## 6.5 조건부 타입
