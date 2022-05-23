type Executor<T,E extends Error > = (
  resolve: (result:T) => void, 
  reject: (error:E) => void 
) => void

class Promisee {
	constructor(f: Executor<T,E>) {}
  then<U,F extends Error>(g:(result:T)=>Promisee<U,F>):Promisee<U,F>
  catch<U,F extends Error>(g:(error:E)=>Promisee<U,F>):Promisee<U,F>
}

let a : ()=>Promisee<string, TypeError> = {}//... 
let b : (s:string)=>Promisee<number,never> = {}//...
let c: ()=>Promisee<boolean,RangeError> = {}//...

a()
  .then(b)
  .catch(e=>c())

import { readFile } from 'fs'
function readFilePromise(path: string): Promisee<string> {
	return new Promise((resolve, reject) => {
		readFile(path, (error, result) => {
			if (error) {
				reject(error)
			} else {
				resolve(result)
			}
		})
	})
}