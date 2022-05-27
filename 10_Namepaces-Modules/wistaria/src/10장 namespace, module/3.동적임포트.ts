/* 
 넥트워크 병목으로 페이지 렌더링 시간이 길어지때는 
 
 1. 코드를 분할하여 자바스크립트 파일을 여러개 생성하여 나누어 저장하면 여러 조각을 병렬로딩할 수 있으므로 용량이 큰 네트워크 요청을 더 수월하게 처리할 수 있다.
 2. 게으른 로딩으로 수기가 자바스크립트에서 필요한 부분만 로딩할 수 있다.
*/

// * 게으른 로딩 동적 임포트, LABjs
let locale = await import('locale_us-en')

/* 
 임포트는 문자열로 평가되는 모든 표현식을 전달할 수 있지만 타입안전성을 잃는다. 타입안전성을 위해서는
  1. 문자열을 변수에 할당하지 않고 import에 문자열리터럴로 직접 제공한다.
  2. import 표현식을 전달하고 모듈 시그니처를 직접 명시한다.
*/

import {locale} from './locales/locale_us'
async function main() {
  let userLocale = await getUserLocale()
  let path = ./ locales / locale - ${userLocale}
  let localeUS:typeof locale = await import(path)
}

// 이 예제는 임포트한 locale을 타입으로만 사용했다. 