// ! ANCHOR 1. 튜플의 타입 추론 개선
{
	// * 변수의 경우
	let a = [1, true] // 튜플 추론
}
{
	// * NOTE 함수의 경우
	function tuple<T extends unknown[]>(...ts: T): T {
		// 함수의 인수로 여러값이 들어오면(배열아닌)
		// ...ts:T에서 ts의 타입이 T,
		// 즉 전달받은 매개변수들이 담겨진 배열의 타입이 된다.
		// 입력값에 의해 배열의 각 값들이 구체화되어있고
		// 이를 리턴하면 튜플타입으로 추론된다.
		return ts // 5
	}

	let a = tuple(1, true) // [number, boolean]
}

// ! ANCHOR 2. "is" 사용자 정의 타입 안전 장치
// * 함수차원에서의 정제
// typeof, instanceof 정제 => bool "is" type
// 정제된 정보를 정제스코프 외부로 전달하게끔 리턴타입을 규정
// 매개변수 하나에만 적용 가능
{
	// * 정제는 문맥 안에서만 작동.
	function isString(a: unknown): boolean {
		return typeof a === 'string' // 문자열 타입 정제
	}
	isString('a') // true로 평가
	isString([7]) // false로 평가

	function parseInput(input: string | number) {
		let formattedInput: string
		if (isString(input)) {
			// 문자열을 정제햇는데 반환값을 불이기 때문에 추론이 불가.
			// 추론 가능한 스코프는 정제 스코프 내부에서만 유효
			// 정제결과를 외부로 알려야 해결
			formattedInput = input.toUpperCase() // input : string | number
			// 01124 TS2339: 'number' E18011 'toUpperCase' 프로퍼티가 존재하지 않음
		}
	}
}
{
	// * NOTE 리턴(bool)값으로 함수차원에서 입력 타입을 정제
	function isString(a: unknown): a is string {
		return typeof a === 'string'
	}
	function parseInput(input: string | number) {
		let formattedInput: string
		if (isString(input)) {
			formattedInput = input.toUpperCase() // input : string
		}
	}
}
{
	// * 복합 타입에도 적용가능
	type LegacyDialog = {} // ...
	type Dialog = {} // ..
	function isLegacyDialog(
		dialog: LegacyDialog | Dialog
	): dialog is LegacyDialog {
		//  ...
	}
}
