let express = require('express')
var fs = require('fs')
const upload = require('express-fileupload')
const { Server } = require('http')

let port = 8000
let app = express()

async function main() {
  app.post('/query', async (request, response) => { await answerQuery(request, response) })
  app.use(express.static('./public'))

  app.listen(port, () => {
    console.log(`Navigate to: http://localhost:${port}`)
  })
}

main()

let fileNames = undefined
let downFile = undefined

async function answerQuery(request, response) {
  let data = await getPostData(request)
  let rst = {}

  if (data.type == 'createFolder') {
    rst = { status: 'ok' }
    await createFolder(data.dir)
    let f = data.dir.substring(0, data.dir.lastIndexOf("/"))
    listFil(`${f}`)
    showFiles('public/data/userfolders')
    console.log(data.dir)
  }

  else if (data.type == 'createTask') {
    rst = { status: 'ok' }
    await tasks(data)
  }

  else if (data.type == 'createFile') {
    rst = { status: 'ok' }
    await createFiles(data.dir)
    let f = data.dir.substring(0, data.dir.lastIndexOf("/"))
    listFil(`${f}`)
    showFiles('public/data/userfolders')
  }

  else if (data.type == 'fileList') {
    rst = { status: 'ok' }
    fileNames = data.names
    downloadFiles(fileNames)
  }

  else if (data.type == 'delDirs') {
    rst = { status: 'ok' }
    fileNames = data.names
    deleteDir('public/data/userfolders/' + fileNames)
    let f = fileNames.substring(0, fileNames.lastIndexOf("/"))
    listFil(`public/data/userfolders/${f}`)
    showFiles('public/data/userfolders')
  }

  else if (data.type == 'ListFiles') {
    rst = { status: 'ok' }
    fileNames = data.name
    listFil(`public/data/userfolders/${fileNames}`)
  }

  else {
    rst = { status: 'Ko' }
  }

  response.json(rst)

}

// Download Files and Folders
function downloadFiles(FiledirName) {
  console.log(FiledirName)
  downFile = FiledirName
}

app.get('/download', function (req, res) {
  res.download(__dirname + `/public/data/userfolders/${downFile}`)

  console.log(downFile, 'aa')
})

// Function to create folders
async function createFolder(nom) {
  try {
    await fs.promises.mkdir(nom)
  } catch (e) {
    if (e.code != 'EEXIST') {
      console.log(e)
    }
  }
}

// Function to create Files
async function createFiles(name) {
  try {
    await fs.promises.writeFile(name, 'hola')
  } catch (e) {
    if (e.code != 'EEXIST') {
      console.log(e)
    }
  }
}

// Save user tasks info
async function tasks(text) {
  let fileData = await fs.promises.readFile('public/data/userTasks/usertasks.json')
  let fileObject = JSON.parse(fileData)
  fileObject.push(text)

  console.log(fileObject)

  let data = 'let b = ' + JSON.stringify(fileObject, '\t', 2);
  await fs.promises.writeFile('public/data/userTasks/usertasks.js', '\n' + data);

  let data1 = JSON.stringify(fileObject, '\t', 2);
  await fs.promises.writeFile('public/data/userTasks/usertasks.json', '\n' + data1);
}

// show directory infomation
async function showFiles(path) {
  const dir = await fs.promises.opendir(path);

  let content = {
    files: [],
    directories: [],
  };

  for await (const dirent of dir) {
    if (dirent.isDirectory()) {
      content.directories.push(dirent.name);
    } else {
      content.files.push(dirent.name);
    }
  }

  let i = 'let dir =' + JSON.stringify(content.directories, '\t', 2);
  fs.writeFileSync('public/data/UserData/listDir.js', '\n' + i);

  let e = 'let files =' + JSON.stringify(content.files, '\t', 2);
  fs.writeFileSync('public/data/UserData/listFiles.js', '\n' + e);

}
showFiles('public/data/userfolders')

// Upload Folders
app.use(upload())

app.post('/folders/folders.html', function (req, res) {
  console.log(req.files); // the uploaded file object
  let sampleFile; // Input Name
  sampleFile = req.files.sampleFile;
  let uploadPath = __dirname + '/public/data/userfolders/' + sampleFile.name;
  sampleFile.mv(uploadPath)
  wait(1000)
  res.sendFile(__dirname + '/public/Folders/folders.html')
});

// Upload Files
app.post('/Files/files.html', function (req, res) {
  console.log(req.files); // the uploaded file object
  let sampleFile; // Input Name
  sampleFile = req.files.sampleFile;
  let uploadPath = __dirname + '/public/data/userfolders/' + sampleFile.name;
  sampleFile.mv(uploadPath)
  wait(1000)
  res.sendFile(__dirname + '/public/Files/files.html')
});

// Delete files
function deleteDir(dirName) {
  try {
    fs.rmSync(`${dirName}`, { recursive: true });
    console.log(`${dirName} is deleted!`);
  } catch (err) {
    console.error(`Error while deleting ${dirName}.`);
  }
}

// show directory infomation
async function listFil(path) {
  const dir = await fs.opendirSync(path);

  let content = {
    files: [],
    directories: [],
  };

  for await (const dirent of dir) {
    if (dirent.isDirectory()) {
      content.directories.push(dirent.name);
    } else {
      content.files.push(dirent.name);
    }
  }

  let i = 'let userDir =' + JSON.stringify(content.directories, '\t', 2);
  fs.promises.writeFile('public/data/UserData/userDir.js', '\n' + i);

  let e = 'let userFile =' + JSON.stringify(content.files, '\t', 2);
  fs.promises.writeFile('public/data/UserData/userFile.js', '\n' + e);

}

async function getPostData(request) {
  return new Promise(async (resolve, reject) => {
    let body = '',
      error = null

    request.on('data', (data) => { body = body + data.toString() })
    request.on('close', () => { /* TODO - Client closed connection, destroy everything! */ })
    request.on('error', (err) => { error = 'Error getting data' })
    request.on('end', async () => {
      if (error !== null) {
        console.log('Error getting data from post: ', error)
        return reject(error)
      } else {
        try {
          return resolve(JSON.parse(body))
        } catch (e) {
          console.log('Error parsing data from post: ', error)
          return reject(e)
        }
      }
    })
  })
}

/**
 * Wait a while
 * @param {utimerl} time to wait in milliseconds (1000 = 1s)
 */
async function wait(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => { resolve() }, time)
  })
}