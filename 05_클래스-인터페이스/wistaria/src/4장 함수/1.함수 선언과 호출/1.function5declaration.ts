{
  // 자바스크립트의 함수는 일급객체, 일급함수
  // 면접용으로 공부할 것

  // 타입스크립트가 할 일을 개발자가 할 필요는 없다.
  // 추론가능한 부분은 하게 냅두자
  // 함수 반환값은 추론하게
}


{
  // 이름을 붙인 함수 
  function greet(name: string) { 
    return 'hello!' + name 
  }
  // 함수 표현식 
  let greet2 = function (name: string) { 
    return 'hello' + name 
  }
  // 화살표 함수 표현식 
  let greet3 = (name: string) => {
    return 'hello' + name
  }
  // 단축형 화살표 함수 표현식
  let greet4 = (name: string) => 'hello'+ name
  // 함수 생성자 : 타입스크립트 사용 불가
  let greet5 = new Function('name', 'return "hello " + name')

  greet3('홍길동')
}

{
  // 선택적 매개변수 추론도 가능. 초기화값만 주면
  function log(msg:string, userId = "unknown") {
    console.log(msg, userId)
  }
}
