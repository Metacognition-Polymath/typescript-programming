class Restaurant {
  // 인터페이스에서 상속받아서 사용하려면 public이어야 한다
  constructor(public clientCount: number) {}
}
{
  type Food = {
    calories: number;
    tasty: boolean;
  };

  // 인터페이스는 타입도 상속 받을 수 있다
  // 인터페이스는 클래스도 상속받을 수 있지만 public 필드가 아닌 것은 에러를 유발
  interface Sushi extends Food, Restaurant {
    salty: boolean;
  }

  const sushi: Sushi = {
    calories: 1,
    tasty: true,
    salty: true,
    clientCount: 10,
  };
}
{
  interface Food {
    calories: number;
    tasty: boolean;
  }

  // 타입도 인터페이스, 클래스로부터 확장할 수 있다
  type Sushi = Food &
    Restaurant & {
      salty: boolean;
    };

  const sushi: Sushi = {
    calories: 1,
    tasty: true,
    salty: true,
    clientCount: 10,
  };
}
{
  // 중복
  interface AB {
    a: string;
    b: unknown;
  }

  interface BC extends AB {
    b: string; // Error : Type 'string' is not assignable to type 'number'.
    c: string;
  }

  const abc: BC = {
    a: "a",
    b: "b",
    c: "c",
  };
}

{
  // 중복
  type AB = {
    a: string;
    b: unknown;
  };

  type BC = AB & {
    b: string; // type은 확장 시 에러는 없는 것 처럼 보이지만 두개의 & 로 취급한다 => 교집합이 없으면 never가 됨
    c: string;
  };

  const abc: BC = {
    a: "a",
    b: "b",
    c: "c",
  };

  // const test: number & string; // never
}
// 결론 type 이나 interface나 둘다 unknown으로 부터 확장하는 것은 가능
// 교집합이 없는 경우엔 어딘가에서 에러 발생(interface는 interface에서 에러, type은 사용 시점에서 never)
