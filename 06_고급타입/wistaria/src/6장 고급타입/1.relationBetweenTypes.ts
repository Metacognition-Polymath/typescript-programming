// ! 서브타입과 수퍼타입
/*
* 서브타입은 수퍼타입이 필요한 곳에는 어디든 안전하게 사용할 수 있다.

배열은 객체의 서브타입이다. -> 객체를 사용하는 곳에 배열을 사용할 수 있다.
튜플은 배열의 서브타입이다. -> 배열을 사용하는 곳에 튜플을 사용할 수 있다.
모든 타입은 any의 서브타입이다. -> any를 사용하는 곳에 모든 타입을 사용할 수 있다.
never는 모든 타입의 서브타입이다. -> 모든 타입을 사용하는 곳에 never를 사용할 수 있다.
서브클래스는 수퍼클래스의 서브타입이다. -> 수퍼클래스를 사용하는 곳에 서브클래스를 사용할 수 있다.

* A <: B A는 B와 같거나 서브타입

? Array<A> 와 Array<B> 의 관계
? A 와 B 에서 A가 서브타입이 되는 조건
? (a:A)=>B 와 (c:C)=>D 의 관계
*/

// ! 형태와 배열 가변성
{
	// 서버로부터 받은 기존 사용자
	type ExistingUser = {
		id: number
		name: string
	}
	// 서버에 저장하지 않은 새 사용자
	type NewUser = {
		name: string
	}

	// 요구사항 : 사용자 삭제 코드 구현
	function deleteUser(user: { id?: number; name: string }) {
		delete user.id
	}
	let existingUser: ExistingUser = {
		id: 212312,
		name: 'Ima User',
	}
	/*
  함수 deleteUser의 매개변수 user는 { id?: number; name: string } 타입이고
  ExistingUser 타입은 { id: number; name: string } 이므로
  ExistingUser <: user 이다.
  왜냐하면
  (ExistingUser의 id타입 : number) <: (user의 id타입 : number | undefined)
  number <: number | undefined
  */

	console.log(existingUser) // { id: 212312, name: 'Ima User' }
	deleteUser(existingUser) // 아이디 삭제
	console.log(existingUser) // { name: 'Ima User' }

	// 안전문제 : 아이디를 지우고 다시 deleteUser(existingUser) 해도 오류 없음
	deleteUser(existingUser) // 아이디가 없는데 오류 안남.
	console.log(existingUser) // { name: 'Ima User' }
	// 타입스크립트는 쉬운사용을 위해 완벽한 안전성을 추구하지 않는다.
	

	type LegacyUser = {
		id?: number | string
		name: string
	}
	const legacyUser: LegacyUser = {
		id: '123131',
		name: 'yang',
	}
	deleteUser(legacyUser)
}

// ! 가변성의 네종류
/* 
불변(invariance) 정확히 X:T를 원함
공변(covariance) X<:T인 X를 원함
반변(contravariance) X>:T인 X를 원함
양변(bivariance) X<:T 또는 X>:T인 X를 원함

타입스크립트에서 모든 복합타입의 멤버(객체, 클래스, 배열, 함수, 반환타입)는 모두 공변
함수 매개변수 타입만 예외적으로 반변이다. 
- 이게 자연스러운게, 매개변수에서 요구하는 정보 이상을 매개변수가 가지고 있으려면 
- 인수로 수퍼타입, 즉 반변조건을 만족해야한다.

참고 :
어떤 언어는 데이터의 수정가능성 여부에 따라 가변성을 달리하기도 함
스칼라 코틀린 플로우 같은 언어는 자신의 데이터 타입에 가변성을 지정 할 수 있는 명시적 문법을 제공
*/

// ! 함수 가변성
/* 
함수의 서브타입 A<:B 의 조건 (this타입 반변, 매개변수타입 반변, 반환타입 공변)
1. A의 매개변수 갯수 <= B의 매개변수 갯수
2. A의 this타입 >: B의 this타입
3. A의 각 매개변수 >: B의 대응 매개변수
4. A의 반환타입 <: B의 반환타입
*/

