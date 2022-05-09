### type
`값과 이 값으로 할 수 있는 일의 집합`

```json
"unknown" : 
  "any" :[
    [
      "null",
      "void",
      "undefine",
    ],
    [
      number - number enum,
      bigint,
      boolean,
      string - string enum,
      symbol - unique symbolm,
      object - [
        array - tupple,
        function,
        constructor,
      ]
    ] -> never
  ]
```
