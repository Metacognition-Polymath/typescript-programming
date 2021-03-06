# 12장. 타입스크립트 빌드 및 실행

- 타입스크립트를 자바스크립트로 컴파일한 이후부터는 과정이 같다
- 타입스크립트 응용 프로그램을 빌드하고 제품화하는 방법을 살펴보자
  - 타입스크립트 응용 프로그램을 빌드하는데 필요한 준비물
  - 서버에서 타입스크립트 응용 프로그램을 빌드하고 실행하기
  - 브라우저에서 타입스크립트 응용 프로그램을 빌드하고 실행하기
  - 타입스크립트를 빌드하고 NPM으로 발행(publish)하기

## 12.1 타입스크립트 프로젝트 빌드하기

### 12.1.1 프로젝트 레이아웃

- 파일 트리 만들기
  - vscode extension
    - file tree generator
    - project-tree

my-app/
├──────dist/<br />
│ ├──index.d.ts<br />
│ ├──index.js<br />
│ └──services/<br />
│ ├──foo.d.ts<br />
│ ├──foo.js<br />
│ ├──bar.d.ts<br />
│ └──bar.js<br />
└──────src/<br />
├──index.ts<br />
└──services/<br />
├──foo.ts<br />
└──bar.ts<br />

- 소스코드는 src/ 에 저장하고
- 컴파일한 결과는 dist/ 에 저장하는 것이 국룰이다
- 두개를 분리할 수 있고 다른 도구들과 통합하기 편해진다
- 버전관리(git) 대상에서 제외하기 쉽다는 장점도 있다

### 12.1.2 부산물

|     타입     | 파일 확장자 |     tsconfig.json 플래그      | 기본적으로 생성? |
| :----------: | :---------: | :---------------------------: | :--------------: |
| 자바스크립트 |     .js     | {"emitDeclarationOnly":false} |        O         |
|   소스 맵    |   .js.map   |      {"sourceMap":true}       |        X         |
|  타입 선언   |    .d.ts    |     {"declaration":true}      |        X         |
|   선언 맵    |  .d.ts.map  |    {"declarationMap":true}    |        X         |

- 1. 자바스크립트 : TSC는 타입스크립트를 자바스크립트로 변환
- 2. 소스 맵 : 생성된 자바스크립트 코드를 원래 타입스크립트 파일의 행과 열로 연결하는 데 필요한 특별 파일
  - 크롬 DevTools는 자바스크립트 대신 원래의 타입스크립트 코드를 보여준다
- 3. 타입 선언 : 생성된 타입을 다른 타입스크립트 프로젝트에서 이용할 수 있도록 해준다
- 4. 선언 맵 : 타입스크립트 프로젝트의 컴파일 시간을 단축하는 데 사용
  - 12.1.5를 참고하라

### 12.1.3 컴파일 대상 조정

- 자바스크립트는 매년 새로운 버전이 나온다
- 타입스크립트를 자바스크립트로 변환 시 어떤 버전으로 실행할지 결정할 수 있다
- 노드(내가 운영하는 서버)는 선택이 가능하지만 브라우저(내 앱을 사용하는 유저)에선 불가능하다
  - 실행하는 사람이 어떤 브라우저를 사용할지 알 수 없다
  - 최소한의 기능집합을 정의하고, 나머지는 폴리필로 제공하자
    - 사용자가 너무 오래된 버전의 브라우저를 사용할 때만 업그레이드를 권유하는 메세지를 보여주자
- 코드는 가능한 최신버전으로 작성하는 것이 좋다(?) - 개발자 경험(?)

  - 트랜스파일(자동 변환 등)으로 낮은 자바스크립트 버전으로 변환이 가능하다
  - 폴리필 : 실행하려는 자바스크립트 런타임이 포함하지 않는 최신 기능을 폴리필로 제공한다.

- TSC는 트랜스파일은 제공하지만(예전 자바스크립트 버전으로 변환) 폴리필은 자동으로 해주지 않는다

  - target : 트랜스 파일하려는 자바스크립트 버전을 설정 - es5, es2015, 등
  - module : 대상 모듈 시스템을 설정(es2015, commonjs, systemjs 모듈 등)
    - 대상 환경이 NodeJS냐 브라우저냐에 따라 달라짐
  - lib : 타입스크립트에게 대상 환경에서 어떤 자바스크립트 기능을 지원하는지 알려준다
    - es5, es2015, dom 등

- ESNext : 가장 최신 자바스크립트
- 폴리필 시 @babel/polyfill을 설치 후 바벨을 이용해 컴파일할 때 필요한 폴리필을 자동설치하게 할 수 있다

### 12.1.4 소스맵 활성화

