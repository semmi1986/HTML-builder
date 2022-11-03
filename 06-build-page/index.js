const fs = require('fs');
const path = require('path');  
const {readdir, readFile} = require ('fs/promises')

const progectPath = path.resolve(__dirname, 'project-dist');
const assetsPath = path.resolve(__dirname, 'assets');
const copyAssetsPath = path.resolve(__dirname, 'project-dist', 'assets');
const dirStyles = path.resolve(__dirname, 'styles');
const fileCopyCSS = path.resolve(__dirname, 'project-dist', 'style.css');
const fileTemp = path.resolve(__dirname, 'template.html');
const dirComponent = path.resolve(__dirname, 'components');
const fileCopyHTML = path.resolve(__dirname, 'project-dist', 'index.html');


// --- create directory project-dist <---
fs.mkdir(progectPath, { recursive: true }, (err) => {
    if (err) {
      return console.error(err);
    }
    console.log('\nDirectory project-dist created successfully!');
  });

// ---> create directory assets in project-dist <---
fs.mkdir(copyAssetsPath, { recursive: true }, (err) => {
    if (err) {
      return console.error(err);
    }
    console.log('\nDirectory assets in directory project-dist created successfully!\n');
  });


// ---> Creating CSS file in directory project-dist <---

async function copyCssFile() {

  let writeData = fs.createWriteStream(fileCopyCSS);

  fs.readdir(dirStyles, {withFileTypes: true}, (err, files) => {
    // console.log(files);
    if (err) {
      return console.log(err.message);
    }else{
      files.forEach(file => {
        const filePath = path.join(dirStyles, file.name);
        const extFile = path.extname(filePath);
        
        let readData = fs.createReadStream(filePath, {encoding: 'utf-8'});
  
        if(extFile === '.css'){
          readData.pipe(writeData);
        }
      });
    }
  });

  console.log(`\nCSS file successfully created`);

}

// ---> Creating HTML file in directory project-dist <---

async function copyHTMLFile() {
  let file = await readFile(fileTemp, {encoding: 'utf8'});
  let string = file.toString();
  let dir = await readdir(dirComponent, {withFileTypes: true});
 

  for (let i = 0; i < dir.length; i++) {
    const filePath = path.resolve(dirComponent, dir[i].name)
    const expDir = path.extname(dir[i].name);
    if(dir[i].isFile() && expDir === '.html'){
      let readData = fs.createReadStream(filePath, {encoding: 'utf-8'});

      readData.on('data', (data) => {
          // console.log(data);
          string = string.replace(`{{${dir[i].name.replace('.html', '')}}}`, data);
          // console.log(string);
      });

      readData.on('end', () =>{
        fs.createWriteStream(fileCopyHTML).write(string)
      })

    }
  }
  console.log('HTML file successfully created');
}

// ---> Copy directory assets in directory project-dist <---

async function copyAssets() {
  let folderInAssets = await readdir(assetsPath, {withFileTypes: true});

  for (let i = 0; i < folderInAssets.length; i++) {
    // console.log(folderInAssets[i].name)
    
    fs.mkdir(path.resolve(__dirname, 'project-dist', 'assets', folderInAssets[i].name), { recursive: true }, (err) => {
        if (err) {
          return console.error(err);
        }
         return console.log(`\nDirectories in assets ${folderInAssets[i].name} created successfully`);
      });
  

  let cleanFolders = await readdir(
    path.join(__dirname, 'project-dist', 'assets', folderInAssets[i].name),
      {
        withFileTypes: true,
      },
    );

    for (let j = 0; j < cleanFolders.length; j++) {
      fs.unlink(
        path.join(__dirname, 'project-dist', 'assets', folderInAssets[i].name, cleanFolders[j].name),
        (error) => {
          if (error) {
            throw error;
          }
        },
      );
    }

    let filesCopy = await readdir(path.join(__dirname, 'assets', folderInAssets[i].name), {
      withFileTypes: true,
    });

    for (let k = 0; k < filesCopy.length; k++) {
      fs.copyFile(
        path.join(__dirname, 'assets', folderInAssets[i].name, filesCopy[k].name),
        path.join(__dirname, 'project-dist', 'assets', folderInAssets[i].name, filesCopy[k].name),
        (error) => {
          if (error) {
            throw error;
          }
        },
      );
    }

    console.log(`Files from ${folderInAssets[i].name} successfully copied\n`);
  }
}

copyAssets()
copyCssFile()
copyHTMLFile()
