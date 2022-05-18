/* 
6.7 이름 기반 타입 흉내내기

만약 필자가 어느 날 꼭두새벽에 여러분을 찾아가 “타입스크립트의 타입 시스템이 구조에 기반합니까 아니면 이름에 기반합니까?”라고 묻는다면 “물론 구


홀


조죠! 당장 내 집에서 나가주세요. 아니면 경찰을 부를 거에요!"라고 말할 것이다. 지극히 당연한 반응이라 생각한다.

이것이 타입스크립트의 규칙이지만, 이름 기반 타입도 때로는 아주 유용하다는 사실을 기억하자. 예를 들어 몇 가지의 ID 타입이 있는데, 그 각각은 시스템에서 사용하는 서로 다른 종류의 객체를 고유한 방식으로 식별해준다고 해보자.

type Company ID = string type OrderID = string type UserID = string type ID = CompanyID | OrderID | UserID

UserID 타입의 값이 "d21b1dbf" 같은 단순 해시값이라고 해보자. 따라서 비록 UserID라는 별칭으로 사용했지만 실질적으로는 일반 string이다. UserID를 인수로 받는 함수는 다음처럼 정의할 수 있다.

function queryForUser(id: UserID) { }

문서화가 잘된 코드로, 다른 팀원들도 어떤 타입의 ID를 전달해야 하는지 명확하게 알 수 있다. 하지만 UserID는 string의 별칭일 뿐이므로 이 정의로는 버그를 확실하게 방지할 수 없다. 어떤 개발자가 실수로 잘못된 ID 타입을 전달하면 타입 시스템도 어쩔 도리가 없기 때문이다!

let id: Company ID = 'b4843361' queryForUser(id) // OK (!!!)

7이 상황이 바로 이름 기반 타입이 유용한 사례다. 타입스크립트는 이름 기반타입을 제공하지 않지만 타입 브랜딩(type branding)이라는 기법으로 이를 흉내낼 수 있다. 이름 기반 타입을 지원하는 다른 언어에 비해 타입스크립트에서 타입 브랜딩으로 이를 흉내내기는 조금 까다로우며 몇 가지 설정도 필요

하다.

7일부 프로그래밍 언어에서는 이를 불투명 타입(opaque type)이라 한다.


하지만 브랜디드 타입(branded type)을 이용하면 프로그램을 한층 안전하게 만들 수 있다.

응용 프로그램과 개발팀의 규모에 따라 이 기능이 필요 없을 수도 있다(규모가 큰 팀일수록 실수를 줄이는 데 도움이 된다).

우선 필요한 이름 기반 타입 각각에 대응하는 임의의 타입 브랜드를 만든다.

type Company ID string & { readonly brand: unique symbol } type OrderID = string & { readonly brand: unique symbol } type UserID = string & readonly brand: unique symbol } type ID = CompanyID | OrderID | UserID

string과 {readonly brand: unique symbol}의 인터섹션은 물론 큰 의미가 없다. 예제 코드에서 이를 사용한 이유는 이런 타입을 만드는 자연스러운 방법이 존재하지 않으며 이 타입의 값을 만들려면 반드시 어서션을 이용해야 하기 때문이다. 이는 브랜디드 타입의 핵심적인 특징으로, 실수로 잘못된 타입을 사용하기가 아주 어렵게 해준다. 예제에서 unique symbol을 브랜드'로 사용했는데 이는 타입스크립트에서 실질적으로 제공하는 두 가지 이름 기반 타입 하나이기 때문이다(나머지 하나는 enum), 그런 다음 이 브랜드를 string과 인터섹션하여 주어진 문자열이 우리가 정의한 브랜디드 타입과 같다고 어서션할 수 있도록 했다.

이제 CompanyID, OrderID, UserID 타입의 값을 만드는 방법이 필요하다. 값을 만드는 데는 컴패니언 객체 패턴(6.3.4 컴패니언 객체 패턴, 참고)을 이용할 것이다. 이제 각 브랜디드 타입의 생성자를 만들어보자. 이때 주어진 값(id)을 앞서 정의한 난해한 타입들로 지정하는 데 타입 어서션(as)을 이용한다.

function CompanyID(id: string) { return id as Company ID }

function OrderID(id: string) { return id as OrderID }

function UserID(id: string) {


return id as UserID }

마지막으로 이들 타입을 다음처럼 사용할 수 있다.

function queryForUser(id: UserID) { // }

let companyId = Company ID('8a6076cf') let orderId = OrderID('9994acc1') let userId = UserID('d21b1dbf')

queryForUser(userId) // OKqueryForUser(companyId) // 에러 TS2345: 'Company ID' 타입의 인수를 // 'UserID' 타입의 매개변수에 할당할 수 없음

런타임 오버헤드가 거의 없다는 것이 이 기법의 장점이다. ID 생성당 한 번의 함수 호출로 충분하며 아마 이 함수 호출조차 자바스크립트 VM이 인라인으로 삽입했을 것이다. 런타임에 모든 ID는 단순한 string이다. 즉, 브랜드는 순전히 컴파일 타임에만 쓰이는 구조물이다.

대부분의 응용 프로그램에선 이렇게까지 하는 건 과할 수 있다. 하지만 규모가 큰 응용 프로그램, 또는 다양한 종류의 ID를 사용해 타입이 헷갈리는 작업환경이라면 브랜디드 타입으로 안전성을 확보할 수 있다.

 */