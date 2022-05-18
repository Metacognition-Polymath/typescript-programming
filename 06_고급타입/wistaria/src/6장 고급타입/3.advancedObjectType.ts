// ! 고급 객체 타입
// 타입스크립트는 객체를 안전하게 표현하고 조작할 수 있는 다양한 수단을 제공

import { StringLiteralType } from '../../node_modules/typescript/lib/typescript'

// ! ANCHOR 1. 객체 타입의 타입 연산자
// * NOTE keyIn 연산자
// * ObjectInterface[ObjectKey] : keyin
// 복잡한 객체의 내부 타입을 대괄호 표기법으로 끌어오는 방법
// 타입연산자 : 유니온(|), 인터섹션(&), 키인연산자, 키오브연산자

// 선택한 소셜 미디어 API에서 받은 GraphQL API 응답을 모델링하는 복잡한 중첩 타입이 있다고 가정하자.
{
	interface APIResponse {
		user: {
			userId: string
			friendList: {
				count: number
				friends: {
					firstName: string
					lastName: string
				}[]
			}
		}
	}
	// 우리는 이 API에서 응답을 받아와 보여줘야 한다.
	function getAPIResponse(): Promise<APIResponse> {}
	function renderFriendList(friendList: unknown) {} // friendList 타입을 작성하려면
	let response = await getAPIResponse()
	renderFriendList(response.user.friendList)
}
{
	// * 새 인터페이스 작성, 객체 구조를 분할하는 방법으로 전체가 직관적으로 보이지 않음.
	interface FriendList {
		count: number
		friends: {
			firstName: string
			lastName: string
		}[]
	}
	interface APIResponse {
		user: {
			userId: string
			friendList: FriendList
		}
	}
	function getAPIResponse(): Promise<APIResponse> {}
	function renderFriendList(friendList: FriendList) {} // 반영
	let response = await getAPIResponse()
	renderFriendList(response.user.friendList)
}
{
	// * 키인 적용
	interface APIResponse {
		user: {
			userId: string
			friendList: {
				count: number
				friends: {
					// * 최상위 타입의 키 값을
					firstName: string
					lastName: string
				}[]
			}
		}
	}
	type FriendList = APIResponse['user']['friendList'] // * 타입으로 받아
	function renderFriendList(friendList: FriendList) {} // * 사용
	type Friend = FriendList['friends'][number] // * number는 배열인덱스의 일반항
	// * 키인은 대괄호표기법 사용 (점표기법 사용x)
}

