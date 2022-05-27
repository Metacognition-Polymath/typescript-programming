// ! HTTP TCP 소켓기반 프로토콜 처럼 타입을 사용하지 않는 네트워크 프로토콜로 통신해야 한다면,
// ! 다음처럼 타입안전성을 제공하는 프로토콜을 직접 개발하여 사용한다
{
	type Request =
		| { entity: 'user'; data: User }
		| { entity: 'location'; data: Location }

	// client.ts
	async function get<R extends Request>(
		entity: R['entity']
	): Promise<R['data']> {
		let res = await fetch(`/api/${entity}`)
		// axios 는 제네릭을 지원, 타입안전성에 좋다.
		// 인터셉터, 
		// graphQL generator
		// axios 코드 제네릭에
		// json to typescript 로 만든 리퀘스트 타입을 입력해서 타입전달
		// 센트리 추가사항
		// 
		let json = await res.json()
		if (!json) throw ReferenceError('엔티티를 찾을 수 없습니다.')
		return json
	}
	// app.ts
	async function startApp() {
		let user = await get('user') // 사용자
	}
}
/* 
대응하는 post put 함수를 구현하여 rest api 에 응답하도록 하고, 서버가 지원하는 각 엔티티에 타입을 추가한다. 백엔드에서는 각각의 엔티티 타입에 대응하는 핸들러들을 구현한다. 핸들러들은 클라이언트가 요구한 엔티티를 데이터베이스에서 읽어 클라이언트로 전송해주면 된다.

하지만 서버 코드가 타입스크립트로 구현되지 않았거나 Request 타입을 클라이언트와 서버가 공유할 수 없는 상황이거나 (그러면 시간이 흐르면서 서로 다른 버전의 Request를 사용하게 될 수도 있다) Rest를 사용하지 않는다면 ? 스위프트 클라이언트나 자바 클라이언트 등 다른 클라이언트를 지원해야한다면?

이럴때 타입을 지원하는 코드 생성 api가 필요하다. 시중에는 다양한 코드 생성 api가 존재하며 각각은 타입스크립트를 포함하여 수많은 언어를 지원하다. 다음은 몇가지 예다.

RESTful API용 스웨거
GraphQL용 아폴로와 릴레이
RPC용 gRPC 와 아파치 스리프트

이들 도구는 서버와 클라이언트가 동일한 프로토콜을 사용하도록 하며 이를 특정 언어에 맞는 구조로 컴파일한다.
코드 생성 기술 덕분에 클라이언트와 서버간의 동기화가 깨지는 문제를 피랗ㄹ 수 있다. 모든 플랫폼이 같은 스키마를 공유할 뿐 세부적인 구현은 신경쓰지 않아도 되기 때문이다.

*/
