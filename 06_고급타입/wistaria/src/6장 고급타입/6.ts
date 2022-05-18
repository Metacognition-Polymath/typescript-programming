/* 6.6 탈출구

상황에 따라서는 타입을 완벽하게 지정하지 않고도 어떤 작업이 안전하다는 사실을 타입스크립트가 믿도록 만들고 싶을 때가 있다. 예를 들어 여러분이 사용하고 있는 서드 파티 모듈의 타입 정의가 잘못되었음을 파악한 후 DefinitelyTyped에 수정 사항을 기여하기 앞서 여러분 코드에서 먼저 검증해보려 한다거나, 아폴로(Apollo)로 타입 선언을 다시 만들지 않 은 채 API가 반환한 데이터를 사용해야 하는 상황일 수도 있다.

다행히 타입스크립트는 우리가 인간이라는 사실을 잘 이해하고 있으며, 안전한 작업임을 타입스크립트에 증명할 시간이 없을 때 활용할 수 있는 탈출구를 제공한다.

명확하지 않다면, 다음에 나열하는 타입스크립트 기능들은 되도록 적게 사용하는 게 좋다. 이 기능들에 너무 의존하는 상황이라면 무언가 잘못된 것일 수 있다.

6.6.1 타입 어서션

타입 B가 있고 A <: B <; C를 만족하면 타입 검사기에게 B는 실제로 A거나 C라고 어서션(assertion; 단언, 확언)할 수 있다. 주의할 점은, 어떤 하나의 타입은 자신의 슈퍼타입이나 서브타입으로만 어서션할 수 있다. 예를 들어 number와 string은 서로 관련이 없으므로 number를 string이라고 어서션할 수는 없다.

타입스크립트는 두 가지의 타입 어서션 문법을 제공한다.

function format Input(input: string) { // .. }

function getUserInput(): string | number { // .. }

let input = getUserInput()

// inputol string0|2/2 041441 format Input (input as string) o

// 위 코드와 같은 의미 format Input (<string>input)

Definitelytyped는 시드 파티 자바스크립트를 위한 오픈 소스 타입 선언 저장소다. 더 자세한 사항은 “11.4.25 Definitely Typed에서 타입 선언을 제공하는 자바스크립트"를 참고하자.

0 타입 어시션(as)을 이용해 타입스크립트에게 input의 타입은 (앞 줄에서 추론되었을) string | number가 아니라 string이라고 알려준다. 예를 들어 getUserInput이 string을 반환한다는 사실을 확신하는 상황에서 formatInput 함수를 빠르게 테스트하려 할 때 이 방법을

.④ 기존에는 꺾쇠괄호 문법으로 타입 어서션을 정의했다. 두 문법 모두 같은 의미를 갖는다.

활용할 수 있다

타입 어서션에는 꺾쇠괄호(<>)보다는 as 문법을 추천한다. 꺾쇠괄호를 사용하면 TSX문법(248쪽의 “TSX = JSX + 타입스크립트” 참고)과 혼동을 일으킬 수 있기 때문이다. TSLint의 noangle-bracket-type-assertion)을 사용하면 이 규칙을 코드베이스에 강제할 수 있다.

두 타입 사이에 연관성이 충분하지 않아서 한 타입을 다른 타입이라고 어서션할 수 없는 때도 있다. 이 문제는 단순히 any라고 어서션하여 우회할 수 있다. (any는 모든 것에 할당할 수 있기 때문이다(6.1.3 할당성, 참고). 하지만 이렇게 해버리면 어떤 일이 발생할지 조금 더 생각해보자.

function addToList(list: string[], item: string) { // ... }

addToList('this is really,' as any, 'really unsafe')

언뜻 봐도 안전하지 않은 타입 어서션이므로 되도록 피해야 한다.

6.6.2 Nonnull 어서션

널이 될 수 있는 특별한 상황(T | null 또는 T | null | undefined 타입)을 대비해 타입스크립트는 어떤 값의 타입이 null이나 undefined가 아니라 T임을 단언하는 특수 문법을 제공한다. 몇 가지 상황에서 이 기능을 활용할 수 있다.

예를 들어 웹 앱에서 다이얼로그를 보여주거나 숨기는 프레임워크를 개발했다고 가정하자. 각 다이얼로그는 고유의 ID를 가지며 이 ID로 다이얼로그의

I DOM 노드 참조를 얻을 수 있다. DOM에서 다이얼로그가 사라지면 ID를 삭제해서 DOM 안에 다이얼로그가 더 이상 존재하지 않음을 알린다.

- type Dialog = { id?: string }

15 function closeDialog(dialog: Dialog) { if (!dialog.id) { O return } setTimeout() removeFromDOMO dialog, document.getElementById(dialog.id) // 01124 TS2345: // 'string | undefined' 타입의 인수는 // 'string' 타입의 매개변수에 할당할 수 없음 ③ 1 }

function removeFromDOM(dialog: Dialog, element: Element) {element. parentNode. removeChild(element) // 에러 TS2531: 객체가

// 'null'일 수 있음 ④delete dialog.id}

0 다이얼로그가 이미 삭제되어서 id가 없다면 일찍 반환한다. ② 이벤트

루프의 다음 차례 때 다이얼로그를 삭제하도록 하여 dialog에 의존

하는 다른 코드가 마무리 작업을 실행할 수 있는 기회를 제공한다. ③

화살표 함수 내부이므로 유효범위가 바뀌었다. 과 사이에서 어떤 코드가 dialog를 변경해도 타입스크립트는 알 수 없으므로 0에서 시행한 정제가 무효화된다. 또한 dialog.id가 정의되어 있으면 그 ID에 해당하는 요소가 DOM에 반드시 존재한다는 사실을 우리는 알고 있지만(프레임워크를 이렇게 설계했으므로) 타입스크립트 입장에서는 document.getElementById를 호출하면 HTMLElement | null을 반환한다는 사실만 알고 있을 뿐이다. 우리는 결앗값이 항상 널이 아닌 HTMLElement임을 알지만, 우리가 제공한 타입에만 의존하는 타입스크립트는 이 사실을 알지 못한다.


마찬가지로 우리는 IDOM에 다이얼로그가 있으며 부모 DOM 노드도 있다.는 사실을 알고 있지만 타입스크립트는 element.parentNode가 Node | null이라는 사실만 알 뿐이다.

필요한 모든 곳에 if (_ null)을 추가해 이 문제를 해결할 수 있다. 대상이 null인지 여부를 확신할 수 없다면 올바른 해법이다. 하지만 대상이 null |undefined가 아님을 확신하는 경우라면 타입스크립트가 제공하는 특별 문법을 활용할 수 있다.

type Dialog = { id?: string }

function closeDialog(dialog: Dialog) { if (!dialog.id) { return } setTimeout() > removeFromDOM( dialog, document.getElementById(dialog.id!)! ) }

function removeFromDOM(dialog: Dialog, element: Element) { element.parentNode!. removeChild(element) delete dialog.id }

간간히 보이는 nonnull 어서션 연산자(!)로 document.getElementById의 호출 결과인 dialog.id와 element.parentNode가 정의되어 있음을 타입스크립트에 알려주었다. null이거나 undefined일 수 있는 타입 뒤에 nonnull 어서션이 따라오면 타입스크립트는, 가령 T | null | undefined로 정의된 타입은 T로, number | string | null로 정의된 타입은 number | string으로 바꾼다.

nonnull 어서션을 너무 많이 사용하고 있다는 생각이 들면 코드를 리팩터링해야 한다는 징후일 수 있다. 예를 들어 Dialog를 두 타입의 유니온으로 분리해어서션을 제거할 수 있다.

type VisibleDialog = {id: string} type DestroyedDialog = {} type Dialog = VisibleDialog | DestroyedDialog

그리고 이 우니온을 이용하도록 closeDialog 코드를 수정한다.

function closeDialog (dialog: Dialog) { if (!('id' in dialog)) { return } setTireout() => renoveFromDOM dialog, document.getElementById(dialog, id)! ) }

function removeFroTDOM(dialog: VisibleDialog, element: Element) { element.parentNode!.removeChild(element) delete dialog.id }

dialog에 id 프로퍼티가 정의되었음을 확인한 뒤로는(VisibleDialog임을 의미) 화살표 함수 내부에서도 타입스크립트는 dialog의 참조가 바뀌지 않았음을 안다. 즉, 화살표 함수 내부의 dialog는 외부의 dialog와 같은 값이므로, 이건 예제에서 정게를 무효화했던 것과 달리 이번에는 정제 결과가 계속 이어진다.

6.6.3 확실한 할당 어서션

타입스크립트는 확실한 할당 검사(타입스크립트가 변수를 사용할 때 값이 이미 할당되어 있는지 검사하는 방법)용으로 nonnull 어서션을 적용하는 특별한 상황에 사용할 특수 문법을 제공한다.

let userId: stringuserId. toUpperCase()// 에러 TS2454: 할당하지 않고 'userId

이 에러 검출은 타입스크립트가 제공하는 멋진 서비스라 할 수 있다.

' 변수를 사용함


userId 변수를 선언했지만 값을 할당하는 걸 깜빡 잊은 채 대문자 변환 작업을 수행했다. 타입스크립트가 검출해주지 않았다면 런타임 에러가 발생했을 것이다! 하지만 코드가 다음과 같다면 어떨까?

let userId: string fetchUser()

userId.toUpperCase() //

TS2454: 할당하지 않고 'userId' 변수를 사용함

function fetchUser() { userId = globalCache.get('userId') }

우연히 100퍼센트 적중하는 세계 최고의 캐시를 개발했다고 해보자. 따라서 fetchUser를 호출하면 항상 userId가 올바로 정의됨을 보장한다. 하지만 타입스크립트는 정적 검사만으로는 이 사실을 알아채지 못하므로 이전과 같은 에러를 발생시켰다. 이런 상황에서는 확실한 할당 어서션을 이용하여 userId를 사용하는 시점에는 이 변수가 반드시 할당되어 있을 것임을 타입스크립트에 알려줄 수 있다(첫 번째 줄의 느낌표에 주목).

let userId!: string fetchUser()

userId. toUpperCase() // OK

function fetchUser() { userId = globalCache.get('userId') }

타입 어서션, nonnull 어서션과 마찬가지로 확실한 할당 어서션을 너무 자주 사용하고 있다면 무언가 잘못 되어가는 중일 수 있다.
 */