// * NOTE keyof 연산자
// * keyof 사용시 객체의 '키값들'을 리터럴 타입 유니온으로 획득
{
	interface APIResponse {
		user: {
			userId: string
			friendList: {
				count: number
				friends: {
					// * 최상위 타입의 키 값을
					firstName: string
					lastName: string
				}[]
			}
		}
	}
	type ResponseKeys = keyof APIResponse // 'user'
	type UserKeys = keyof APIResponse['user'] // * 'userId' | 'friendList'
	type FriendListKeys = keyof APIResponse['user']['friendList'] // * 'count' | 'friends'

	// 키인과 keyof 연산자를 혼합 사용시 객체에서 주어진 키에 해당하는 값을 반환하는 게터를 타입 안전한 방식으로 구현할 수 있다.
	function get<O extends object, K extends keyof O>(o: O, k: K): O[K] {
		return o[k]
	}
	/* 
  O extends object 는 객체의 가능태
  K extends keyof O 는 입력된 객체가 가진 모든 키값의 유니온타입의 가능태
  O[K] 유니온타입의 다양한 서브타입인 K로 다양한 반환값에 대한 타입을 구현

  ex:
  o가 {a: number, b: string, c: boolean}
  keyof o는 'a' | 'b' | 'c' 타입
  (keyof o를 상속받은) K는 'a', 'b', 'a' | 'c' 등 keyof o의 서브타입
  인수 k = 'a' 라면 O[K]는 number
  인수 k = 'b' 라면 O[K]는 string
  인수 k = 'c' 라면 O[K]는 boolean
  인수 k = 'b'|'c' 라면 O[K]는 string | boolean

  안전하게 타입의 형태를 묘사
  */
}
{
	// * NOTE keyin keyof 함수시그니처 적용 예제
	type ActivityLog = {
		lastEvent: Date
		events: {
			id: string
			timestamp: Date
			type: 'Read' | 'Write'
		}[]
	}
	let activityLog: ActivityLog = {
		lastEvent: new Date(2022, 3, 1),
		events: [
			{
				id: '1월 첫 번째 이벤트',
				timestamp: new Date(2022, 1, 1),
				type: 'Read',
			},
			{
				id: '2월 첫 번째 이벤트',
				timestamp: new Date(2022, 2, 1),
				type: 'Read',
			},
			{
				id: '3월 첫 번째 이벤트',
				timestamp: new Date(2022, 3, 1),
				type: 'Read',
			},
		],
	}

	// 타입스크립트는 컴파일 타임에 lastEvent의 타입이 Date라는 사실을 파악한다. 물론 이를 확장해 객체에 더욱 깊숙이 키인할 수도 있다. 키를 세 개까지 받을 수 있도록 get을 오버로드하자.

	type Get = {
		// 함수 시그니처 선언을 오버로드
		<O extends object, K1 extends keyof O>(o: O, kl: K1): O[K1] // 이전 예제와 동일
		<
			O extends object,
			K1 extends keyof O, // O 가 activityLog 라면 K1은 'lastEvent' | 'events'
			K2 extends keyof O[K1] // O[K1]이 events 배열이라면 K2은 배열의 인덱스
		>(
			o: O,
			ki: K1,
			k2: K2
		): O[K1][K2] // activityLog[events][0] 꼴
		<
			O extends object,
			K1 extends keyof O,
			K2 extends keyof O[K1],
			K3 extends keyof O[K1][K2] // activityLog[events][0]의 키값유니온의 확장
			// 'id' | 'timestamp' | 'type' | otherThing
		>(
			o: O,
			k1: K1,
			k2: K2,
			k3: K3
		): O[K1][K2][K3] // 최하위 정보
	}

	let get: Get = (object: any, ...keys: string[]) => {
		let result = object
		keys.forEach((k) => (result = result[k]))
		return result
	}

	let lastEventDate = get(activityLog, 'lastEvent') // Date
	let JanuaryEventType = get(activityLog, 'events', 0, 'type')
	// events 배열의 0번인덱스객체의 타입 'Read' | 'Write'
	get(activityLog, 'bad')
	// 에러 TS2345: 인수 "bad" " 타입은 매개변수// "lastEvent" | "events"" 타입에 할당할 수 없음
}

/* 
TSC 92H 1: keyofStringsOnly keyofStringsOnly 플래그

자바스크립트에서 객체와 배열 모두 문자열과 심벌 키를 가질 수 있다. 다만 배열에는 보통 숫자 키를 쓰는 것이 규칙인데 런타임에 숫자 키는 문자열로 강제 변환된다. 이런 이유로 타입스크립트의 keyof는 기본적으로 number | string | symbol 타입의 값을 반환한다(하지만 더 구체적인 형태에 keyof를 호출하면 타입스크립트는 이 유니온보다 구체적인 서브타입을 추론할 수 있다). 올바른 동작이지만 이 때문에 타입스크립트에게 특정 키가 string이고 number나 symbol이 아니라는 사실을 증명해야 하는 귀찮은 상황에 놓일 수 있다. 타입스크립트가 (문자열 키만 지원하던) 예전처럼 동작하길 원하면 tsconfig.json에서 타입스크립트의 내장 Record 타입을 이용하면 무언가를 매핑하는 용도로 객체를 활용할 수 있다.

keyofStringsOnly 플래그를 활성화하자.



*/

// ! ANCHOR 2. Record 타입
/* 
레코드 타입 : Record<key,type> 키가 key 값이 type인 객체타입
인덱스 시그니처 : { [name : string]: ValueType }
인덱스 시그니처와 유사하지만 레코드타입은 문자열 리터럴 사용가능
*/
{
	// * NOTE 인덱스 시그니처의 경우
	{
		type humanInfo = {
			[name: string]: number // key값에 문자열 리터럴 사용불가
		}

		let human: humanInfo = {
			홍길동: 20,
			둘리: 30,
			마이콜: 40,
		}
	}
	// * NOTE 레코드 타입의 경우
	{
		type humanInfo = Record<string, number> // 키값에 문자열 리터럴 사용가능

		let human: humanInfo = {
			홍길동: 20,
			둘리: 30,
			마이콜: 40,
		}
	}
	{
		// * NOTE 문자열 리터럴 사용한 레코드타입 예제
		type Weekday = 'Mon' | 'Tue'
		type Day = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun'
		let nextDay: Record<Weekday, Day> = {
			Mon: 'Tue',
			Tue: 'Wed',
		}
		// 레코드 타입은 키값이 매핑되어야 하는데, 구현된 키값이 부족하거나, 없는 값 요청시 오류
	}
}

