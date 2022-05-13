console.log('Hello ts')
// terminal : tsc
// src 폴더 내 ts 파일들 자동 컴파일
// dist 폴더로 컴파일 안됨
// path 문제가 있는듯 한데, 발표때 물어볼까


{// exercise
  let a = 1+2
  let b = a+3 + "안녕"
  let c = {
    apple:a,
    banana:b
  }
  let d = c.apple *4
  console.log(d)
}