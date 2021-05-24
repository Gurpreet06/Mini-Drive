var menuTransition = '0.5s ease'
// Colect Id's from elements
let refBody = document.getElementsByTagName('body')[0] // Reference to body
let refcreateBlur = document.getElementById('createBlur') // Reference to create background blur affect
let refcreateEvent = document.getElementById('createEvent') // Reference to show add template


function init() {
    let refPlantilla = document.getElementById('plantilla')
    let reffolders = document.getElementById('folders')
    let html = ''

    for (cnt = 0; cnt < dir.length; cnt = cnt + 1) {
        html = html + refPlantilla.innerHTML
            .replace(/{{Name}}/g, dir[cnt])
            .replace(/{{Link}}/g, 'http://localhost:8000/Folders/folders.html')
    }
    reffolders.innerHTML = html

    let reffile = document.getElementById('filess')
    let refsaveFiles = document.getElementById('saveFiles')
    let tempFile = ''

    for (cnt = 0; cnt < files.length; cnt = cnt + 1) {
        tempFile = tempFile + reffile.innerHTML
            .replace(/{{Name}}/g, files[cnt])
    }
    refsaveFiles.innerHTML = tempFile

    let reftemp = document.getElementById('templt')
    let refTask = document.getElementById('pendTasks')
    let htmls = ''

    for (cnt = 0; cnt < b.length; cnt = cnt + 1) {
        htmls = htmls + reftemp.innerHTML
            .replace(/{{name}}/g, b[cnt].name)
            .replace(/{{des}}/g, b[cnt].des)
    }
    refTask.innerHTML = htmls
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
function delteEvents() {
    let y = document.getElementById('element')
    y.parentElement.removeChild(y)
}