// ! tsc {"lib":["dom", "es2015"]} 
// 이 설정은 코드추론에 돔 타입을 포함. 이 설정이 없으면 다음 코드는 오류를 발생.

// * 전역 window 객체에서 프로퍼티 읽기
let model = { url: window.location.href }

// <input/> 요소 만들기
let input = document.createElement('input')

// <input/> 요소에 css 클래스 추가
input.classList.add('input', 'URLInput')

// 사용자가 내용을 입력하면 모델 갱신
input.addEventListener('change',()=>model.url=input.value.toUpperCase())

// <input/> 을 돔에 주입
document.body.appendChild(input)

document.querySelector('.Element').innerHTML // 에러






