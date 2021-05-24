var menuTransition = '0.5s ease'

async function showMobileMenu(evt) {
    let refBody = document.getElementsByTagName('body')[0],
        refSmall = document.getElementById('menuSmall'),
        refContainer = document.getElementById('menuContainer')

    if (typeof evt !== 'undefined') {
        if (evt.cancelable) evt.preventDefault()
        evt.stopPropagation()
        target = evt.target.id
    }

    refBody.style.overflow = 'hidden'
    refSmall.style.display = 'flex'
    await promiseWaitUntilPropertyValue('menuSmall', 'display', 'flex')

    // Activar l'animació
    refSmall.style.transition = 'opacity ' + menuTransition
    refContainer.style.transition = 'transform ' + menuTransition

    // Animar perquè es mostri
    refSmall.style.opacity = 1
    refContainer.style.transform = 'translateX(0)'

    await promiseTransitionEnd(refSmall)
}
async function hideMobileMenu(evt) {
    let refBody = document.getElementsByTagName('body')[0],
        refSmall = document.getElementById('menuSmall'),
        refContainer = document.getElementById('menuContainer'),
        target = ''


    if (typeof evt !== 'undefined') {
        if (evt.cancelable) evt.preventDefault()
        evt.stopPropagation()
        target = evt.target.id
    }

    if (target === 'menuSmall') {
        refBody.style.overflow = 'auto'
        // Activar l'animació
        refSmall.style.transition = 'opacity ' + menuTransition
        refContainer.style.transition = 'transform ' + menuTransition
        // Animar perquè s'amagui
        refSmall.style.opacity = 0
        refContainer.style.transform = 'translateX(-100%)'

        await promiseTransitionEnd(refSmall)
        refSmall.style.display = 'none'
    }
}
function navega(evt, lloc) {
    evt.stopPropagation()
    console.log('Navegar a ', lloc)
}

// Espera una estona abans de seguir amb el codi
async function promiseWait(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => { resolve() }, time)
    })
}

function promiseWaitUntilPropertyValue(divId, property, value) {
    return new Promise(async (resolve, reject) => {
        let ref = document.getElementById(divId),
            style = window.getComputedStyle(ref),
            now = style.getPropertyValue(property)
        if (now === value) {
            resolve()
        } else {
            await promiseWait(1)
            await promiseWaitUntilPropertyValue(divId, property, value)
        }
    })
}

function promiseTransitionEnd(ref) {
    return new Promise(async (resolve, reject) => {
        ref.addEventListener('transitionend', () => {
            resolve()
        })
    })
}