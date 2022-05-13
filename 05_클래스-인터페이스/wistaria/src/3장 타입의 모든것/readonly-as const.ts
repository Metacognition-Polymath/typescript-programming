{
  // readonly와 동일하게 as const를 사용한다.
  // 형식 어설션이라 하고, 타입스크립트에서만 지원한다.

  const arr = [1, 2, 3] as const; // const arr: readonly [1, 2, 3]
  arr[0] = 4; // error: readonly
}