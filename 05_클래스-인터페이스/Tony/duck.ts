class Zebra {
  trot() {
    console.log("zebra");
  }
}

class Poodle {
  trot() {
    console.log("poodle");
  }
}

function ambleAround(animal: Zebra) {
  animal.trot();
}

const zebra = new Zebra();
const poodle = new Poodle();

ambleAround(zebra); // OK
ambleAround(poodle); // OK
