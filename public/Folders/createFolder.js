// Colect Id's from elements
let reffolders = document.getElementById('myFolders') // Reference to add recent folders
let refmyfiles = document.getElementById('myFiles') // Reference to add recent folders
let folName = document.getElementById('fname') // Reference to get folder input name value
let folfpath = document.getElementById('fpath') // Reference to get folder input name value
let refbtn = document.getElementById('createFol') // Reference to create btn
let refbtn1 = document.getElementById('createFile') // Reference to create btn
let errortxt = document.getElementById('errortxt')
let currentName = document.getElementById('tileidH3')


// Create Folders
function createFolder(Link, Name) {
    reffolders.innerHTML += `
        <a href="${Link}">
            <div class="ffolder small cyan">
                <span class="foldr" id="idd">${Name}</span>
            </div>
        </a> `
}

function createFile(Link, Name) {
    refmyfiles.innerHTML += `
        <a href="${Link}">
            <div id="files">
                <img src="./fileImg.png" width="50%">
                <span class="span">${Name}</span>
            </div>   
        </a> `
}

refbtn.addEventListener('click', async (evt) => {
    evt.preventDefault()
    let folname = folName.value
    let dir = ''
    let currentName = document.getElementById('tileidH3')
    let refBody = document.getElementsByTagName('body')[0] // Reference to body
    let refcreateBlur = document.getElementById('createBlur') // Reference to create background blur affect
    let refcreateEvent = document.getElementById('createEvent') // Reference to show add template
    if (currentName.innerHTML != 'YOUR FOLDERS') {
        dir = `public/data/userfolders/${currentName.innerHTML}/${folname}`;
    } else {
        dir = `public/data/userfolders/${folname}`;
    }

    if (folName.value.length != 0) {
        await createServerFolder(dir, folName.value)
        createFolder(dir, folName.value)
        errortxt.style.display = 'none'

        refBody.style.overflow = 'auto'
        refcreateBlur.style.display = 'block'
        await wait(1)

        // Active animation
        refcreateBlur.style.transition = 'opacity ' + menuTransition
        refcreateEvent.style.transition = 'transform ' + menuTransition

        // Show Animation
        refcreateBlur.style.opacity = 0
        refcreateEvent.style.transform = 'translateY(-110%)'

        // Wait here form animation
        await wait(500)

        // And in last refresh page
        location.reload()
    } else {
        errortxt.style.display = 'block'
    }
})

refbtn1.addEventListener('click', async (evt) => {
    evt.preventDefault()
    let fileName = document.getElementById('fileNameInput')
    let dir = ''
    let currentName = document.getElementById('tileidH3')
    let refBody1 = document.getElementsByTagName('body')[0] // Reference to body
    let refcreateBlur1 = document.getElementById('createBlur1') // Reference to create background blur affect
    let refcreateEvent1 = document.getElementById('createEvent1') // Reference to show add template



    if (currentName.innerHTML != 'YOUR FOLDERS') {
        dir = `public/data/userfolders/${currentName.innerHTML}/${fileName.value}`;
    } else {
        dir = `public/data/userfolders/${fileName.value}`;
    }

    if (fileName.value.length != 0) {
        await createServerFile(dir, folName.value)
        createFile(dir, folName.value)
        errortxt.style.display = 'none'

        refBody1.style.overflow = 'auto'
        refcreateBlur1.style.display = 'block'

        // Wait here form animation
        await wait(1)

        // Active animation
        refcreateBlur1.style.transition = 'opacity ' + menuTransition
        refcreateEvent1.style.transition = 'transform ' + menuTransition

        // Show Animation
        refcreateBlur1.style.opacity = 0
        refcreateEvent1.style.transform = 'translateY(-110%)'

        // Wait here form animation
        await wait(500)

        // And in last refresh page
        location.reload()
    } else {
        errortxt.style.display = 'block'
    }

})


function Fol_Name(innerName) {
    let currentName = document.getElementById('tileidH3')

    if (currentName.innerHTML != 'YOUR FOLDERS') {
        h(`${currentName.innerHTML}/${innerName}`)
        location.reload()
    } else {
        h(`${innerName}`)
    }

    if (currentName.innerHTML != 'YOUR FOLDERS') {
        Listfile(`${currentName.innerHTML}/${innerName}`)
        location.reload()
    } else {
        Listfile(innerName)
    }
}

function h(nom) {
    let events = sessionStorage.getItem('eventos')
    let title = []
    if (events) {
        title = JSON.parse(events)
    }

    FolderName.innerHTML = `
    <h3 class="title" id='tileidH3'>${nom}</h3>
    <div class="backBtn" onclick='backBtn()'>Back <ion-icon name="return-up-back-outline" class='backIcon'></ion-icon>
    </div>
    `
    title.push(nom)
    sessionStorage.setItem('eventos', JSON.stringify(title))
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
}

async function createServerFolder(dir, name) {
    let serverData = undefined

    let obj = {
        type: 'createFolder',
        dir: dir,
        name: name,
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

async function createServerFile(dir, name) {
    let serverData = undefined

    let obj = {
        type: 'createFile',
        dir: dir,
        name: name,
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


function backBtn() {

    let currentName = document.getElementById('tileidH3')

    if (currentName.innerHTML.lastIndexOf('/') == -1) {
        history.back()
    } else {
        let a = currentName.innerText.substring(0, currentName.innerText.lastIndexOf("/"))

        currentName.innerHTML = a

        let arr = sessionStorage.getItem('eventos')

        let o = JSON.parse(arr)

        let y = o.splice(0, o.length - 1)
        console.log(y, a)
        location.reload()
    }

}

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

/**
 * Wait a while
 * @param {utimerl} time to wait in milliseconds (1000 = 1s)
 */
async function wait(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => { resolve() }, time)
    })
}