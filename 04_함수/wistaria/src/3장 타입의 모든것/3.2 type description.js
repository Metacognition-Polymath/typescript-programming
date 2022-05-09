var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
{ // ### any
    // any 타입은 모든 타입이므로 타입검사기를 무시한다.
    // any타입에 예외를 일으키고 싶다면 noImplicitAny, 또는 strict 옵션을 사용한다
    var a_1 = 1; // any 오류 안남. 컴파일 잘 댐???
}
{ // ### unknown
    // 타입을 알 수 없는 값에는 any 말고 unknown을 사용한다.
    // 지원연산 연산 : 비교(== === || && ??), 반전(!)
    // 1. 타입스크립트가 unknown 을 추론하지 않기 때문에 사용자 명시적으로 사용한다.
    var a_2 = 1;
    // 2. unknown 타입과 다른 타입의 값을 비교할 수 있다.
    var b_1 = a_2 === 123;
    // 3. unknown 타입이 특정 타입이라고 가정하여 동작을 수행할 수는 없다.
    var c_1 = c_1 + 10; //'+' 연산자를 'unknown' 및 '10' 형식에 적용할 수 없습니다.ts(2365)
    // 4. 특정 타입의 동작을 수행하려면 다음처럼 타입정제를 이용한다.
    if (typeof (a_2) === 'number') { // typeof, instanceof 로 정제, 넘버타입인 경우만 실행
        var d_1 = a_2 + 10;
    }
}
{ // ### boolean
    // 지원연산 : 비교(== === || && ??), 반전(!)
    var a3 = true; // 타입추론 boolean
    var b3 = false; // 타입추론 boolean
    var c3 = true; // 타입추론 true
    var d3 = true; // 타입명시 boolean
    // ### 타입 리터럴 : 오직 하나의 값을 나타내는 타입
    var e3 = true;
    var f3 = true; // 'true' 형식은 'false' 형식에 할당할 수 없습니다.ts(2322)
}
{ // ### number
    // 2^52 이하의 정수표현
    // 모든 숫자(정수, 소수, 양수, 음수, Inficity, NaN)
    // 지원연산 : + - * / % ** < 등
    var a4 = 1234; // 추론 number
    var b4 = Infinity * 0.1; // 추론 number
    var c4 = 5678; // 5678
    var d4 = a4 > b4; // boolean
    var e4 = 100; // number
    var f4 = 26.31; // 26.31
    var g4 = 31; // '31' 형식은 '26.31' 형식에 할당할 수 없습니다.ts(2322)
}
{ // ### bigint
    // 타입스크립트에 새로 추가된 정수 타입, number보다 큰 정수처리에 좋다
    // 지원연산 : + - * / < 등
    var a5 = 1234n; // 추론 bigint
    var b5 = 5678n; // 추론 5678n
    var c5 = a5 + b5; // 추론 bigint
    var d5 = a5 < 1234; // 추론 boolean
    var e5 = 88.5n; // bigint 리터럴은 정수여야 합니다.ts(1353)
    var f5 = 100n; // 명시 bigint
    var g5 = 100n; // 명시 100n
    var h5 = 100; // 'number' 형식은 'bigint' 형식에 할당할 수 없습니다.ts(2322)
}
{ // ### string
    var a6 = 'hello'; // 추론 string
    var b6 = 'billy'; // 추론 string
    var c6 = '!'; // 추론 '!'
    var d6 = 1 + ' ' + b + c; // 추론 string
    var e6 = 'zoom'; // 명시 string
    var f6 = 'jhon'; // 명시 'jhon'
    var g6 = 'zoe'; // '"zoe"' 형식은 '"jhon"' 형식에 할당할 수 없습니다.ts(2322)
    var str = "a";
}
{ // ## symbol
    // es6 에서 추가된 타입
    // 객체와 맵에서 문자열 키를 대신하는 용도로 사용
    // 심벌키를 사용하면 잘 알려진 키만 사용하도록 강제할 수 있다.
    // 이터레이터를 사용하거나 인스턴스를 런타임에 오버라이딩하는것과 비슷한 기능을 제공한다???
    // 심볼은 같은 이름으로 생성해도 다른 고유의 값을 갖는다.
    var a7 = Symbol('hello'); // 추론 symbol
    var b7 = Symbol('b'); // 추론 Symbol
    var c7 = a7 === b7; // boolean
    var d7 = a7 + 'x'; // '+' 연산자는 'symbol' 유형에 적용될 수 없습니다.ts(2469)
    var e7 = Symbol('e7'); // 추론 typeof e7
    // 하나의 심볼로 명시할 때는 unique symbol을 사용한다.
    var f7 = Symbol('f7'); // 명시 typeof f7
    var g7 = Symbol('g7'); // 에러 떠야 하는데 안뜸.
    // unique symbol 타입은 const 사용해야함
    var h7 = e7 === e7; // boolean
    var i7 = e7 === f7; // 'typeof e7' 및 'typeof f7' 형식에 겹침이 없기 때문에 이 조건은 항상 'false'을(를) 반환합니다.ts(2367)
}
{ // ### object
    /* 구조기반타입화
    구조기반타입화에서는 개체의 이름에 상관없이 객체가 어떤 프로퍼티를 갖고있는지 따진다.
    일부 언어에서는 덕 타이핑이라고 한다.
    */
    var a_3 = { b: 'x' };
    a_3.b; // 'object' 형식에 'b' 속성이 없습니다.ts(2339)
    // object 타입으로 명시하면 기본 타입 이외의 속성을 가질 수 없다.
    var b_2 = { a: 'x' }; // let b: { a: string; }
    var c_2 = { c: { d: 'f' } }; // 중괄호 안에서 타입을 명시할 수 있다.
    var d_2 = { b: 12 };
}
{ // const 선언 타입추론
    var a_4 = Object.freeze({
        b: 12
    });
    a_4.b = 12;
}
{
    var a_5 = {};
    a_5[Symbol.iterator] = function () {
        yield 1;
        yield 1;
        yield 1;
        yield 1;
    };
    console.log(__spreadArray([], a_5, true));
    var o = {
        a: 1,
        b: '2',
        c: 3,
        d: '4'
    };
    var o2 = {
        a: 1,
        b: '2',
        c: 3,
        d: '4'
    };
    var o3 = Object.freeze({
        a: 1
    });
    o3.b = 2;
    var o4 = {
        a: 1
    };
    // enum 단점 트리세이킹??이 안됨
    var a_6 = [1, '2'];
}
{
    var j = [1, 2, 3];
    j.push(4);
    j.push("5");
    var a_7 = 1;
    console.log(a_7);
}
