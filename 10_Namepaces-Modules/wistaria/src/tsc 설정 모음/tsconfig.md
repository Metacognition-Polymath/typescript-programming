### "lib":["dom", "es2015"]

- 이 설정은 돔 타입을 포함하도록 한다.
- lib 옵션은 프로젝트의 특정 타입을 선언에 포함하여 코드를 해석하게 한다. 이 설정으로 node에서 돔이 동작하게 하지 않는다(컴파일은 되지만 런타임이 안됨).

### "esModuleInterop":true

- 와일드 카드 대체
- 추가하면 import \* as React from 'react' 대신
- import React from 'react'를 해도 된다.

### "jsx":"react"

- tsx를 지원하게 해주는 설정
- 세가지 모드 지원

1. JSX
   지시문에 따라 js로 컴파일한다.
2. react-native
   컴파일 하지 않고 jsx를 보존하며 js 확장자의 파일을 생성한다.
3. preserve
   타입을 검사하지만 컴파일 하지는 않으며 jsx확장자의 파일을 생성한다.

### "module":"esnext"

- 동적 임포트를 지원 "target":"ex2017" 도 필요

```js
let module = await import('module')
```
