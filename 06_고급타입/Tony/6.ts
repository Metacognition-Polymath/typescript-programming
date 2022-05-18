{
  // 6.1.2 가변성
  type A = {
    a: number;
  };

  type A1 = A & {
    a1: number;
  };

  type A2 = A1 & {
    a2: number;
  };

  function funcA1(a1: A1): A1 {
    return a1;
  }

  const ObjA: A = {
    a: 1,
  };

  const ObjA1: A1 = {
    a: 1,
    a1: 2,
  };

  const ObjA2: A2 = {
    a: 1,
    a1: 2,
    a2: 3,
  };

  funcA1(ObjA2);
}
{
  // 6.1.4 as const
  const asConst = {
    a: {
      a1: "a1",
      a2: {
        a21: "a21",
        a22: "a22",
      },
    },
    b: "b",
  }; // as const;
  type AUnion = "a" | "b";
  // let a = 'a';
  const asConst1: typeof asConst = {
    a: {
      a1: "aa1",
      a2: {
        a21: "aa21",
        a22: "aa22",
      },
    },
    b: "bb",
  };
}
{
  // 6.3.1 key in, key of
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

  type FriendListDuck = {
    count: number;
    friends: {
      firstName: string;
      lastName: string;
    }[];
  };

  const duck: FriendListDuck = {
    count: 1,
    friends: [
      {
        firstName: "firstName",
        lastName: "lastName",
      },
    ],
  };

  function funcA(friendList: FriendList): FriendList {
    return friendList;
  }

  funcA(duck);

  // key of
  type ResponseKeys = keyof APIResponse; // "user";
  type UserKeys = keyof APIResponse["user"]; // "userId" | "friendList";
}
{
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
}
{
  type Account = {
    id: number;
    isEmployee: boolean;
    notes: string[];
  };
  /* ** Mapped type 예시 ** */

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
}
{
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
}
{
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
}
{
  // 6.5.1
  type ToArray<T> = T extends unknown ? T[] : T[];
  type A = ToArray<number>;
  type B = ToArray<number | string>; // (number | string)[] 가 아닌 number[] | string[] 이다
  // const arr: B = [1, "a"]; // error

  type Without<T, U> = T extends U ? never : T;

  type WithoutA = Without<boolean | number | string, boolean>; // number | string
}
{
  // 6.5.2 infer
  type ElementType<T> = T extends unknown[] ? T[number] : T; // T[]를 전달했을 때
  type A = ElementType<number[]>; // number
  type B = ElementType<string[]>; // string
  type AA = ElementType<string>; // string
  type C = number extends unknown[] ? true : false;
  type D = number[][number]; // number

  // infer로 표현하기
  type ElementType2<T> = T extends (infer U)[] ? U : T; // 이해가 잘 안됨 안쓸 듯
}
{
  // 6.5.3 내장 조건부 타입들
  type A = number | string | boolean;
  type B = string | boolean;
  type C = Exclude<A, B>; // number
}
{
  type A = number | string | boolean;
  type B = string;
  type C = Extract<A, B>; // string
}
{
  type Dialog = {
    id?: string;
  };
  function removeFromDOM(dialog: Dialog, element: Element) {
    element.parentNode!.removeChild(element); // 옵셔널 체이닝 처럼 느낌표를 넣어서 nonnull임을 표시
    delete dialog.id;
  }
}
{
  type Obj0 = {
    a: string;
  };
  type Obj1 = {
    a: string;
    b: number;
  };
  type Obj2 = {
    a: string;
    b: number;
    c: boolean;
  };
  function func1(obj: Obj1) {
    return obj;
  }

  const obj: Obj2 = {
    a: "a",
    b: 1,
    c: true,
  };
  const obj0: Obj0 = {
    a: "aa",
  };
  func1(obj); // 더 커도 포함이 되니까 됨
  func1(obj0); // 포함이 안되니까 안됨
}
{
  // 연습문제
  type Exclusive<T, U> = Exclude<T, U> | Exclude<U, T>;
  type R = Exclusive<1 | 2 | 3, 2 | 3 | 4>; // 1 | 4
  type U = Exclusive<1 | 2, 2 | 4>;
}

{
  // 4. Rewrite the example (from Definite Assignment Assertions) to avoid the definite assignment assertion.

  const globalCache = {
    get(key: string) {
      return "user";
    },
  };

  const userId = fetchUser();
  userId.toUpperCase();

  function fetchUser() {
    return globalCache.get("userId");
  }
}
