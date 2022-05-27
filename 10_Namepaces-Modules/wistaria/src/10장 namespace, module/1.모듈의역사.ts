// ! 자바스크립트 모듈의 역사

import { defaultMaxListeners } from 'events'

/* 
처음에 자바스크립트는 모듈시스템을 전혀 지원하지 않아 모든 것을 전역네임스페이스에 정의했고, 이 때문에 응용 프로그램을 만들고 확장하기 어려웠다. 전역스코프에서 변수이름을 관리하기 때문에 변수명이 금새 고갈되었고 충돌이 발생. 이때문에 사람들은 객체를 이용하거나 즉시실행함수를 전역에 할당해서 응용프로그램의 다른 모듈에서 사용하는 식으로 모듈을 흉내냈다.
*/

// * 예제
{
	window.emailListModule = {
		renderList() {},
		// ...
	}
	window.emailComposerModule = {
		renderComposer() {},
		// ...
	}
	window.appModule = {
		renderApp() {
			window.emailListModule.renderList()
			window.emailComposerModule.renderComposer()
		},
		// ...
	}
}
/*
자바스크립트를 로딩하고 실행하는 동안 브라우저의 UI는 블록되기 때문에 웹응용프로그램이 커지고 브라우져가 느려졌다. 출시 10년뒤 이를 해결하려고 자바스크립트를 한번에 로드하는 데신 페이지를 로드한 다음 필요한 파일만 동적으로 로드하는 방식으로 개발하기 시작했다. 게으르게(비동기적으로) 모듈을 로딩한다는것은 다음을 의미한다.

1. 모듈은 잘 캠슐화 되어야 한다. 캡슐화 되지 않으면 의존성을 확보하는 과정에서 페이지가 망가질 수 있다.
2. 모듈 간의 의존성은 명시적이어야 한다. 그렇지 않으면 한 모듈에 어떤 모듈이 필요하며 어떤 순서로 로딩해야 하는지 알 수 없기 때문이다. 
3. 모듈은 앱 내에서 고유식별자를 가져야 한다. 그래야 어떤 모듈을 로딩하는지 안정적으로 지정가능하다.
*/

// * LABjs 모듈로딩 예제
{
	$LAB
		.script('/emailBaseModule.js')
		.wait()
		.script('/emailListModule.js')
		.script('/emailComposerModule.js')
}

// * nodejs - cjs 예제

{
	// emailBaseModule.js
	var emailListModule = require('emailListModule')
	var emailComposerModule = require('emailComposerModule')

	module.exports.renderBase = function () {
		// ...
	}
}

// * AMD 표준모듈 예제
{
	define('emaiBaseModule', [
		'require',
		'export',
		'emailListModule',
		'emailComposerModule',
	], function (require, exports, emailListModule, emailComposerModule) {
		exports.renderBase = function () {
			// ...
		}
	})
}

/* 
몇년이 지나고 Browserify 가 출시되면서 프론트엔드에서도 cjs를 사용할 수 있게 되자 사실상 표준으로 자리잡았다. 하지만 이 방식에는 몇가지 문제가 있는데, 
1. require 호출은 반드시 동기방식이어야 한다.
2. cjs모듈 해석 알고리즘이 웹에 적합하지 않다.
3. 이를 사용하는 코드는 상황에 따라 정적분석이 불가능하다. module.exports, require가 어디서나 등장 할 수 있고 임의의 문자열과 표현식을 포함한다거나, 참조된 파일이 정말 존재하는지 명시된 내용을 그대로 익스포트 하는지 확인 할 수 없다.

이런 문제 때문에 ES2015에서 임포트/익스포트가 소개되며 해결되었다.
*/

// * ES2015 임포트 예제
{
	// emailBaseModule.js
	import emailList from 'emailListModule'
	import emailComposer from 'emailComposerModule'

	export function renderBase() {
		// ...
	}
}
