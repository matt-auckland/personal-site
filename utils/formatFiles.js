const { exec } = require('child_process');
const crypto = require('crypto');
const fs = require('fs');
const fsUtils = require('nodejs-fs-utils');
const { resolve } = require('path');
const htmlValidator = require('html-validator')

// Based on https://gist.github.com/GuillermoPena/9233069#gistcomment-3149231
function getFileHash(filename) {
  let file = fs.readFileSync(filename);
  return crypto.createHash('md5').update(file).digest('hex');
}

function getFileList() {
  let formatableFile = /.*\.(html|css|js)/;
  let files = [];
  fsUtils.walkSync('./_site', function (err, path, stats, next, cache) {
    if (formatableFile.test(path)) {
      files.push(path);
    }
    next();
  });
  return files;
}

async function mapFilePathsToHashes(files) {
  let promises = [];
  let fileMap = {};

  files.forEach(async function (filePath, i) {
    promises.push(
      new Promise(async (resolve, reject) => {
        let hash = getFileHash(filePath);
        fileMap[filePath] = hash;
        resolve();
      })
    );
  });
  await Promise.all(promises);

  return fileMap;
}

async function prettifyFiles(fileMap) {
  let filesToPrettify = [];

  if (!fs.existsSync('./fileHashes.json')) {
    filesToPrettify = Object.keys(fileMap);
  } else {
    const previousFileMap = JSON.parse(fs.readFileSync('./fileHashes.json'));

    Object.keys(fileMap).forEach((key) => {
      if (!previousFileMap[key] || previousFileMap[key] !== fileMap[key]) {
        filesToPrettify.push(key);
      }
    });
  }

  if (filesToPrettify.length) {
    let prettierCommand = 'npx prettier --write ' + filesToPrettify.join(' ');
    exec(prettierCommand, function (err, stdout, stderr) {
      if (err || stdout || stderr)
        console.log('eleventy-plugin-prettier logs:');
      err && console.log(err);
      stdout && console.log(stdout);
      stderr && console.log(stderr);
    });
  }
}



async function formatFiles({ runMode }) {
  let files = getFileList().sort();
  let fileMap = await mapFilePathsToHashes(files);

  await validateHTMLFiles(files);
  if (runMode === 'build') {
    await prettifyFiles(fileMap);
  }

  fs.writeFileSync('./fileHashes.json', JSON.stringify(fileMap));
}

module.exports = formatFiles;
