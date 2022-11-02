const fs = require('fs');
const path = require('path');  

const fileName = path.resolve(__dirname, 'styles');
const fileNameCopy = path.resolve(__dirname, 'project-dist', 'bundle.css');
const writeData = fs.createWriteStream (fileNameCopy);

fs.readdir(fileName, {withFileTypes: true}, (err, files) => {
  // console.log(files);
  if (err) {
    return console.log(err.message);
  }else{
    files.forEach(file => {
      const filePath = path.join(fileName, file.name);
      const extFile = path.extname(filePath);
      
      const readData = fs.createReadStream(filePath, {encoding: 'utf-8'});

      if(extFile === '.css'){
        readData.pipe(writeData);
      }
    });
  }
});