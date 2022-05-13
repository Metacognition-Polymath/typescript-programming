{
  // 타입스크립트는 T[]와 Array<T>라는 두 가지 배열 문법을 지원한다. 성능, 의미상 두 표현은 같다.
  const a:number[] = [1,2,3,4]
  const b:Array<number> = [1,2,3,4]

  type node = {name:string}
  const edge1:node[] = [
    {name:"tree"},
    {name:"flower"},
    {name:"grass"},
  ]
  const edge2:Array<node> = [
    {name:"tree"},
    {name:"flower"},
    {name:"grass"},
  ]

  // 대개 배열은 동형(homogeneous)으로 만든다.

  let d = [1, 'a'] // 동형적이지 않으면
  d.map(_=>{ 
    if (typeof _ == 'number') { return _*3 } // 타입정제를 통해 처리해야하고
    return _.toUpperCase() 
  }) // 읽기 난이도가 상승한다.
}