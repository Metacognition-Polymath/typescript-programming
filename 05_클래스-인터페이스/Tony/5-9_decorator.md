# 데코레이터

### 정해진 형식

- 데코레이터는 작성해야되는 정해진 형식이 있다
  - 데코레이터 다음에 오는 각각의 대상에 따른 시그니처(형식, 특징)

```ts
// 클래스
type ClassDecoratorParam = (Constructor: {new(...any[]) => any}) => any;
type MethodDecoratorParam = (ClassPrototype: {}, methodName: string, descriptor: PropertyDescriptor) => any;
type StaticMethodDecoratorParam = (Constructor:)
```

### 데코레이터 합성(Decorator Composition)

```ts
@f // 데코레이터 1
@g // 데코레이터 2
x // 대상
```

- f(g(x))

### 참고

- https://youtu.be/favycnvMY1Q
- https://typescript-kr.github.io/pages/decorators.html
