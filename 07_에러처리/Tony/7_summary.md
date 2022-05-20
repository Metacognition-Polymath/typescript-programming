# 7장. 에러 처리

- 네트워크 장애, 파일시스템 장애, 사용자 입력 파싱 에러, 스택 오버플로, 메모리 부족 에러까지 모두 막을 수는 없다
- 에러를 표현하고 처리하는 가장 일반적인 패턴 4가지
  - null 반환
  - 예외 던지기
  - 예외 반환
  - Option 타입

## 7.1 null 반환

- 장점 : 에러 상황에 대한 대처
- 단점
  - 문제가 생긴 원인을 알 수 없음
    - 개발자가 작성한 모호한 에러메세지를 보게 되기 때문
  - null반환 시 null확인 처리를 해야되기 때문에 코드가 지저분해질 수 있다

## 7.2 예외 던지기

- 가능한 null반환 대신 예외를 던지자

  - 어떤 문제인지에 대한 메타데이터(에러 메세지)를 얻을 수 있다

- try - catch로 에러를 잡아서 처리
  - 예상한 예외가 아닌 에러는 다시 던지는 것이 좋다

```ts
try {
  const date = parse();
  console.info("Date is", date.toISOString());
} catch (e) {
  if (e instanceof RangeError) {
    console.error(e.message);
  } else {
    throw e;
  }
}
```

RangeError를 상속받아서 커스텀 에러를 만들어 에러를 구분하게 할 수도 있다

```ts
class InvalidDateFormatError extends RangeError {}
class DateIsTheFutureError extends RangeError {}
```

타입스크립트의 예외는 never 타입(취급하지 않음)

- docblock에 정보를 추가해야 함

```ts
/**
 * @throw {InvalidDateFormatError} 사용자가 생일을 잘 못 입력함
 * @throw {DateIsTheFutureError} 사용자가 생일을 미래 날짜로 입력함
 */
const parse = (birthday: string) => {
  const date = new Date(birthday);
  if (!isValid(date)) {
    throw new InvalidDateFormatError("Invalid date format");
  }
  if (date.getTime() > Date.now()) {
    throw new DateIsTheFutureError("Date is in the future");
  }
  return date;
};
```

#### 더 나아가기

- 에러 발생할 가능성이 높은 API라면 이를 사용하는 코드 어딘가에서 반드시 처리해줘야 한다
- 코드를 사용하는 개발자에게 성공과 에러 상황을 모두 처리하도록 알려주려면 어떻게 해야 할까? -> 7.3 예외 반환

## 7.3 예외 반환

- 타입스크립트는 자바가 아니며 throws문을 지원하지 않는다.
- 하지만 유니온 타입을 이용해 비슷하게 흉내낼 수 있다
  - 리턴타입에 에러 타입을 명시해준다

```ts
const parse = (
  birthday: string
): Date | InvalidDateFormatError | DateIsTheFutureError => {
  const date = new Date(birthday);
  if (!isValid(date)) {
    return new InvalidDateFormatError("Invalid date format");
  }
  if (date.getTime() > Date.now()) {
    return new DateIsTheFutureError("Date is in the future");
  }
  return date;
};

const result = parse("123ㅁㅁ");
if (result instanceof InvalidDateFormatError) {
  console.error(result); // 에러 객체 전체 출력
  // console.error(result.message);
} else if (result instanceof DateIsTheFutureError) {
  console.info(result.message);
} else {
  console.info("Date is", result.toISOString());
}

// 위가 귀찮다면 -> 모든 에러 커버
const result = parse();
if (result instanceof Error) {
  console.error(result.message);
} else {
  console.info("Date is", result.toISOString());
}
```

- 위에서 수행한 것들

  - parse의 시그니처에 발생할 수 있는 예외를 나열했다
  - 메서드 사용자에게 어떤 에러가 발생할 수 있는지를 전달했다
  - 메서드 사용자가 각각의 에러를 모두 처리하거나 다시 던지도록 강제했다

- 이 방식은 단순하고 API 실패 유형과 에러를 알려주기에 충분하다

```ts
function canMakeError(): T | Error1 {
  // ...
}

function func1WithCanMakeError(): U | Error1 | Error2 {
  const resultOfCanMakeError = canMakeError();
  if (resultOfCanMakeError instanceof Error) {
    return resultOfCanMakeError;
  }
  // resultOfCanMakeError로 어떤 동작을 수행(정상동작)
}
```

- 이 방식은 조금 복잡한 대신 안전성이 뛰어나다

## 7.4 Option 타입

- 특수 목적 데이터 타입을 사용해 예외를 표현하는 방법도 있다

## 7.5 마치며

- 타입스크립트에서 에러 처리에 대한 여러가지 방법을 살펴봤다
  - null 반환
  - 예외 던지기
  - 예외 반환하기
  - Option 타입
- 어떤 방법을 사용할지는 다음을 기준으로 정하면 된다
  - 어떤 작업이 실패했음을 단순하게 알리기 => null, Option
  - 실패한 이유와 관련 정보를 제공 => 예외를 던지거나 반환
  - 가능한 모든 예외를 사용자가 명시적으로 처리하도록 강제 => 예외 반환
  - 에러 처리 관련 코드를 더 적게 구현 => 예외 던지기
  - 에러를 만드는 방법이 필요하다 => Option
  - 단순히 에러가 발생했을 때 처리 => null, 예외

## 연습문제

- 클래스에서 처리하지 않고 클래스 인스턴스를 생성 후 사용할 때 try catch로 처리할 것 같다
