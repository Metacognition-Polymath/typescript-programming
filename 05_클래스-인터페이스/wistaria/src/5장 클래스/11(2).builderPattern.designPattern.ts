// 빌더패턴(Builder Pattern)
// 객체의 생성과, 구현 방식의 분리

{
  // 사용 예
  new RequestBuilder()
    .setURL('/users')
    .setMethod('get')
    .setData({ id: 1 })
    .send()
}

{
  // 이를 구현하려면 각 메서드마다 객체 자체를 리턴하게 하면 된다.
  class RequestBuilder {
    private url: string | null = null
    private method: 'get' | 'post' | 'put' | 'delete' | null = null
    private data: object | null = null

    setURL(url: string): RequestBuilder {
      this.url = url
      return this
    }
    setMethod(method: 'get'|'post'|'put'|'delete'): RequestBuilder {
      const methods = ['get', 'post', 'put', 'delete']
      if (methods.includes(method.toLowerCase())) {
        this.method = method
      } else {
        throw new Error('지원하지 않는 메서드입니다.')
      }
      return this
    }
    setData(data: object): RequestBuilder {
      this.data = data
      return this
    }
    sendConsoleLog(): void {
      console.log(this.url, this.method, this.data)
    }
  }

  new RequestBuilder()
    .setURL('/users')
    .setMethod('get')
    .setData({ id: 1 })
    .sendConsoleLog() //   /users get { id: 1 }
} 
