{
  // 4.1.1
  type Log1 = {
    (message: string, userId?: string): void;
  };
  // function log(message: string, userId?: string): void // log함수의 타입
  type Log = (message: string, userId?: string) => void;
  function log(message: string, userId = "Not signed in") {
    // userId가 string으로 자동으로 추론된다
    const time = new Date().toISOString();
    // console.log(time, message, userId);
  }

  const log1: Log1 = (message: string, userId = "Not signed in") => {
    const time = new Date().toISOString();
    // console.log(time, message, userId);
  };

  // log("hi I am Tony");
}
{
  // 4.1.5 제너레이터
  function* createFibonacciGenerator(): Generator<number, void, unknown> {
    let a = 0;
    let b = 1;
    while (true) {
      yield a;
      [a, b] = [b, a + b];
    }
  }

  const fibonacciGen = createFibonacciGenerator();
  // console.log(fibonacciGen.next());
  // console.log(fibonacciGen.next());
  // console.log(fibonacciGen.next());
  // console.log(fibonacciGen.next());
}
{
  // 4.1.7
  type Sum = (a: number, b: number) => number;
  const sum: Sum = (a: number, b: number) => {
    return a + b;
  };
}
{
  // 4.1.9 함수타입 오버로딩
  // type CreateElement = {
  //   (tag: "a"): HTMLAnchorElement;
  //   (tag: "canvas"): HTMLCanvasElement;
  // };
  // 오버로딩은 쓰지말자
}
{
  // 4.2 다형성 -> 제네릭
  type Filter = {
    <T>(array: T[], f: (item: T) => boolean): T[];
  };
  type FilterShort = <T>(array: T[], f: (item: T) => boolean) => T[];
}
{
  // 4.2.2 제네릭 선언 방법들
  type Filter = <T>(arr: T[], f: (item: T) => boolean) => T[];

  const filter: Filter = (arr, f) => arr.filter(f);

  const fun1 = (num: number) => true;
  const fun2 = (str: string) => true;
  filter([1, 2], fun1); // 제네릭을 사용하지 않았지만 자동으로 추론 됨
  filter<string>(["1", "2"], fun2); // 제네릭을 사용

  // 보통 함수에 직접 사용함(내 개인적으로)
  const filter1 = <T>(arr: T[], f: (item: T) => boolean): T[] => {
    return arr.filter(f);
  };

  function filter2<T>(arr: T[], f: (item: T) => boolean): T[] {
    return arr.filter(f);
  }
}
{
  function map<T, U>(array: T[], f: (item: T) => U): U[] {
    const result = [];
    for (let i = 0; i < array.length; i++) {
      result[i] = f(array[i]);
    }
    return result;
  }
}
{
  // 4.2.5 한정된 다형성
  function numOrStr<T extends number | string>(param: T): T {
    return param;
  }

  console.log(numOrStr<string>(`1`));

  type Side = {
    side: string;
  };

  type SideExtends = Side & {
    isExtend?: boolean;
  };

  const sideExtend: SideExtends = {
    side: "bottom",
    isExtend: true,
  };
}

{
  // 4.2.6 제네릭 타입 기본값
  // type MyEvent<T extends HTMLElement = HTMLElement> = {
  //   target: T;
  //   type: string;
  // };
  // type MyEvent1<
  //   Type extends string,
  //   Target extends HTMLElement = HTMLElement
  // > = {
  //   target: Target;
  //   type: Type;
  // };
}
{
  // 연습문제
  // 5.
  function is<T>(...arr: T[]): boolean {
    const [first, second] = arr;
    return first === second;
  }

  console.log(is([1], [1, 2]));
}
