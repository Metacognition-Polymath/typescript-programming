process.on('message', (data) => {
	console.info('Parent process sent a message', data)
	console.log(data)
})
