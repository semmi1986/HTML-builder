const fs = require('fs');
const path = require('path');
const { readdir } = require('fs/promises');

let newPath = path.join(__dirname, 'secret-folder');

readdir(newPath, {
   withFileTypes: true
})
   .then((data) => data.forEach(file => {

      const filePath = path.join(newPath, file.name);

      if (file.isFile()) {
         fs.stat(filePath, (err, stats) => {
            if (stats) {
               // console.log(stats.size);

               const extFile = path.extname(filePath);
               const nameFile = path.basename(filePath, extFile);
               const sizeFileKB = (stats.size / 1024).toFixed(3);

               return console.log(`${nameFile} - ${extFile.replace('.', '')} - ${sizeFileKB}kb`);
            }
         });
      }
   }));