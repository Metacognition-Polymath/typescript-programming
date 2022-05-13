// 클래스에 인터페이스를 적용시킬때는 
// 인터페이스를 클래스에 구현한다는 점에서
// implements 키워드를 사용한다.
// 단 인터페이스는 모두 구현해야 한다.
// 구현은 여러개를 사용할 수 있다.
// 완전한 타입안전성을 제공하기 때문에 프로퍼티를 빼먹거나 구현에 문제가 있으면 오류가 발생한다.
{
  interface Animal {
    readonly name: string
    eat(food:string):void
    sleep(hours:number):void
  }
  interface Feline {
    meow():void
  }
  class Cat implements Animal, Feline {
    name = 'whiskers'
    eat(food:string):void {
      console.info(`${food}를 먹었다.`)
    }
    sleep(hours:number):void {
      console.info(`${hours}시간 잠을 잤다.`)
    }
    meow():void {
      console.info(`야옹`)
    }
  }
}