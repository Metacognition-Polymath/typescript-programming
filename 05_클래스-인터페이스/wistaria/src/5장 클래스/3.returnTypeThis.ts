// this를 타입으로 사용할 수 있다.

let set = new Set
set.add(4).add(2).add(3).add(1).add(1)
console.log(set) // Set { 4, 2, 3, 1 } ​​​​​at ​​​​​​​​set​​​ 
console.log(set.has(2)) // true
console.log(set.has(4)) // true

{
  class Set {
    has(value:number):boolean { }
    // 부모클래스의 메서드가 리턴값으로 자신의 타입을 리턴하면
    add(value:number):Set { }
  }

  class MutableSet extends Set {
    delete(value:number):boolean { }
    // 서브클래스는 오버라이딩 해서 
    // 자기 자신을 리턴타입으로 사용하게 해야 하는데
    add(value:number):MutableSet { }
  }
}

{
  class Set {
    has(value:number):boolean { }
    // 부모클래스의 메서드가 리턴값으로 this 를 사용하면
    add(value:number):this {}
  }

  class MutableSet extends Set {
    delete(value:number):boolean { }
    // 서브클래스는 오버라이딩 할 필요가 없어진다.
    // add(value:number):this { }
  }
}