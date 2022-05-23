// 1. Implement a general-purpose promisify function, which takes any function that takes exactly one argument and a callback, and wraps it in a function that returns a promise.
function promisify<T, A>(
  f: (arg: A, f: (error: unknown, result: T | null) => void) => void
): (arg: A) => Promise<T> {
  return (arg: A) =>
    new Promise<T>((resolve, reject) =>
      f(arg, (error, result) => {
        if (error) {
          return reject(error);
        }
        if (result === null) {
          return reject(null);
        }
        resolve(result);
      })
    );
}

import { readFile } from "fs";

let readFilePromise = promisify(readFile);
readFilePromise(__dirname + "/exercises.js").then((result) =>
  console.log("done!", result.toString())
);
