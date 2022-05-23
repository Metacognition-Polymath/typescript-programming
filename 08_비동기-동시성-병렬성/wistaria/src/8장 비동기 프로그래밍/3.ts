// function appendAndReadPromise(path:string, data:string):Promise<string> {
//   return appendAndReadPromise(path, data)
//     .then(() => readPromise(path))
//     .catch(err => console.log(err))
// }

type Executor = (
  resolve : Function,
  reject : Function
) => void
class Promisee {
  constructor(f:Executor) { }
}
// {
//   import {readFile} from 'fs'
//   readFile(path, (error, result)=>{
//     // ...
//   })
// }
import { readFile } from 'fs'
function readFilePromise(path:string):Promise<string> {
  return new Promise((resolve, reject) => {
    readFile(path, (error, result) => {
      if (error) {reject(error)}
      else {resolve(result)}
    })
  })
}