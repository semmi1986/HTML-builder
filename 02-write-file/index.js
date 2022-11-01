const fs = require('fs');
const path = require('path');
const process = require('process');

const newPath = path.resolve(__dirname, 'text.txt');
const addFile = fs.createWriteStream(newPath, {encoding: 'utf-8'})
process.stdout.write('\nHi! Enter the text ... \n')

const message = () => {
	process.stdout.write('\nBye! Good bye! \n')
	process.exit();
}

process.stdin.on('data', (data) => {
	if(data.toString().toLowerCase().trim() === 'exit'){
		message()
	}
	addFile.write(data)
})

process.on('SIGINT', () =>{
	message()
})



