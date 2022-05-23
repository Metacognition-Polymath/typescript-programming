type Message = string
type ThreadID = number
type UserID= number
type Participants = UserID[]

// type Command = {
//   sendMessageToThread:[ThreadID, Message]
//   createThread: [Participants]
//   addUserToThread: [ThreadID, UserID]
//   removeUserFromThread: [ThreadID, UserID]
// }

type Command = 
  | {type:'sendMessageToThread', data:[ThreadID, Message]}
  | {type:'createThread', data:[Participants]}
  | {type:'addUserToThread', data:[ThreadID, UserID]}
  | {type:'removeUserFromThread', data:[ThreadID, UserID]}

onmessage = e=> processCommandFromMainThread(e.data)
function processCommandFromMainThread(command: Command) {
  switch (command.type) {
    case 'sendMessageToThread':
      let [threadID, message] = command.data
      console.log(message)
      postMessage(`Ack:${message}`)
      break
    case 'createThread':
      let [participants] = command.data
      postMessage(`Ack:${participants}`)
      break      
  }
}

type Events = {
  receivedMessage: [ThreadID, UserID, Message]
  createdThread: [ThreadID, Participants]
  addedUserToThread: [ThreadID, UserID]
  removedUserFromThread: [ThreadID, UserID]
}

let worker = new Worker('6.workerScript.js') // 노드 작동 x

worker.onmessage = e => {
  console.log(e.data)
}

worker.postMessage('some data')
