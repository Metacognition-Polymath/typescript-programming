class CustomSet {
  public value: number;
  add(value: number): this {
    this.value = value;
    return this; // instance
  }
}

const set = new CustomSet();

console.log(set.add(1));
