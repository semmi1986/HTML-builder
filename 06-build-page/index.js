const fs = require('fs');
const path = require('path');  
const {readdir} = require ('fs/promises')

const progectPath = path.resolve(__dirname, 'project-dist');
const assetsPath = path.resolve(__dirname, 'assets');
const copyAssetsPath = path.resolve(__dirname, 'project-dist', 'assets')

// create directory
// --- project-dist
fs.mkdir(progectPath, { recursive: true }, (err) => {
    if (err) {
      return console.error(err);
    }
    console.log('Directory project-dist created successfully!');
  });
// --- assets in project-dist
fs.mkdir(copyAssetsPath, { recursive: true }, (err) => {
    if (err) {
      return console.error(err);
    }
    console.log('Directory assets created successfully!');
  });

  copyAssets()



async function copyAssets() {
  let folderInAssets = await readdir(assetsPath, {withFileTypes: true});

  for (let i = 0; i < folderInAssets.length; i++) {
    // console.log(folderInAssets[i].name)
    
    fs.mkdir(path.resolve(__dirname, 'project-dist', 'assets', folderInAssets[i].name), { recursive: true }, (err) => {
        if (err) {
          return console.error(err);
        }
        console.log('Directories in assets created successfully!');
      });
  }

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
    console.log('Files successfully deleted!!!');
   
}

