{
  // 배열은 동형적으로 만드는게 유리하지만 때때로 이형적 배열이 필요하고,
  // 이형배열의 위치별 타입과 길이를 관리할때 튜플을 사용한다.

  // 튜플은 키밸류를 지원한다.
  type person = readonly [name:string, age:number, location:string]
  // 리드온리를 사용하면 파이썬의 튜플과 유사한 상태의 배열을 만들 수 있다.

  const person: person = ['홍길동', 20, '서울']
  
  // 튜플 사용없이 배열에 의미를 부여하는 방법은 구조분해할당을 이용하는것인데
  let [name, age, location] = person
  
  // 튜플을 사용하면 
  person[0] //(property) 0: string (name)
  person[1] //(property) 1: number (age)
  person[2] //(property) 2: string (location)
  // 튜플에서 의미를 끌어와 올려준다

  person[0] = '녹두장군' // 리드온리 덕분에 불변 데이터처럼 수정이 불가능하지만
  name = '녹두장군' // 분해한 변수는 수정이 가능하다. 만약 불변으로 남기려면 const를 사용
}
