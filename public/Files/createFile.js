// Colect Id's from elements
let refmyfiles = document.getElementById('myfiles') // Reference to add recent folders
let folName = document.getElementById('fname') // Reference to get folder input name value
let refbtn = document.getElementById('createFol') // Reference to create btn
let fileName = document.getElementById('fileName')
let errortxt = document.getElementById('errortxt')

// Create Folders
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
    let dir = `public/data/userfolders/${folname}`
    let refBody = document.getElementsByTagName('body')[0] // Reference to body
    let refcreateBlur = document.getElementById('createBlur') // Reference to create background blur affect
    let refcreateEvent = document.getElementById('createEvent') // Reference to show add template

    if (folName.value.length != 0) {
        await createServerFolder(dir, folName.value)
        createFile(dir, folName.value)
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

async function createServerFolder(dir, name) {
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

function inits() {
    let refmyfiles = document.getElementById('myfiles')
    let refPlantilla = document.getElementById('plantilla')
    let html = ''

    for (cnt = 0; cnt < files.length; cnt = cnt + 1) {
        html = html + refPlantilla.innerHTML
            .replace(/{{Name}}/g, files[cnt])
    }
    refmyfiles.innerHTML = html

    let usrTemp = document.getElementById('usrDetail')
    let usrSection = document.getElementById('usrSection')
    let temH = ''

    for (cnt = 0; cnt < usrFile.length; cnt = cnt + 1) {
        if (localStorage.getItem('usrIdToken') == usrFile[cnt].id) {
            temH = temH + usrTemp.innerHTML
                .replace(/{{UserName}}/g, usrFile[cnt].nom)
                .replace(/{{LastName}}/g, usrFile[cnt].cognom)
                .replace(/{{UserImg}}/g, usrFile[cnt].image)

        }
    }
    usrSection.innerHTML = temH
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