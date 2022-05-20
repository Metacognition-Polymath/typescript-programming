// 사용자의 생일을 입력받아 Date 객체로 파싱하는 프로그램을 구현

function isValid(date: Date) {
  return (
    Object.prototype.toString.call(date) === "[object Date]" &&
    !Number.isNaN(date.getTime()) // date.getTime() => 1653034290092
  );
}
{
  // 7.1 null 반환
  const parse = (birthday: string) => {
    // : Date | null - 이거 왜 타입 추론이 안될까? Date만 리턴 값으로 추론 됨
    const date = new Date(birthday);
    if (!isValid(date)) {
      return null; // 예외처리를 null 반환하는 것으로 함
    }
    return date;
  };

  const date = parse("123ㅁㅁ");
  if (date) {
    console.info("Date is", date.toISOString()); // null인지에 따라 분기처리를 하지않으면 에러가 발생함 -> RangeError: Invalid time value
  } else {
    console.error("Error parsing date for some reason");
  }
}

class InvalidDateFormatError extends RangeError {}
class DateIsTheFutureError extends RangeError {}
{
  // 7.2 예외 던지기

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

  try {
    const date = parse("123ㅁㅁ");
    console.info("Date is", date.toISOString());
  } catch (e) {
    if (e instanceof InvalidDateFormatError) {
      console.error(e.message);
    } else if (e instanceof DateIsTheFutureError) {
      console.info(e.message);
    } else {
      throw e;
    }
  }
}
// functions vs. const () => {}
// => 함수 스코프 vs. 블록 스코프

// 함수가 아닌 전역 스코프에서도 try catch를 사용할 수 있다
