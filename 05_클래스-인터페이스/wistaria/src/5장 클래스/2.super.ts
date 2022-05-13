{
  abstract class Parent {
    constructor(protected name:string) { }
    protected method(){ console.log("parent method") }
  }

  class Child extends Parent {
    constructor(protected name:string) { super(name) }
    // super()는 부모클래스의 생성자

    method(){ console.log("child method") }
    parentMethod(){ super.method() }
    // super 키워드로 부모클래스에 접근, 메서드 호출
  }

  // const park = new Parent("park") // 추상클래스라 생성 못함
  const john = new Child("john")
  john // Child { name: 'john' }
  john.method() // child method
  john.parentMethod() // parent method
}