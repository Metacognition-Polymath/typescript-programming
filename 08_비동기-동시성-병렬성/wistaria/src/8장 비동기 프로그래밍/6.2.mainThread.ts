import { fork ,spawn } from 'child_process'

// let child = fork('./6.2.childThread.ts')

// child.on('message', (data) => {
// 	console.info('child process sent a message', data)
// })

// child.send({ type: 'syn', data: [3] })

const ls = spawn('ls', ['-lh', '/usr'])

ls.stdout.on('data', (data) => {
	console.log(`stdout: ${data}`)
})

ls.stderr.on('data', (data) => {
	console.error(`stderr: ${data}`)
})

ls.on('close', (code) => {
	console.log(`child process exited with code ${code}`)
})