{
  interface Animal {
    // readonly name: string;
    eat: (food: string) => void;
    sleep(hours: number): void;
  }

  interface Feline {
    meow: () => void;
  }

  class Cat implements Animal, Feline {
    eat(food: string) {
      console.info("Ate some", food, ". Mmm!");
    }
    sleep(hours: number) {
      console.info("Slept for", hours, "hours");
    }
    meow() {}
  }
}
{
  type Animal = {
    // readonly name: string;
    eat: (food: string) => void;
    sleep(hours: number): void;
  };

  type Feline = {
    meow: () => void;
  };

  // type도 클래스에서 interface와 동일하게 implements 될 수 있음
  class Cat implements Animal, Feline {
    eat(food: string) {
      console.info("Ate some", food, ". Mmm!");
    }
    sleep(hours: number) {
      console.info("Slept for", hours, "hours");
    }
    meow() {}
  }
}
// readonly 둘다 사용 가능