- 소스 맵은 트랜스파일된 코드를 원본 코드와 이어주는 정보를 제공
- Rollup같은 압축 프로그램으로 tree-shake를 수행할 수 있다
- 소스맵 단점 : 브라우저 코드에 어느정도의 보안이 요구되는 상황이라면 고객용 브라우저 환경에서는 소스맵을 포함시키지 않는 편이 좋다

### 12.1.5 프로젝트 참조(project reference)

- 응용 프로그램의 크기가 커지면 TSC가 타입을 확인하고 코드를 컴파일하는 데 오래 걸린다

  - 이 문제의 해법으로 TSC는 점직적으로 컴파일과 함께 프로젝트 참조라는 기능을 제공하여 컴파일 시간을 획기적으로 줄였다

### 프로젝트 참조 사용 예

#### 1. 타입스크립트 프로젝트를 여러 프로젝트로 분리한다

    - 수정(변경)될 가능성이 큰 코드들은 같은 디렉터리에 저장하는 방식으로 코드를 쪼갠다

#### 2. 각 프로젝트 디렉터리에 최소한 다음 정보를 포함하는 tsconfig.json을 만든다

```json
{
  "complierOptions": {
    "composite": true, // TSC에 이 디렉터리는 큰 타입스크립트 프로젝트의 서브프로젝트임을 알려준다
    "declaration": true, // TSC에 이 프로젝트의 .d.ts 선언 파일을 생성하라고 지시한다
    "declarationMap": true,
    "rootDir": "."
  },
  "include": ["./**/*.ts"],
  "reference": {
    "path": "..myReferenced",
    "prepend": true
  }
}
```

- 각 항목의 의미
  - composite : TSC에 이 디렉터리는 큰 타입스크립트 프로젝트의 서브프로젝트임을 알려준다
  - declaration : TSC에 이 프로젝트의 .d.ts 선언 파일을 생성하라고 지시한다
    - 참조하고 있는 프로젝트에선 타입 오류가 없는지만 확인
      - 프로젝트 참조가 프로젝트의 빌드 효율을 높여주는 핵심 원리
  - declarationMap : TSC에 생성된 타입 선언의 소스맵을 빌드하라고 지시
  - rootDir : 이 (서브)프로젝트가 루트 프로젝트(.)에 상대적으로 컴파일되어야 함을 명시한다
  - reference : 이 (서브)프로젝트가 의존하는 다른 서브프로젝트들의 목록
    - path : tsconfig.json파일이 담긴 디렉터리를 기리킨다
      - 설정파일이 tsconfig.json이 아닌 경우엔 TSC 설정파일을 직접 가리켜야한다
    - prepend : 참조하는 서브 프로젝트에서 생성한 자바스크립트와 소스 맵을 이 서브프로젝트에서 생성한 소스맵에 이어 붙인다
      - prepend는 outFile을 사용할 때만 유용하다(outFile을 사용하지 않았다면 prepend를 제거할 수 있다)

#### 3. 다른 서브프로젝트도 만든다

```json
{
  "file": [],
  "reference": [
    {
      "path": "./myProject"
    },
    {
      "path": "./mySecondProject"
    }
  ]
}
```

#### 4. 프로젝트를 컴파일할 때 프로젝트 참조를 활용하도록 build 플래그를 지정한다.

tsc --build

#### extends로 불필요한 tsconfig.json 설정 줄이기

서브 프로젝트에선 다른 곳의 tsconfig.json옵션을 extends 옵션으로 불러와서 확장할 수 있다

```json
{
  // 서브 프로젝트의 tsconfig.json
  "extends": "../tsconfig.base",
  "include": ["./**/*.ts"],
  "reference": [
    // ...
  ]
}
```

### 12.1.6 에러 모니터링

- 프론트 에러 모니터링 도구
  - Sentry
  - Bugsnag
  - PM2
  - Winston

## 12.2 서버에서 타입스크립트 실행

- 타입스크립트 코드를 NodeJS환경에서 실행하려면 tsconfig.json의 module 플래그를 commonjs로 설정하고,
  코드를 ES2015 자바스크립트로 컴파일한다
- import -> require, export -> module.exports로 변환해줌

## 12.3 브라우저에서 타입스크립트 실행

- 브라우저에서 타입스크립트를 실행하려면 서버에서 보다 해줘야할 일이 많다
- 컴파일 하려는 모듈 시스템을 선택한다
  - NPM으로 ㅂ라행할 때는 umd를 사용해 다양한 모듈 번들러와의 호환성을 극대화하자
  - NPM에 발행할 계획이 없다면 사용하려는 번들러(웹팩, 롤업 등)에 맞는 포맷으로 컴파일 하면된다
    - 모듈 번들러
      - Webpack, Rollup (ES2015) => module : "esnext"
      - Browserify (CommonJS) => module : "commonjs"
    - SystemJS 모듈로더
      - module : "systemjs"

#### TSC만으론 기능이 부족하기 때문에 플러그인을 사용하자

