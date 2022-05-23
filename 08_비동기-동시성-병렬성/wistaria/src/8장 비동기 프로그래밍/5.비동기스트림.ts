/* 
! 8.5 미래의 서로 다른 시점에 이용할 수 있게 될 값이 여러개라면 어떻게 처리하는가?

nodejs의 event emitter,
RxJS 리액티브 프로그래밍 라이브러리,(그외 MostJS, xtream)
  이 둘의 관계는 콜백과 프로미스의 관계와 비슷하다.
  `npm i rxjs`
*/

// * 이벤트 방출기
interface Emitter {
	// 이벤트 방출
	emit(channel: string, value: unknown): void
	// 이벤트가 방출되었을 때 어떤 작업을 수행
	on(channel: string, f: (value: unknown) => void): void
}
/* 
대부분 언어에서 이런 형태의 이벤트 방출기는안전하지 않다. value 타입이 특정 channel 에 의존하는데 대부분의 언어에서는 이런 관계를 타입으로 표현할 수 없기 때문. 타입스크립트는 안전하게 표현 가능.
*/

// redis의 예 (인메모리 데이터베이스)
import redis from 'redis'
{
	// 새로운 Redis 클라이언트 인스턴스 생성
	let client: RedisClient = redis.createClient()
	// 클라이언트가 방출하는 몇 가지 이벤트 리스닝
	client.on('ready', () => console.info('client is ready'))
	client.on('error', (err) => console.error(err))
	client.on('reconnecting', (params) => console.info('Reconnecting...', params))

	// redis api 를 사용할 때 on 메서드의 인수 타입을 구현
	type RedisClient = {
		on(event: 'ready', f: () => void): void
		on(event: 'error', f: (e: Error) => void): void
		on(
			event: 'reconnecting',
			f: (params: { attempt: number; delay: number }) => void
		): void
	}
}
// 잘 동작한다. 매핑된 타입을 이용해보자. 이벤트 방출기 타입에서 흔히 쓰인다.
{
	type Events = {
		ready: void
		error: Error
		reconnecting: { attempt: number; delay: number }
	}
	type RedisClient = {
		on<E extends keyof Events>(event: E, f: (arg: Events[E]) => void): void
		emit<E extends keyof Events>(event: E, arg: Events[E]): void
	}
	let client: RedisClient = redis.createClient()
	// 클라이언트가 방출하는 몇 가지 이벤트 리스닝
	client.on('ready', () => console.info('client is ready'))
	client.on('error', (err) => console.error(err))
	client.on('reconnecting', (params) => console.info('Reconnecting...', params))
}
