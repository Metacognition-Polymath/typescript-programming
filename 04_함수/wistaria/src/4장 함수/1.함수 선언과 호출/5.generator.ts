/*
4.1.5 제너레이터

제너레이터 함수(generator function)는 값을 생산하는 속도를 정교하게 조절할 수 있는 함수로
(소비자가 요칭해야만 다음 값을 계산하기 때문에 )
- 무한의 목록 생성하기 
같은 까다로운 기능을 제공할 수 있다.
*/
{
  function* createFibonacciGenerator() { 
    let a = 0 
    let b = 1
    while (true) { 
      yield a;
      [a, b] = [b, a + b]
    }
  }

  let fibonachi = createFibonacciGenerator() 
  fibonachi.next() // { value: 0, done: false }
  fibonachi.next() // { value: 1, done: false }
  fibonachi.next() // { value: 1, done: false }
  fibonachi.next() // { value: 2, done: false }
  fibonachi.next() // { value: 3, done: false }
  fibonachi.next() // { value: 5, done: false }
  // 왜 오류가 뜨지? tsconfig.json을 인식하지 못해 생기는 문제일수 있는데
  // @type/node를 설치하니 오류가 뜨지 않았다.

  // 이터러블 타입을 명시할 수 있다.
  function* generateSequence(): IterableIterator<number> {
    yield 1;
    yield 2;
    return 3;
  }

  generateSequence().next() 
}
