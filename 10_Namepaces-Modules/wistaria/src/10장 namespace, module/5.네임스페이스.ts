// ! 타입스크립트는 코드를 캡슐화하는 수단인 namespace 키워드를 제공한다.

namespace Network {
  export function get<T>(url:string):Promise<T> {
    // ...
  }
}

namespace App {
  Network.get<GitRepo>('https://api.github.com/repos/...')
}