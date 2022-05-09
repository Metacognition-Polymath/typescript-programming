{
  // 열거형(enum)은 해당 타입으로 사용할 수 있는 값을 열거하는 기법이다. 열거형은 키를 값에 할당하는, 순서가 없는 자료구조다. 키가 컴파일 타임에 고정된 객체라고 생각하면 쉽다. 따라서 타입스크립트는 키에 접근할 때 주어진 키가 실제 존재하는지 확인할 수 있다.

  // 열거형의 이름은 단수 명사로 쓰고, 첫 문자는 대문자로 하는 것이 관례다.

  enum Language { English, Spanish, Russian=2 } // 값 자동 추론, 명시
  //(보통의 객체에서 값을 가져올 때처럼) 점 또는 괄호 표기법으로 열거형 값에 접근
  Language.English; // 0
  Language.Spanish; // 1
  Language["Russian"]; // 2
  // 열거형은 값을 추가할 수 있다.
  enum Language { Korean = 3 } // 단 추가한 값의 자동추론은 지원하지 않아 명시해야한다
  Language.Korean; // 3
  // 값은 추론보다 명시하는 쪽으로 사용하는 것이 좋다.

  // 값은 문자열과 숫자형의 혼합사용이 가능하다.
  enum Color { Red = '#c10000', Blue = '#007ac1', Pink = 0xc10050, White = 255 } // 16진수 리터럴 // 10진수 리터럴

  Color.Red
  Color.Blue
  Color.Pink
  Color.White // 마우스 올려서 확인

  let b = Color.Green // 없는 문자열은 접근이 불가하지만
  let c = Color[255] // string 
  let d = Color[6] // 없는 인덱스 접근이 가능 let d: string (!!!)
  // 이를 방지하려면 const 를 사용한다
}
{
  const enum Color { Red = '#c10000', Blue = '#007ac1', Pink = 0xc10050, White = 255 } // 16진수 리터럴 // 10진수 리터럴

  Color.Red
  Color.Blue
  Color.Pink
  Color.White // 점표기법으로 맞는 값에 접근 가능하지만

  let b = Color.Green // 없는 문자열은 접근 불가
  let c = Color[255] // 인덱스 값도 접근 불가능
  let d = Color[6] 
}