{
	class Animal {}
	class Bird extends Animal {
		chirp() {}
	}
	class Crow extends Bird {
		caw() {}
	}
	function chirp(bird: Bird) {
		bird.chirp()
		return bird
	}
	// * 클래스 타입 테스트
	// Crow <: Bird <: Animal
	chirp(new Animal())
	// Bird의 수퍼타입은 오류
	chirp(new Bird())
	chirp(new Crow())
	// Bird의 서브타입은 통과

	// * 함수 타입 테스트
	function clone(f: (b: Bird) => Bird) {
		return f
	}
	// * 반환타입
	function birdToCrow(b: Bird) {
		return new Crow()
	}
	clone(birdToCrow)
	function birdToAnimal(b: Bird) {
		return new Animal()
	}
	clone(birdToAnimal) // 반환타입이 공변을 반족하지 않음.
	// * 매개변수타입변
	function crowToBird(c: Crow) {
		return new Bird()
	}
	clone(crowToBird) // 매개변수 타입이 반변을 만족하지 않음
	function animalToBird(a: Animal) {
		return new Bird()
	}
	clone(animalToBird)

	/* 
	외우지 말고 밑줄 생기면 확인
	호환성으로 함수의 매개변수와 this타입은 기본적으로 공변이다??? -> 반변임
	더 안전한 공변? 반변을 사용하려면
	strict true 옵션이나 strictFunctionTypes true 옵션을 사용하면 된다. 
	*/
}
// ! 할당성
/* 
A를 B에 할당할 수 있는 조건
1. type in [배열, 불, 숫자, 객체, 함수, 클래스, 클래스 인스턴스, 문자열, 리터럴타입] 인 경우
2. A <: B
3. A는 any

1. 열거형 타입인 경우
2. A는 열거형 B의 멤버 (A의 타입은 B)
3. A는 number B는 최소 한개 이상의 number타입을 가져야함

* 열거형은 코드에서 완전 없엘것 권장
*/

// ! 타입 넓히기 (자동추론)
// 타입스크립트의 타입추론기능에 의해 변수의 타입을 넓힐 수 있다.
{
	let a = 'x' // "x" -> string
	let b = 5 // 5 -> number
	let c = true // true -> boolean
	let d = { x: 3 } // {x:3} -> {x:number}
	enum E {
		X,
		Y,
		Z,
	}
	let e = E.X // X -> E
	let x = null // null -> any
	let y = undefined // undefined -> any
}
// const 선언시 일부 변수 자동확장이 일어나지 않음
{
	const a = 'x' // "x"
	const b = 5 // 5
	const c = true // true
	const d = { x: 3 } // 객체의 멤버는 const로 자동확장이 중단되지 않음.
	enum E {
		X,
		Y,
		Z,
	}
	const e = E.X // E
	const f = { x: 3 } as const // { readonly x: 3 } : 특별타입, as const 어설션으로 자동확장을 중단.
}
// 변수 선언시 타입어노테이션을 추가하면 이런 자동확장이 일어나지 않음
{
	let a: 'x' = 'x' // "x"
	let b: 5 = 5 // 5
	let c: true = true // true
	let d: { x: 3 } = { x: 3 } // {x:3}
}
// 변수 타입추론이 선언범위를 벗어나면 재 추론
{
	function x() {
		let a = null // any
		a = 2 // any
		a = '3' // any
		return a
	}
	x() // string : 재추론
}
// const 타입
{
	// const 타입은 멤버들까지 재귀적으로 readonly 적용
	let a = [1, { x: 2 }] as const //readonly [1, { readonly x: 2; }]
}

// ! 초과 프로퍼티 확인
{
	type Option = {
		// 객체타입
		baseURL: string // 프로퍼티 타입
		cacheSize?: number
		tier?: 'prod' | 'dev'
	}
	class API {
		constructor(private option: Option) {}
	}
	new API({
		baseURL: 'http://api.mysite.com',
		tier: 'prod',
	}) // 문제없음
	new API({
		baseURL: 'http://api.mysite.com',
		badTier: 'prod',
	})
	/* 
	필요 타입 { baseURL:string cacheSize?:number tier?:'prod'|'dev' }
	제공된 타입 { baseURL: 'http://api.mysite.com', badTier:'prod' }
	제공된 타입이 서브타입을 만족하면 안전성 통과. 하지만 서브타입을 초과한 프로퍼티가 존재하고 에러 송출
	*/
}

