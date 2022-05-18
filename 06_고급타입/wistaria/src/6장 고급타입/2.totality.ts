// ! 종합성 Totality
// * 철저 검사(exhaustiveness checking)
// 필요한 모든 상황을 제대로 처리했는지 타입 검사기가 검사하는 기능
// 하스켈, 오캐멀 등 패턴 매칭 사용 언어에서 차용
// 타입스크립트는 모든 가능성을 확인, 빠진 상황 발견시 경고.

{
	type Weekday = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri'
	type Day = Weekday | 'Sat' | 'Sun'

	function getNextDay(w: Weekday): Day {
		switch (w) {
			case 'Mon':
				return 'Tue'
		}
		// 빠진리턴값에 따라 오류 송출
		// 에러 TS2366: 함수에 마무리 반환문이 없으며 반환 타입은 'undefined'를 포함하지 않음
		// 각 케이스로 빠짐없이 추가하거나, 리턴타입에 undefined을 추가하면 해결
	}
}
/* 
TSC 플래그: "noImplicitReturns": true
활성화시 함수 코드의 모든 경로에서 값을 반환하는지 확인할 수 있다(놓친 부분이 있으면 앞의 예처럼 경고가 나타난다).
어떤 사람들은 명시적 반환문을 되도록 적게 쓰는 반면 
어떤 사람들은 타입 안전성을 향상시키고 타입 검사기가 더 많은 버그를 잡을 수 있다는 이유에서 반환문 몇 개를 더 추가하는 일을 꺼리지 않는다.
*/

function isBig(n: number) {
	if (n >= 100) {
		return true
	}
	// 일부 코드 경로가 값을 반환하지 않습니다.ts(7030) ("noImplicitReturns": true 설정해야함)
}

// 이건 무슨 예지 이해가 안가네.
let nextDay = { Mon: 'Tue' }
nextDay.Mon // 'Tue'
nextDay.Tue // 당연히 에러발생
// TODO 레코드 타입, 매핑된 타입으로 해결가능.
