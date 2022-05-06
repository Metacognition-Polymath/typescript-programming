// 3-1
{
  function squareOf(n: number) {
    return n * n;
  }
}
{
  type A = {
    a: string;
    b: number;
  };

  type C = A & {
    // b: string; // make b unknown
    c: string[];
  };

  const abc: C = {
    a: "a",
    b: 1,
    c: ["c"],
  };
}
{
  interface A {
    a: string;
    b: number;
  }

  interface C extends A {
    // b: string; // error
    c: string[];
  }

  const abc: C = {
    a: "a",
    b: 1,
    c: ["c"],
  };
}

// 3.2

{
  let a; // implicitly any
}
{
  let a: unknown = 30;
  let b = a === 123; // unknown도 비교연산 지원 됨
  // let c = a + 10; // 산술연산 지원 안됨 - Operator '+' cannot be applied to types 'unknown' and '10'.
}
{
  function throwError(flag: boolean) {
    if (flag) {
      return "aa";
    }
    throw new Error("this is error");
  }
  const objA: Readonly<{ a: number }> = {
    a: 1,
  };
  // objA.a = 2;
  const objB = Object.freeze({
    a: 1,
  });
  // objB.a = 2;
  // function e() {
  //   while (true) {
  //     console.log("a");
  //   }
  // }
  // const err = throwError();
}
{
  function handleClick<T = unknown>(obt: T) {
    obt;
  }

  type AUnion = "a" | "b";
  const str: AUnion = "a" as const;
  type Obj1 = {
    a: string;
    b: string;
  };
  type Obj2 = {
    c: string;
    d: string;
  };
  type ObjUnion = Obj1 | Obj2;
  const obj1: ObjUnion = {
    a: "a",
    b: "b",
    c: "c",
  };
  type ObjIntersection = Obj1 & Obj2;
  const obj2: ObjIntersection = {
    a: "a",
    b: "b",
    c: "c",
    d: "d",
  };
}
{
  const g = ["a", "b"];
  const [a, b] = g;
}
