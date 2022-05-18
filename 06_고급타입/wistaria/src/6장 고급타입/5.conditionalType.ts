// ! ANCHOR 조건부 타입
// 조건부 타입은
// 타입별칭, 인터페이스, 클래스, 매개변수 타입, 함수와 메서드의 제네릭 기본값 등 사용가능
{
	// * 삼항연산자의 사용 (중첩가능)
	type IsString<T> = T extends string ? true : false
	// T는 string의 서브타입이면 true 아니면 false
	type A = IsString<string> // true
	type A2 = IsString<'string'> // true
	type B = IsString<number> // false
}

// ! ANCHOR 1. 분배적 조건부

// * NOTE 유니온과 삼항연산자로 분배
// string extends T? A:B
// (string | number) extends T? A:B
// (string | number | boolean) extends T ? A: B
{
	// * T타입을 받아 T[]을 리턴하는 함수
	type ToArray<T> = T[]
	// 적용시
	type A = ToArray<number> // number[]
	type B = ToArray<number | string> // (number | string) []
}
{
	// * 조건부 타입 추가
	type ToArray2<T> = T extends unknown ? T[] : T[]
	type A = ToArray2<number> // number[]
	type B = ToArray2<number | string> // number[] | string[]
}
{
	// * 타입스크립트 해석과정
	type Without<T, U> = T extends U ? never : T
	{
		// 1. 작성
		type A = Without<boolean | number | string, boolean> // number | string
	}
	{
		// 2. 유니온 분배
		type A =
			| Without<boolean, boolean>
			| Without<number, boolean>
			| Without<string, boolean>
	}
	{
		// 3. without 정의 교체 T U 적용
		type A =
			| (boolean extends boolean ? never : boolean)
			| (number extends boolean ? never : number)
			| (string extends boolean ? never : string)
	}
	{
		// 4. 조건 평가
		type A = never | number | string
	}
	{
		// 5. 단순화
		type A = number | string
	}
}

// ! ANCHOR 2. infer 키워드
// * 제네릭을 인라인으로 선언하는 전용 키워드
{
	// * 제네릭 사용시
	// T가 배열이면 T의 요소가 타입 아니면 T가 타입
	type ElementType<T> = T extends unknown[] ? T[number] : T
	type A = ElementType<string[]> // string[]를 주면 string

	// * NOTE infer 사용시 (위와 같은 상태)
	// 제네릭에 U를 선언하지 않았지만, 배열의 내용값으로 U를 사용.
	type ElementType2<T> = T extends (infer U)[] ? U : T
	type B = ElementType2<string[]> // string

	// 미리선언시 오류
	type ElementUgly<T, U> = T extends U[] ? U : T
	type C = ElementUgly<number[]>
	// 에러 TS2314: 제네릭 타입 'Elerentigly'는 두 개의 타입 인수를 필요로 함
}
{
	// * NOTE 다른 사용예
	// Array.slice의 타입 얻기
	type F = typeof Array['prototype']['slice']
	// type F = (start?: number | undefined, end?: number | undefined) => any[]

	// F 입력받을 함수 작성 infer 사용
	type SecondArg<F> = F extends (a: any, b: infer B) => any ? B : never
	type A = SecondArg<F> // number | undefined

}

// ! 3. 내장 조건부 타입들 


/* 
조건부 타입을 이용하면 정말 강력한 연산자 몇 가지를 타입 수준에서 표현할 수 있다. 타입스크립트가 전역에서 바로 사용할 수 있는 여러 조건부 타입을 제공하는 이유도 바로 이 때문이다.

Exclude<T, U>

이전에 살펴본 Mithout 타입처럼 T에 속하지만 U에는

없는 타입을 구한다.

type A = number | string type B = string type C = Exclude<A, B> // number

• Extract<T, U>T의 타입 중 U에 할당할 수 있는 타입을 구한다.

type A = number | string type B = string type C = Extract<A, B> // string

NonNullable<T>

T에서 null과 undefined를 제외한 버전을 구한다.

type A = {a?: number | null} type B = NonNullable<A['a']> // number

ReturnType<F>

함수의 반환 타입을 구한다(제네릭과 오버로드된 함수에서는 동작하지 않는다).

type F = (a: number) => string type R = ReturnType<F> // string

InstanceType<C>클래스 생성자의 인스턴스 타입을 구한다.

type A = {new(): B} type B = {b: number} type I = InstanceType<A> // {b: number}
 */
