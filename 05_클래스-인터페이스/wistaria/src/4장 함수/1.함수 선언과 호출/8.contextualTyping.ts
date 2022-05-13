{
  // 문맥적타입화

  function times(f:(index:number)=>void, n:number) {
    for (let i = 0; i < n; i++) {
      f(i)
    }
  }

  times(n=>console.log(n), 3) // (parameter) n: number
  // f 를 인라인으로 선언하면 n을 number로 추론하지만
  // 인라인으로 선언하지 않으면 추론할 수 없다.
  function f(n) { // (parameter) n: any
    console.log(n)
  }
  times(f(5),3) // function f(n: any): void
}