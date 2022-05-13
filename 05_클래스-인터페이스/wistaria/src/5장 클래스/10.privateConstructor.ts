// 타입스크립트에서는 final 키워드를 지원하지 않지만 흉내를 낼 수 있다.


// private constructor 를 사용하면 인스턴스를 생성하거나, 상속이 불가능하다.
{
  class FinalClass {
    private constructor(public message:string) {}
  }

  new FinalClass("Hello") 
  // 'FinalClass' 클래스의 생성자는 private이며 클래스 선언 내에서만 액세스할 수 있습니다.ts(2673)

  class SubClass extends FinalClass {}
  //'FinalClass' 클래스를 확장할 수 없습니다. 클래스 생성자가 private로 표시되어 있습니다.ts(2675)

}

// 이제 내부에서 인스턴스 생성 메서드를 만들면 final 클래스를 따라 할 수 있다.
{
  class FinalClass {
    private constructor(public message:string) {}

    static createInstance(message:string) {
      return new FinalClass(message)
    }
  }

  // 인스턴스 생성
  const finalClass = FinalClass.createInstance("Hello")
  console.log(finalClass.message) // Hello

  // 확장 불가
  class SubClass extends FinalClass {}
}