{
  // 7.3 예외 반환
  const isValid = (date: Date) => {
    return (
      Object.prototype.toString.call(date) === "[object Date]" &&
      !Number.isNaN(date.getTime()) // date.getTime() => 1653034290092
    );
  };

  class InvalidDateFormatError extends RangeError {}
  class DateIsTheFutureError extends RangeError {}

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

  // const test = new Date("wtf?");
  // console.log("test : ", test); // test :  Invalid Date
  // console.log("test.toISOString() : ", test.toISOString()); // RangeError 발생
  // 생성할 때가 아닌 사용할 때 에러가 발생함
}
