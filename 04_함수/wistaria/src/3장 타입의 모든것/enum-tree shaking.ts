  // 열거형은 자바스크립트에 없지만 타입스크립에서 지원하는 문법으로 tree shaking 되지 않는다.
  // Tree-shaking : 사용하지 않는 코드를 삭제하는 기능
{
  // TypeScript

  // enum
  enum Fish { Rockfish, Shark, Boxfish }
  let f: Fish = Fish.Rockfish;
  // ---------------------------
  // ---------------------------
  // ---------------------------
  
  // union
  const FishUnion = {
    RockFish: 0,
    Shark: 1,
    BoxFish: 2,
  } as const;
  type FishUnion = typeof FishUnion[keyof typeof FishUnion];
}
{
  // JavaScript 번들링 이후

  // enum
  var Fish;
  (function (Fish) {
      Fish[Fish["Rockfish"] = 0] = "Rockfish";
      Fish[Fish["Shark"] = 1] = "Shark";
      Fish[Fish["Boxfish"] = 2] = "Boxfish";
  })(Fish || (Fish = {})); // 삭제되지 않고 번들링된다.
  let f = Fish.Rockfish;
  // ---------------------------
  // ---------------------------
  // ---------------------------

  // union
  const FishUnion = {
      RockFish: 0,
      Shark: 1,
      BoxFish: 2,
  };
}