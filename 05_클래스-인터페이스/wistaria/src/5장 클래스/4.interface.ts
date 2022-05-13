
// 1. 인터페이스는 오른쪽에 블록형태를 필요로 한다.
// 2. 인터페이스는 다른 인터페이스 뿐 아니라 객체타입, 클래스도 상속받을 수 있다.
// 3. 인터페이스의 상속은 할당 가능성을 따진다. (장점)
// 4. 인터페이스는 같은 이름으로 선언된 다른 블록형태를 자동으로 합친다.(선언합침)

{// 타입알리아스의 블록형태식은 인터페이스로 전환가능하다
  type Sushi = {
    calories: number;
    salty: boolean;
    tasty: boolean;
  }
}
{ // 1. 인터페이스는 오른쪽에 블록형태를 필요로 한다.
  interface Sushi {
    calories: number;
    salty: boolean;
    tasty: boolean;
  }
  // 다음과 같은 타입알리아스는 인터페이스로 전환이 불가능(블록형태가 없음)
  type A = number
  type B = string | A

  // 타입알리아스가 인터페이스보다 더 일반화된 표현이다.
}



{// 타입알리아스 인터섹션
  type Food = {
    calories: number;
    tasty: boolean;
  }
  type Sushi = Food & {
    salty: boolean;
  }
  type Cake = Food & {
    sweet: boolean;
  }
}
{// 인터페이스 상속
  interface Food {
    calories: number;
    tasty: boolean;
  }
  interface Sushi extends Food {
    salty: boolean;
  }
  interface Cake extends Food {
    sweet: boolean;
  }
  // 2. 인터페이스는 다른 인터페이스 뿐 아니라 객체타입, 클래스도 상속받을 수 있다.
}

{
  // 3. 인터페이스의 상속은 할당 가능성을 따진다.
  interface A {
    good(x:number):string
    bad(x:number):string
  }
  interface B extends A {
    good(x:number|string):string
    bad(x:string):string
  }
  // ts(2430) 'B' 인터페이스가 'A' 인터페이스를 잘못 확장합니다.
  // 'bad' 속성의 형식이 호환되지 않습니다.
}

{
  // 타입알리아스는 할당가능성을 따지지 않고 조합하여 오버로딩한다.
  type A = {
    good(x:number):string
    bad(x:number):string
  }
  type B = A & {
    good(x:number|string):string
    bad(x:string):string
  }
  const C:B = {
    good(x){ return x.toString() },
    bad(x){ return x.toString() }
    //(method) bad(x: number): string (+1 overload)
  }
}

{
// 4. 인터페이스는 같은 이름으로 선언된 다른 블록형태를 자동으로 합친다.(선언합침)
  interface A {
    good(x:number):string
  }
  interface A {
    bad(x:number):string
  }
  const a:A = { // 오류 없음
    good(x){ return x.toString() },
    bad(x){ return x.toString() }
  }
}

