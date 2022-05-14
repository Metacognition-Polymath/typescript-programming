{
  // factory pattern
  // type 대신 interface를 이용해도 됨
  type Shoe = {
    purpose: string;
  };

  class BalletFlat implements Shoe {
    purpose = "dancing";
  }

  class Boot implements Shoe {
    purpose = "woodcutting";
  }

  class Sneaker implements Shoe {
    purpose = "walking";
  }

  const Shoe = {
    create(type: "balletFlat" | "boot" | "sneaker") {
      switch (type) {
        case "balletFlat":
          return new BalletFlat();
        case "boot":
          return new Boot();
        case "sneaker":
          return new Sneaker();
        default:
          throw new Error("unexpected type");
      }
    },
  };

  const balletFlat: BalletFlat = Shoe.create("balletFlat");
}