// ! ANCHOR 3. 매핑된 타입
// 인덱스 시그니처의 매핑 확장
// 인덱스 시그니처 { [name : string]: ValueType }
// 매핑된 타입 { [Key in UnionType]: ValueType }
// 인덱스 시그니처와 같이 타입에 하나만 사용 가능
// 매핑된 타입을 이용해 레코드 타입을 구현함.
{
	{
		type Weekday = 'Mon' | 'Tue'
		type Day = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun'
		// * NOTE 매핑된 타입
		let nextDay: { [K in Weekday]: Day } = {
			Mon: 'Tue',
			Tue: 'Wed',
		}
		// * 일반적 형태
		type Record<K extends keyof any, T> = {
			[P in K]: T
		}
	}
	// * 매핑된 타입 keyin keyof 타입 조합예제
	{
		type Account = {
			id: number
			isEmployee: boolean
			notes: string[]
		}

		// 모든 필드를 선택형으로 만듦
		type OptionalAccount = {
			[K in keyof Account]?: Account[K] // 키값에 따른 값타입 사용
		}
		// 모든 필드를 다시 필수형으로 만듬 (Account와 같음)
		type Account3 = {
			[K in keyof OptionalAccount]-?: Account[K]
			// -연산자로 옵션 제거
		}

		// 모든 필드를 읽기 전용으로 만듦
		type ReadonlyAccount = {
			readonly [K in keyof Account]: Account[K]
		}

		// 모든 필드를 다시 쓸 수 있도록 만듦(Account와 같음)
		type Account2 = {
			-readonly [K in keyof ReadonlyAccount]: Account[K]
			// -연산자로 readonly 제거
		}

		// 모든 필드를 nullable로 만듦
		type NullableAccount = {
			[K in keyof Account]: Account[K] | null
		}
	}
	// * NOTE 내장 매핑 타입
	/*
  ? Record<Keys, Values>
  Keys 타입의 키와 Values 타입의 값을 갖는 객체
  ? Partial<object>
  Object의 모든 필드를 선택형으로 표시
  ? Required<Object>
  Object의 모든 필드를 필수형으로 표시
  ? Readonly<Object>
  Object의 모든 필드를 읽기 전용으로 표시
  ? Pick<Object, Keys>
  주어진 Keys에 대응하는 Object의 서브타입을 반환
  */
}

// ! ANCHOR 4. 컴패니언(동반) 객체 패턴

// * 같은 이름의 타입과 객체를 쌍으로 연결
// 두개 익스포트하면 하나로 받을 수 있음.
// 컴패니언 객체 패턴(companion object pattern)
// 스칼라에서 유래한 기능(같은 이름을 공유하는 객체와 클래스를 쌍으로 연결)

{
	// 타입 정의
	type Currency = {
		unit: 'EUR' | 'GBP' | 'JPY' | 'USD'
		value: number
	}
	// 같은 이름의 객체
	let Currency: {
		DEFAULT: Currency['unit']
		from(value: number, unit: Currency['unit']): Currency
	} = {
		DEFAULT: 'USD',
		// 함수는 필요조건 아님.
		from(value: number, unit = Currency.DEFAULT) {
			return { unit, value }
		},
	}
	// 둘 다 익스포트 하면 한 이름으로 둘 다 사용가능
}
/*
타입스크립트에서 타입과 값은 별도의 네임스페이스를 갖는다는 사실을 기억하자. “10.4 선언 합치기”에서 이를 조금 더 자세히 설명한다. 따라서 같은 영역에서 하나의 이름(이 예에서는 Currency)을 타입과 값 모두에 연결할 수 있다. 한편, 컴패니언 객체 패턴을 이용하면 별도의 네임스페이스를 이용해 한번은 타입으로, 한 번은 값으로 두 번 이름을 선언할 수 있다.

이 패턴은 유용한 특성을 제공한다. 이 패턴을 이용하면 타입과 값 정보를 Currency 같은 한 개의 이름으로 그룹화할 수 있다. 또한 호출자는 이 둘을 한번에 임포트할 수 있다.
*/
import { Currency } from './3.ex.companionPattern'

let amountDue: Currency = {
	// Currency를 타입으로 사용
	unit: 'JPY',
	value: 83733.1,
}

let otherAmountDue = Currency.from(330, 'EUR') // Currency를 값으로 사용
// 타입과 객체가 의미상 관련되어 있고, 이 객체가 타입을 활용하는 유틸리티 메서드를 제공한다면 컴패니언 객체 패턴을 이용하자.