// ! 정제
/* 
타입스크립트는 플로우 기반 타입추론*을 수행

typeof, instanceof, in 등의 타입질의와
if, ?, ||, switch 같은 제어 흐름을 고려 하여 타입을 정제

[*플로우 기반 타입 추론
	타입스크립트, 플로우, 코틀린, 실론(Ceylon) 등 일부 언어에서만 지원
	코드 블록 내에서 타입을 정제하는 방식
	C/자바의 타입 명시 지정 방식, 하스켈/오캐멀/스칼라에서 쓰이는 패턴 매칭 방식의 대안. 
	심벌 실행 엔진을 타입 검사기에 직접 탑재, 타입 검사기에 피드백 제공, 
	프로그래머가 추론하는 방식에 가까운 추론 메커니즘을 구현
]
*/
{
	// * HTML요소의 너비를 전달하면 이를 파싱하고 검증하는 예
	// CSS 단위값
	type Unit = 'cm' | 'px' | '%'
	let units: Unit[] = ['cm', 'px', '%']
	// 지원하는 단위 각각을 확인하고 일치하는 값이 없으면 null 반환
	function parseUnit(value: string): Unit | null {
		for (let i = 0; i < units.length; i++) {
			if (value.endsWith(units[i])) {
				return units[i]
			}
		}
		return null
	}

	// * parseUnit을 이용해 사용자가 전달한 다양한 width 값을 파싱.
	type Width = { unit: Unit; value: number }
	function parseWidth(width: number | string | null | undefined): Width | null {
		// * (parameter) width: string | number | null | undefined
		if (width == null) {
			return null
			// width == null -> null, undefined 타입이 정제
			// [* 자바스크립트 falsy : null, undefined, NaN, 0, -0, false ]
		}
		// * (parameter) width: string | number
		if (typeof width === 'number') {
			return { unit: 'px', value: width }
		}
		// * (parameter) width: string
		let unit = parseUnit(width)
		// * let unit: Unit | null
		if (unit) {
			return { unit, value: parseFloat(width) }
		}
		// * let unit: null
		return unit
	}
}
// ! 차별된 유니온 타입 (태그된 유니온 타입 or연산자)
{
	// * 유니온타입 정제 예
	type UserTextEvent = { value: string }
	type UserMouseEvent = { value: [number, number] }
	type UserEvent = UserTextEvent | UserMouseEvent

	function handle(event: UserEvent) {
		if (typeof event.value == 'string') {
			event.value // string
			// ...
			return
		}
		event.value // [number, number] }
	}
}
{
	// * 유니온타입 정제 불가 예
	type HTMLElement = {}
	type HTMLInputElement = {}
	type UserTextEvent = { value: string; target: HTMLInputElement }
	type UserMouseEvent = { value: [number, number]; target: HTMLElement }
	type UserEvent = UserTextEvent | UserMouseEvent
	// * UserEvent 타입은 UserTextEvent or UserMouseEvent 이 아님
	function handle(event: UserEvent) {
		if (typeof event.value === 'string') {
			event.value // string
			event.target // HTMLInputElement | HTMLElement (!!! 정제 안됨)
			return
		}
		event.value // [number, number]
		event.target // HTMLInputElement | HTMLElement (!!!)
	}
}
/* 
타입스크립트의 유니온은 or만을 뜻하지 않음
타입스크립트는 유니온의 멤버가 서로 중복가능한경우가 있어 멤버를 교차허용
특정 상황에서 or연산처럼 한정적으로 사용
태그된 유니온이 or연산으로 작동

* 좋은 태그의 조건

- 같은 위치의 멤버
- 한 가지 타입 사용. 주로 문자열 리터럴 타입 사용.
- 제네릭 타입 인수 없음.
- 상호 배타적

*/
{
	// * 태그된 유니온 타입 정제 예
	type HTMLElement = {}
	type HTMLInputElement = {}
	type UserTextEvent = {
		type: 'TextEvent'
		value: string
		target: HTMLInputElement
	}
	type UserMouseEvent = {
		type: 'MouseEvent'
		value: [number, number]
		target: HTMLElement
	}
	// 태그 : 같은 위치의 type멤버, 문자열리터럴타입. 상호베타적, 제네릭 없음 -> | == or
	type UserEvent = UserTextEvent | UserMouseEvent

	function handle(event: UserEvent) {
		if (event.type === 'TextEvent') {
			event.value // string
			event.target // HTMLInputElement
			// ...
			return
		}
		event.value // [number, number]
		event.target // HTMLElement
	}
}
// 유니온 타입의 다양한 경우를 처리하는 함수를 구현시 태그된 유니온을 사용.
// 플럭스 액션(Flux action), 리덕스 리듀서(Redux reducer), 리액트(React)의 useReducer

