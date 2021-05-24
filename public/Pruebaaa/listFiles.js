/*
// Colect Id's from elements
let reffolders = document.getElementById('myFolders') // Reference to add recent folders
let folName = document.getElementById('fname') // Reference to get folder input name value
let refbtn = document.getElementById('createFol') // Reference to create btn
let errortxt = document.getElementById('errortxt')
let FolderName = document.getElementById('FolderName')

// Create Folders
function createFolder(Link, Name) {
    reffolders.innerHTML += `
        <a href="${Link}">
            <div class="ffolder small cyan">
                <span class="foldr" id="idd">${Name}</span>
            </div>
        </a> `
}

refbtn.addEventListener('click', async (evt) => {
    evt.preventDefault()

    let y = document.getElementById('tileidH3').innerHTML

    let dir = `public/data/userfolders/${y}/`
    if (folName.value.length != 0) {
        createFolder('', folName.value)
        createServerFolder(dir, folName.value)
        errortxt.style.display = 'none'
    } else {
        errortxt.style.display = 'block'
    }
})


function Fol_Name(innerName) {
    h(innerName)
    Listfile(innerName)
}

function h(nom) {
    FolderName.innerHTML = `
    <h3 class="title" id='tileidH3'>${nom}</h3>
    `
}

async function createServerFolder(dir, name) {
    let serverData = undefined

    let obj = {
        type: 'createFileFol',
        dir: dir,
        names: name,
    }

    try {
        serverData = await queryServer('/query', obj)
    } catch (err) {
        console.error(err)
    }

    if (serverData.status == 'ok') {
        console.log('ok')
    } else {
        console.log(serverData)
    }
}


async function Listfile(dirnam) {
    let serverData = undefined

    let obj1 = {
        type: 'ListFiles',
        name: dirnam,
    }

    try {
        serverData = await queryServer('/query', obj1)
    } catch (err) {
        console.error(err)
    }

    if (serverData.status == 'ok') {
        console.log('ok')
    } else {
        console.log(serverData)
    }
}*/


/**
 * Queries the server with a 'POST' query
 * @param {url} server URL
 * @param {obj} data to send to the server
 */
async function queryServer(url, obj) {
    return new Promise((resolve, reject) => {
        let req = new XMLHttpRequest()
        req.onreadystatechange = (res) => {
            let responseObj = null
            if (req.readyState === 4) {
                try {
                    responseObj = JSON.parse(req.responseText)
                } catch (e) {
                    console.log(e, req.responseText)
                    return reject('Parsing response to JSON')
                }
                if (req.status >= 200 && req.status < 300) {
                    return resolve(responseObj)
                } else if (req.status >= 400) {
                    return reject('Unauthorized')
                } else {
                    return reject(responseObj)
                }
            }
        }
        req.open('POST', url, true)
        req.send(JSON.stringify(obj))
    })
}
