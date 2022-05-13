// 값과 타입은 타입스크립트에서 별도의 네임스페이스에 존재한다.
{
  let a = 1999
  function b() {}
  type a = number // a 변수가 선언되도 타입에서 사용 가능, 별도의 네임스페이스에 존재
  interface b {}
}

// 타입스크립트는 값인지 타입인지 문맥을 보고 추론한다.
{
  if (a+1>3) {} // any; 문맥상 a를 값으로 추론
  let x:a=3 // type a = /*unresolved*/ any; 문맥상 a를 타입으로 추론
}

// 클래스와 enum의 이름은 값과 타입 네임스페이스에 동시에 생성된다.
{
  class C {} 
  let c:C // C는 클래스 타입
    = new C // C는 값 (new는 클래스의 값이 필요하다.)
  enum E {F,G}
  let e:E // E는 enum 타입
    = E.F // E는 값

  // instanceof 또한 클래스의 값이 필요하다.
  // typeof는 클래스 자체를 가리키게 한다.
}

{
  type State = {
    [key:string]:string
  }
  interface StringDatabase {
    state:State
    get(key:string):string|null
    set(key:string, value:string):void
  }
  interface StringDatabaseConstructor { // 이건 어떻게 구현하는건지 질문
    new(state?:State):StringDatabase
    from(state:State): StringDatabase
  }

  class StringDatabase implements StringDatabase, StringDatabaseConstructor {
    state:State = {}
    constructor(state?:State) {

    }
    
    get(key:string):string|null {
      return key in this.state ? this.state[key] : null
    }
    set(key:string, value:string):void {
      this.state[key] = value
    }
    static from(state:State) {
      let db = new StringDatabase()
      for (let key in state) {
        db.set(key, state[key])
      }
      return db
    }
  }

}


