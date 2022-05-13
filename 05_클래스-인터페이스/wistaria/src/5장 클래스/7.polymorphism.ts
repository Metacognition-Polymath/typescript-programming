{
  interface MyMap<K,V> { 
    get(key:K):V
    set(key:K, value:V):void
  }
  // 클래스와 인터페이스도 제네릭을 지원한다.
  class MyMap<K,V> implements MyMap<K,V> {
    // 1. 클래스 자체에서 제네릭을 선언했으므로 클래스 내부에서 제네릭을 자유롭게 사용
    constructor(private initialKey: K, private initialValue:V) {}
    // 2. 생성자에서는 제네릭을 선언할 수 없다. 클래스에서 선언후 가져와야한다.
    
    get(key:K):V|undefined {
      if (key === this.initialKey) { return this.initialValue }
    }
    set(key:K, value:V):void {
      if (key === this.initialKey) { this.initialValue = value }
    }
    merge<K1,V1>(map:MyMap<K1,V1>):MyMap<K|K1,V|V1> {
      switch (typeof map.initialKey) {
        case 'string':
          return map
        default : 
          return this
      }
    }
    // 3. 인스턴스 메서드는 클래스 수준의 제네릭을 사용가능하고, 자신만의 제네릭을 선언할 수 있다.
    static of<K,V>(k:K,v:V):MyMap<K,V> { 
      return new MyMap(k,v)
    }
    // 4. 정적 메서드는 클래스 수준의 제네릭을 사용할 수 없기 때문에
    // 클래스에서(1.) 선언한 제네릭을 재선언하여 사용한다
    // 같은문자 K, V타입을 써도 클래스제네릭 K,V와 다르다.

  }

  let a = new MyMap('a',1) // let a: MyMap<string, number>
  // 타입추론이 가능

  console.log(a.get('a'))// 1
  a.set('a',2)
  console.log(a.get('a'))// 2
}