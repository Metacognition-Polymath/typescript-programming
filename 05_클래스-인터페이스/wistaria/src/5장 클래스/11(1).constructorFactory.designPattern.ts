{
  interface Shoe {
    purpose:string
  }

  class BalletFlat implements Shoe {
    purpose = "dancing"
  }
  class Boot implements Shoe {
    purpose = "woodCutting"
  }
  class Sneaker implements Shoe {
    purpose = "walking"
  }

  // 이제 각 서브클래스를 하나의 메서드에서 생성하도록 팩터리를 만들면
  let ShoeFactory = {
    create(type:'balletFlat'|'boot'|'senaker'):Shoe {
      switch(type) {
        case 'balletFlat': return new BalletFlat()
        case 'boot': return new Boot()
        case 'senaker': return new Sneaker()
      }
    }
  }

  // 아래처럼 사용 할 수 있다.
  ShoeFactory.create('balletFlat').purpose // dancing
  ShoeFactory.create('boot').purpose // woodCutting
  ShoeFactory.create('senaker').purpose // walking
}