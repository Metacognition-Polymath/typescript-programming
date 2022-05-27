// ! object relation mapping (ORM)
// 객체와 디비의 데이터를 매핑시켜주는 도구.
// 설명 링크
// https://velog.io/@tilto0822/TypeORM-%EC%B2%98%EC%9D%8C-%EB%A7%8C%EB%82%98%EB%B3%B8-%ED%98%81%EC%8B%A0


// node-postgres 이용한 PostgreSQL

let client = new Client()
let res = await client.query('SELECT name FROM users WHERE id = $1', [1]) // any

// node-mongodb-native 이용한 MongoDB
db.collection('users')
	.find({ _id: '1' })
	.toArray((err, user) => {})
// user는 any

/* 
	수동으로 타입을 추가하면 대부분의 any를 제거하면서 더 안전한 api로 개선 할 수 있다. 하지만 aql api 자체는 여전히 저수준이므로 순식간에 잘못된 타입을 사용하거나 타입지정을 깜빡해서 any로 귀결되기 십상이다.

	객체 관계 매퍼(object relation mapper, ORM)을 사용하면 이 문제를 해결할 수 있는데, ORM 은 데이터베이스 스키마로부터 코드를 만들어 질의 갱신 삭제 등의 작업을 할 수 있는 고수준의 api를 제공한다. 정적 타입 언어를 사용한다면 ORM api가 타입 안전성을 제공해 주므로 타입을 잘못 지정하거나 제네릭 타입 매개변수를 수동으로 한정할 걱정을 할 필요가 없다.
	타입스크립트로 데이터베이스를 처리할 때는  ORM을 사용할 것을 권한다. 현재 이 책을 집필하는 시점에서는 우메드쿠도이베르디에프의 TypeORM이 가장 완성도 높은 타입스크립트용 ORM으로 각광받고 있으며 MySQL, PostgreSQL, MS SQL server, oracle, mongodb 등 다양한 제품을 지원한다.

*/







