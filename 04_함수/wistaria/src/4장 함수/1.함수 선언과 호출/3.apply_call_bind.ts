{
  function add(x:number, y:number):number {
    return x + y;
  }
  add(10,3)
  add.apply(null, [10,3]) 
  add.call(null, 10,3) 
  add.bind(null, 10,3)()
}


