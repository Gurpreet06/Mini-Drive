var menuTransition = '0.5s ease'
// Colect Id's from elements
let refBody = document.getElementsByTagName('body')[0] // Reference to body
let refcreateBlur = document.getElementById('createBlur') // Reference to create background blur affect
let refcreateEvent = document.getElementById('createEvent') // Reference to show add template


function init() {
    let refPlantilla = document.getElementById('plantilla')
    let reffolders = document.getElementById('folders')
    let html = ''

    if (dir.length != 0) {
        const n = 5 //get the first 3 items
        const newArray = dir.slice(0, n)
        for (cnt = 0; cnt < newArray.length; cnt = cnt + 1) {
            html = html + refPlantilla.innerHTML
                .replace(/{{Name}}/g, dir[cnt])
                .replace(/{{Link}}/g, 'http://localhost:8000/Folders/folders.html')
        }
        reffolders.innerHTML = html
    } else {
        let viewFodlers = document.getElementById('viewFodlers')
        viewFodlers.style.display = 'none'
        reffolders.innerHTML = ` <a href="./Folders/folders.html">
        <p class="noTasks">Ups, you don't have any folder created, create now...</p>
    </a>`
    }


    let reffile = document.getElementById('filess')
    let refsaveFiles = document.getElementById('saveFiles')
    let tempFile = ''

    if (files.length != 0) {
        const n = 5 //get the first 3 items
        const newArray = files.slice(0, n)
        for (cnt = 0; cnt < newArray.length; cnt = cnt + 1) {
            tempFile = tempFile + reffile.innerHTML
                .replace(/{{Name}}/g, files[cnt])
        }
        refsaveFiles.innerHTML = tempFile
    } else {
        let viewFiles = document.getElementById('viewFiles')
        viewFiles.style.display = 'none'
        refsaveFiles.innerHTML = ` <a href="./Files/files.html">
        <p class="noTasks">Ups, you don't have any file created, create now...</p>
    </a>`
    }


    let reftemp = document.getElementById('templt')
    let refTask = document.getElementById('pendTasks')
    let htmls = ''

    if (b.length != 0) {
        const n = 4 //get the first 3 items
        const newArray = b.slice(0, n)
        for (cnt = 0; cnt < newArray.length; cnt = cnt + 1) {
            htmls = htmls + reftemp.innerHTML
                .replace(/{{name}}/g, b[cnt].name)
                .replace(/{{des}}/g, b[cnt].des)
        }
        refTask.innerHTML = htmls
    } else {
        let viewMore = document.getElementById('viewMore')
        viewMore.style.display = 'none'
        refTask.innerHTML = ` <a href="./Tasks/tasks.html">
        <p class="noTasks">Ups, you don't have any task created, create now...</p>
    </a>`
    }

}

let seachrBarTemp = ` <div class="searchInfo">
<div>
    <h5 class="usrName">{{name}}</h5>
</div>
</div>`

async function serachBar(searchValue) {
    let Searchwrapper = document.getElementById('Searchwrapper')
    let html = ''

    let template = seachrBarTemp
    for (cnt = 0; cnt < dir.length; cnt = cnt + 1) {
        let shValue = dir[cnt]
        if (shValue.indexOf(searchValue) != 1) {
            html = html + template
                .replaceAll(/{{name}}/g, dir[cnt])

            console.log(shValue)
        }
    }

    //Searchwrapper.innerHTML = html
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
function delteEvents(elementId) {
    let y = elementId.parentElement
    y.parentElement.removeChild(y)
}