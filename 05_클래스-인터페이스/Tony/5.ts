{
  // 5.6
  let a = 999;

  // 타입
  type a = number;

  // 타입스크립트는 값과 타입 이름이 별도의 네임스페이스에 존재한다
  // 식별자가 a라는 이름으로 같지만 에러가 발생되지 않음

  function funcA(): a {
    return a;
  }

  console.log(funcA()); // 999
}
