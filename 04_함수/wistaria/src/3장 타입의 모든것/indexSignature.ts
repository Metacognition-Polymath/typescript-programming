{  
  // 인덱스 시그니쳐
  // [key: T]: U 같은 문법을 인덱스 시그니처라 부르며 타입스크립트에 어떤 객체가 여러 키를 가질 수 있음을 알려준다. “이 객체에서 모든 T 타입의 키는 U 타입의 값을 갖는다”라고해석할 수 있다. 인덱스 시그니처를 이용하면 명시적으로 정의한 키 외에 다양한 키를 객체에 안전하게 추가할 수 있다.
  // 키값으로 가능한 타입은 'string', 'number', 'symbol' 또는 템플릿 리터럴 형식을 사용한다.

  type node = {name:string}

  type edge = {
    name: string,
    category: string,
    [nodeId:number]: node,
  }

  const edge:edge = {
    name: "edge",
    category: "plant has",
    1: {name:"tree"},
    2: {name:"flower"},
    3: {name:"grass"},
  }
}