- 웹팩 : ts-loader
- 브라우저리 파이 : tsify
- 바벨 : @babel/preset-typescript
- Gulp : gulp-typescript
- Grunt : grunt-ts

#### 간단하게 알아보는 번들 최적화

- 코드를 모듈로 유지하고 코드에서 임의의 의존성을 피한다(전역 window에 무언가를 넣고 사용하는 것)
- 동적임포트를 이용하면 첫 페이지 렌더링 속도를 높일 수 있다
- 빌드 도구에서 제공하는 자동 코드 분할 기능을 사용하면 페이지 로딩이 불필요하게 느려지지 않는다
- 페이지 로딩 시간을 측정하는 수단을 마련한다
  - 측정 도구
    - New Relic
    - Datadog
- 제품 빌드를 개발 빌드와 같은 형태로 유지한다
  - 다르면 디버깅이 어려워짐
- 타입스크립트를 브라우저에서 실행하도록 출시하는 상황이라면
  - 빠진 브라우저 기능을 폴리필로 제공

## 12.4 타입스크립트 코드를 NPM으로 발행하기

타입 스크립트 코드를 배포할 때 규칙

- 자신의 코드를 쉽게 디버깅할 수 있도록 소스맵을 생성
- 다른 사람이 여러분의 코드를 쉽게 빌드하고 실행할 수 있도록 ES5로 컴파일
- 어떤 모듈 타입으로 컴파일할지 주의 깊게 결정(UMD, CommonJS, ES2015)
- 다른 타입스크립트 사용자가 여러분의 코드의 타입을 얻을 수 있도록 타입 선언을 생성

- 절차 1
  - 타입스크립트를 자바스크립트로 컴파일, 대응하는 타입 선언을 생성

```json
{
  "compilerOptions": {
    "declaration": true,
    "module": "umd",
    "sourceMaps": true,
    "target": "es5"
  }
}
```

- 절차 2
  - NPM에 발행하지 않을 타입스크립트 코드 목록을 .npmignore 파일에 기재하여 패키지가 너무 커지지 않도록 함
  - .gitignore파일에는 부산물을 제외하게 끔 설정해서 깃 저장소가 불필요한 파일로 오염되는 일을 방지

```sh
# .npmignore
# *.ts # Ignore .ts files
# !*.d.ts # Allow.d.ts files
src/ # 소스 파일 무시

# .gitignore
# *.d.ts # Ignore .d.ts files
# *.js # Ignore .js files
dist/ # 생성된 파일 무시
```

- 절차 3
  - 프로젝트의 package.json에 "types" 필드를 추가해서 타입선언이 제공될 것임을 알려준다
  - 발행 전에 "script"옵션을 추가해서 패키지의 자바스크립트, 타입 선언, 소스 맵이
    항상 원본 타입스크립트와 같은 최신 버전이 되도록 만든다

```json
{
  // ...
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "script": {
    "prepublishOnly": "tsc -d" // declare
  }
}
```

- 절차 마지막
  - npm publish

## 12.5 세 슬래시 지시어(triple-slash directive)

- 특별한 포맷의 타입스크립트를 주석으로 TSC에 명령을 하달한다
  - 낡은 타입스크립트 기능
  - 많은 것들이 있지만 여기에선 두 가지만 살펴본다

### 12.5.1 types 지시어

export한 대상들이 여러분 모듈에서 오직 타입 위치에서만 쓰인다면(특히 타입 하나만 임포트할 때 자주 발생)

타입스크립트는 import문에 해당하는 자바스크립트 코드를 전혀 생성하지 않는다

```ts
import "./global"; // 생략 안됨
import { MyType } from "./global"; // 생략 됨

// 강제로 생략하고 싶은 경우
// <reference type="./global">
```

### 12.5.2 amd-module 지시어

- 타입스크립트 코드를 AMD 모듈 포맷으로 컴파일 할 때

```ts
// <amd-module name="LogService" />
```

- AMD 모듈에 이름을 지어줄 수 있다
- 하지만 가능하면 ES2015같은 더 최신 모듈 포맷으로 전환하자

## 12.6 마치며

- 12장에선 응용 프로그램을 실제 제품화하여 브라우저나 서버용으로 빌드하고 실행하는 데 필요한 모든 정보를 확인했다
  - 어떤 자바스크립트 버전으로 컴파일할지
  - 운용 환경에 어떤 라이브러리가 필요하다고 표시할지
    - 지원도지 않는다면 어떻게 폴리필 할지
  - 제품 환경과 개발 환경 모두에서 쉽게 디버깅할 수 있도록 소스 맵을 빌드하여 응용 프로그램에 탑재
  - 타입 스크립트 프로젝트의 컴파일 시간을 단축할 수 있는 프로젝트 모듈화
  - 타입스크립트를 서버에서 또는 브라우저에 실행
  - NPM에 발행하는 방법
