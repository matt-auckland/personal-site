const { exec } = require('child_process');
const crypto = require('crypto');
const fs = require('fs');
const fsUtils = require('nodejs-fs-utils');
const { resolve } = require('path');

function fileHash(filename, algorithm = 'md5') {
  return new Promise((resolve, reject) => {
    // Algorithm depends on availability of OpenSSL on platform
    // Another algorithms: 'sha1', 'md5', 'sha256', 'sha512' ...
    let shasum = crypto.createHash(algorithm);
    try {
      let s = fs.ReadStream(filename);
      s.on('data', function (data) {
        shasum.update(data);
      });
      // making digest
      s.on('end', function () {
        const hash = shasum.digest('hex');
        return resolve(hash);
      });
    } catch (error) {
      return reject('calc fail');
    }
  });
}

function getFileList() {
  let formatableFile = /.*\.(html|css|js)/;
  let files = [];
  fsUtils.walkSync(
    './_site',
    function (err, path, stats, next, cache) {
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
        let hash = await fileHash(filePath);
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
    let prettierCommand = "npx prettier --write " + filesToPrettify.join(" ");
    exec(prettierCommand, function(err, stdout, stderr) {
      if (err || stdout || stderr) console.log("eleventy-plugin-prettier logs:")
      err && console.log(err);
      stdout && console.log(stdout);
      stderr && console.log(stderr);
    });
  }
}

async function formatFiles() {
  let files = getFileList();
  let fileMap = await mapFilePathsToHashes(files);

  await prettifyFiles(fileMap);

  fs.writeFileSync('./fileHashes.json', JSON.stringify(fileMap));
}

module.exports = formatFiles;
