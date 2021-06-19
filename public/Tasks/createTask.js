
var menuTransition = '0.5s ease'
// Colect Id's from elements
let refBody = document.getElementsByTagName('body')[0] // Reference to body
let refcreateBlur = document.getElementById('createBlur') // Reference to create background blur affect
let refcreateEvent = document.getElementById('createEvent') // Reference to show add template
let reftaks = document.getElementById('taks') // Reference to add Tasks
let folName = document.getElementById('fname') // Reference to get folder input name value
let desName = document.getElementById('fDescription') // Reference to get folder input name value
let refbtn = document.getElementById('sendNow') // Reference to create btn

function inits() {
    let refPlantilla = document.getElementById('plantilla')
    let refTask = document.getElementById('taks')
    let html = ''

    if (b.length != 0) {
        for (cnt = 0; cnt < b.length; cnt = cnt + 1) {
            html = html + refPlantilla.innerHTML
                .replace(/{{Name}}/g, b[cnt].name)
                .replace(/{{des}}/g, b[cnt].des)
                .replace(/{{id}}/g, b[cnt].id)
        }
        refTask.innerHTML = html
    } else {
        refTask.innerHTML = ` <a href="./Tasks/tasks.html">
        <p class="noTasks">Ups, you don't have any tasks created...</p>
    </a>`
    }

}

//Show Add event template
async function showMenu() {
    // Stop body to do scroll and add blur affect to background 
    refBody.style.overflow = 'hidden'
    refcreateBlur.style.display = 'flex'

    // Wait here form animation
    await wait(1)

    // Active animation
    refcreateBlur.style.transition = 'opacity ' + menuTransition
    refcreateEvent.style.transition = 'transform ' + menuTransition

    // Show Animation
    refcreateBlur.style.opacity = 1
    refcreateEvent.style.transform = 'translateX(0)'

    // Wait here form animation
    await wait(1)
}

async function hideMenu(evt) {
    if (evt.target.getAttribute('id') != 'createBlur') return

    // Stop body to do scroll and add blur affect to background 
    refBody.style.overflow = 'auto'
    refcreateBlur.style.display = 'block'

    // Wait here form animation
    await wait(1)

    // Active animation
    refcreateBlur.style.transition = 'opacity ' + menuTransition
    refcreateEvent.style.transition = 'transform ' + menuTransition

    // Show Animation
    refcreateBlur.style.opacity = 0
    refcreateEvent.style.transform = 'translateY(-250%)'

    // Wait here form animation
    await wait(500)

    // And in last refresh page
    location.reload()
}


// Create Tasks
function createTask(Name, des) {
    reftaks.innerHTML += `
    <div class="element" id="element">
        <div class="eleinfo">
            <h2 class="eleh2">${Name}</h2>
            <p class="elep">${des}</p>
        </div>
        <div>
            <ion-icon name="close-outline" class="cancel-task" onclick="delteEvents()"></ion-icon>
        </div>
    </div> `
}

refbtn.addEventListener('click', async (evt) => {
    evt.preventDefault()

    if (folName.value.length != 0 && desName.value.length != 0) {
        await createServerTask(folName.value, desName.value)
        createTask(folName.value, desName.value)
        errortxt.style.display = 'none'
    } else {
        errortxt.style.display = 'block'
    }
    location.reload()

})

async function createServerTask(name, des, id) {
    let serverData = undefined

    let obj = {
        type: 'createTask',
        name: name,
        des: des,
        id: new Date(),
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


// Delte events
function delteEvents(elementDiv, elementId) {
    let y = elementDiv.parentElement
    y.parentElement.removeChild(y)

    console.log(elementId)
}