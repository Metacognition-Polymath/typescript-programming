Q.

### 4.1 함수 선언과 호출 61page

```javascript
{
  function add(x:number, y:number):number {
    return x + y;
  }
  add(10,3)
  add.apply(null, [10,3]) 
  // apply는 함수 안에서 값을 this로 한정(bind)하며(여기에서는 this를 null로한정) 
  // 두 번째 인수를 펼쳐 함수에 매개변수로 전달한다.
  // 값을 this로 바인딩한다는게 무슨말인가...
  add.call(null, 10,3) 
  add.bind(null, 10,3)()


  
}
```
### (method) Function.apply(this: Function, thisArg: any, argArray?: any): any

Calls the function, <br>
substituting the specified object for the this value of the function, <br>
and the specified array for the arguments of the function.<br>
함수를 호출하여 <br>
함수의 this의 값에 대해 지정된 객체(null)로 대체하고, <br>
지정된 배열[10,3]로 함수의 인수(x,y)를 대체한다. 

#### @param thisArg 
— The object to be used as the this object.
this로 사용될 객체

#### @param argArray 
— A set of arguments to be
함수에서 요구하는 인수들의 배열집합




### (method) Function.bind(this: Function, thisArg: any, ...argArray: any[]): any

For a given function, creates a bound function that has the same body as the original function. <br>
The this object of the bound function is associated with the specified object, <br>
and has the specified initial parameters.<br>
원래의 함수로부터 내용이 같은 새로운 함수를 반환하는데, <br>
this값으로 지정된 객체(null)를 사용하고 지정된 매개변수들(10,3)로 초기화해 사용한다. <br>
새로운 함수를 작성하기 때문에 ()로 실행

#### @param thisArg 
— An object to which the this keyword can refer inside the new function.


### 결론 : 
자바스크립트의 this는 호출방법에 의해 결정되는데 <br>
호출방법과 상관없이 this를 지정된 객체에 바인딩하는 방법인듯하다.<br>
특히 call 메서드는 <br>
호출방법과 call, 같은 맥락으로 보인다.