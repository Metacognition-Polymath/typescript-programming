onmessage = (e) => { // 리스닝
	console.log(e.data) // 메인스레드에서 전달한 'some data'기록
  postMessage(`Ack:${e.data}`) // 워커스레드에서 메인스레드로 데이터를 전달
}

