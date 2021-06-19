function init() {
    let refPlantilla = document.getElementById('plantilla')
    let reffolders = document.getElementById('myFolders')
    let html = ''

    for (cnt = 0; cnt < userDir.length; cnt = cnt + 1) {
        html = html + refPlantilla.innerHTML
            .replace(/{{Name}}/g, userDir[cnt])
    }
    reffolders.innerHTML = html

    let refPlantilla1 = document.getElementById('plantilla1')
    let reffolders1 = document.getElementById('myFiles')
    let html1 = ''

    for (cnt = 0; cnt < userFile.length; cnt = cnt + 1) {
        html1 = html1 + refPlantilla1.innerHTML
            .replace(/{{Name}}/g, userFile[cnt])
    }
    reffolders1.innerHTML = html1


    let events = sessionStorage.getItem('eventos')
    let title = []
    if (events) {
        title = JSON.parse(events)
    }

    for (let cnt = 0; cnt < title.length; cnt = cnt + 1) {
        h(title[cnt])
    }
}