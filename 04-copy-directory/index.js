const fs = require('fs');
const path = require('path');

const fileName = path.resolve(__dirname, 'files');
const fileNameCopy = path.resolve(__dirname, 'files-copy');

function copyFiles(fileName, fileNameCopy) {
	
	fs.readdir(fileName, { withFileTypes: true }, (err, files) =>{
		if (err) {
			return console.log(err.message);
		}else{
			
			files.forEach(file => {
				const srcFile = path.resolve(fileName, file.name);
				const destFile = path.resolve(fileNameCopy, file.name);
				// console.log(path.basename(srcFile));
				// console.log(path.basename(destFile));
				fs.copyFile(srcFile, destFile, (err) => {
					if (err) {
						return console.log(err.message);
					}
					
				})
			})
			console.log('\nFiles added from folder file to folder file-copy\n');
		}
	})

}


function creatFolder(fileNameCopy) {
	fs.access(fileNameCopy, fs.constants.F_OK, (err) => {
		if (err) {

			console.error('\nDirectory does not exist');
			fs.mkdir(fileNameCopy, { recursive: true }, (err) => {
				if (err) {
					return console.log(err.message);
				}else{
					console.log('Directory created successfully!\n');
				}
			})

			copyFiles(fileName, fileNameCopy);
			console.log('\nCreating the directory');

		}else {

			fs.readdir(fileNameCopy, (err, files) => {
				if (err) {
					return console.log(err.message);
				}

				files.forEach(file => {
					const unlinkFile = path.resolve(fileNameCopy, file);
					fs.unlink(unlinkFile, (err) => {
						if (err) {
							return console.log(err.message);
						}
					})
				})
			})
			copyFiles(fileName, fileNameCopy);
			console.log('\nDirectory does exist');
		}
	})
}

creatFolder(fileNameCopy)