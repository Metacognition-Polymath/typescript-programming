{
  function filter(array, f) {
    let result = []
    for (let i = 0; i < array.length; i++) { 
      let item = array[i] 
      if (f(item)) { result.push(item) } 
    }
    return result 
  }
  
  filter([1, 2, 3, 4], _=>_<3) // [1, 2]로 평가
} 

{ // 전체 타입 시그니처를 만들어보자
  type Filter = {
    (array:unknown, f:unknown):unknown[]
  }
}

{ // 구체타입을 넣어보자.
  type Filter = {
    (array:number[], f:(item:number)=>boolean):number[]
  }
}

{ // 문자열 처리도 가능하도록 오버로드를 활용해 함수를 확장하자
  type Filter = {
    (array:number[], f:(item:number)=>boolean):number[]
    (array:string[], f:(item:string)=>boolean):string[]
  }
}

{ // 객체 배열도 지원할 수 있을까
  type Filter = {
    (array:number[], f:(item:number)=>boolean):number[]
    (array:string[], f:(item:string)=>boolean):string[]
    (array:object[], f:(item:object)=>boolean):object[]
  } // 실제 사용해보면 문제가 발생한다.

  let names = [
    {firstName: 'beth'},
    {firstName: 'jane'},
    {firstName: 'jill'},
  ]
  const filter:Filter = function(array, f) {
    let result = []
    for (let i = 0; i < array.length; i++) { 
      let item = array[i] 
      if (f(item)) { result.push(item) } 
    }
    return result 
  }

  let result = filter(names, _=>_.firstName.startsWith('j'))
  // 'object' 형식에 'firstName' 속성이 없습니다.ts(2339)
}// object에 뭐가 있는지 모르기 때문에 오류를 발생

{ 
  // 제네릭을 사용하면 된다.
  // T, U, V, W 순으로 필요한만큼 사용한다.
  type Filter<T> = {
    (array:T[], f:(item:T)=>boolean):T[]
  }
  const filter:Filter = function(array, f) {
    let result = []
    for (let i = 0; i < array.length; i++) { 
      let item = array[i] 
      if (f(item)) { result.push(item) } 
    }
    return result 
  }
  let names = [
    {firstName: 'beth'},
    {firstName: 'jane'},
    {firstName: 'jill'},
  ]
  let result = filter(names, _=>_.firstName.startsWith('j'))
}