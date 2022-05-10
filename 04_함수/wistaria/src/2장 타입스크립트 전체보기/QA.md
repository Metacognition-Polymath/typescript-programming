
Q.

1. tsc 명령어를 수행하면 tsconfig.json 설정파일을 읽지 않고 기본값으로 컴파일됨.
   예를 들어 제너레이터 함수를 컴파일하면 es5이전의 문법을 사용하여 컴파일하는데
   컴파일 크기가 비대해지는 단점이 발생
   또 outDir 설정을 읽어내지 못해 dist 폴더로 출력하지 못하는 현상이 발생.

2. 같은이유에서인지 현재 구문해석기준("lib":"es2020")을 적용받지 못해
   제너레이터 함수를 ide가 문법적으로 이해하지 못해 next()에 빨간줄을 표시
   => 이 문제는 @type/node 모듈을 설치해서 해결할 수 있었다.

- tsc 명령어가 tsconfig.json을 읽고 수행하려면 어떤 조건이 필요한가?


가정 ) 

혹시 tsc명령어가 글로벌에 설치된 typescript 모듈의 영향을 받아 
글로벌 기준의 기본설정값을 따라가는걸까?? 그렇다면 프로젝트에 타입스크립트 초기화가 안된게 아닐까?

tsconfig.json을 재 생성하기 위해 tsc --init 을 실행해보자.

```json
복사한 설정값
{
  "compileOnSave": true,
  "compileOptions": {
    "lib": ["esnext"],
    "target": "es2015",
    "module": "esm", 
    "outDir": "dist", 
    "sourceMap": true,  
    "strict": true, 
    "types":[
      "node",
      "./"
    ] 
  },
  "include": ["src"] ,
  "exclude": ["node_modules"]
}
```

tsc --init 명령어를 통해 생성한 설정파일에서 제공하는 가이드를 따라 설정값을 입력했더니
출력이 잘 되는것을 확인 할 수 있었다. 
아마 기존 설정값에서 사용할 수 없는 설정값이 있던건 아닐까 추측된다.

변경된 tsconfig.json
```json
{
  "compileOnSave": true,
  "compilerOptions": {
    "outDir": "./dist",
    "target": "es2016",
    "lib": ["ESNext"],
    "module": "ES2015",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  }
}
```