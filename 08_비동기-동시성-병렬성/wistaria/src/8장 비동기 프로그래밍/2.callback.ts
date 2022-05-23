import * as fs from 'fs'

console.log('0')
let csv = fs.readFileSync('2.data.csv', { encoding: 'utf8' })

console.log('1')
fs.appendFile('2.data.csv', '\nnew access', (error) => {
	console.log('3')
	if (error) console.error(error)
})

console.log(csv)
console.log('')
