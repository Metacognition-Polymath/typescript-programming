{
  const a = Object.freeze({ b: 1 })

  console.log(a.b)
  a.b = 10
  console.log(a.b)
}

{
  const a:Readonly<{b:number}> ={
    b:1
  }
  console.log(a.b)
  a.b=2
  console.log(a.b)
}

{
  const a:Readonly<{b:number}> = Object.freeze({ b: 1 })

  console.log(a.b)
  a.b = 10
  console.log(a.b)
}
