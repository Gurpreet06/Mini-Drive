var menuTransition = '0.5s ease'
let refBodys = document.getElementsByTagName('body')[0] // Reference to body
let refcreateBlurs = document.getElementById('createBlur1') // Reference to create background blur affect
let refcreateEvents = document.getElementById('createEvent1') // Reference to show add template

//Show Add event template
async function uploadFile() {
    // Stop body to do scroll and add blur affect to background 
    refBodys.style.overflow = 'hidden'
    refcreateBlurs.style.display = 'flex'

    // Wait here form animation
    await wait(1)

    // Active animation
    refcreateBlurs.style.transition = 'opacity ' + menuTransition
    refcreateEvents.style.transition = 'transform ' + menuTransition

    // Show Animation
    refcreateBlurs.style.opacity = 1
    refcreateEvents.style.transform = 'translateX(0)'

    // Wait here form animation
    await wait(1)
}

async function hideFile(evt) {
    if (evt.target.getAttribute('id') != 'createBlur1') return

    // Stop body to do scroll and add blur affect to background 
    refBodys.style.overflow = 'auto'
    refcreateBlurs.style.display = 'block'

    // Wait here form animation
    await wait(1)

    // Active animation
    refcreateBlurs.style.transition = 'opacity ' + menuTransition
    refcreateEvents.style.transition = 'transform ' + menuTransition

    // Show Animation
    refcreateBlurs.style.opacity = 0
    refcreateEvents.style.transform = 'translateY(-250%)'

    // Wait here form animation
    await wait(500)

    // And in last refresh page
    location.reload()
}

let refBody = document.getElementsByTagName('body')[0] // Reference to body
let refcreateBlur = document.getElementById('createBlur') // Reference to create background blur affect
let refcreateEvent = document.getElementById('createEvent') // Reference to show add template

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
    refcreateEvent.style.transform = 'translateY(-110%)'

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