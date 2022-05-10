  // 자바스크립트의 this는 호출방식에 따라 값이 달라진다.
  // 많은 개발팀은 클래스 메서드를 제외한 다른 모든 곳에서 this 사용을 금한다. 
  // .eslintrc.js
  // rules: {
  //   "no-invalid-this": "off";
  // }
  // 화살표함수는 this 를 문맥에 따라 사용하기 때문에 호출 주체에 따라 변경되지 않는다
  // this 가 호출주체에 따라 사용되게 할 때 function 키워드를 사용하는게 좋다
  

{
  function fancyDate1() { 
    return `${ this.getDate() } /${this.getMonth()}/${ this.getFullYear() }` 
  }

  fancyDate1.call(new Date)// "4/14/2005"로 평가
  fancyDate1() // 타입스크립트 오류체크 불가
  // 런타임시 에러발생 
  //처리되지 않은 TypeError: this.getDate는 함수가 아님
  const a = 1   
}


{  
  function fancyDate2(this: Date) { // 바인딩할 this를 명시, 컴파일시 사라짐
    return `${ this.getDate() } /${this.getMonth()}/${ this.getFullYear() }`
  }
  
  // 이렇게 수정한 fancyDate를 호출하면 다음과 같은 일이 벌어진다.
  
  fancyDate2.call(new Date) // "6/13/2008"으로 평가함 
  fancyDate2()// 'void' 형식의 'this' 컨텍스트를 메서드의 'Date' 형식 'this'에 할당할 수 없습니다.ts(2684)
}
const _ = require('lodash')


