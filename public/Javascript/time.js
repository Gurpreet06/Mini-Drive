// Colect Id's from elements
let refdate = document.getElementById('date') // Reference to Date
let refTime = document.getElementById('tim') // Reference to Time

//Create Date 
let months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
let current = new Date()
let time = current.getDate() + " " + months[current.getMonth()];
refdate.innerHTML = time

setInterval(function () {
    // Create Time
    let times = '';
    if (current.getMinutes() < 10) {
        times = current.getHours() + ":" + "0" + current.getMinutes();
    } else {
        times = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds()
    }

    refTime.innerHTML = times
}, 1000);



let seachrBarTemp = ` <div class="searchInfo">
<div class='searchRst'>
    <h5 class="usrName">{{name}}</h5>
    <p class='fileType'>Type: {{File}}</p>
</div>
</div>`

let rstFound = `<p class='noFileType'>No File Found</p>`

async function serachBar(searchValue) {
    let Searchwrapper = document.getElementById('Searchwrapper')
    let html = ''

    let template = seachrBarTemp

    if (searchValue != '') {
        for (cnt = 0; cnt < dir.length; cnt = cnt + 1) {
            let FolValue = dir[cnt]
            if (FolValue.indexOf(searchValue) != -1) {
                html = html + template
                    .replaceAll(/{{name}}/g, dir[cnt])
                    .replaceAll(/{{File}}/g, 'Folder')
            }
        }

        for (cnt = 0; cnt < files.length; cnt = cnt + 1) {
            let FolValue = files[cnt]
            if (FolValue.indexOf(searchValue) != -1) {
                html = html + template
                    .replaceAll(/{{name}}/g, files[cnt])
                    .replaceAll(/{{File}}/g, 'File')
            }
        }

        for (cnt = 0; cnt < b.length; cnt = cnt + 1) {
            let TaskVal = b[cnt]
            if (TaskVal.name.indexOf(searchValue) != -1 || TaskVal.des.indexOf(searchValue) != -1) {
                html = html + template
                    .replaceAll(/{{name}}/g, b[cnt].name)
                    .replaceAll(/{{File}}/g, 'Task')
            }
        }

        for (cnt = 0; cnt < b.length; cnt = cnt + 1) {
            let TaskVal = b[cnt]
            if (TaskVal.des.indexOf(searchValue) != -1) {
                html = html + template
                    .replaceAll(/{{name}}/g, b[cnt].des)
                    .replaceAll(/{{File}}/g, 'Task Desc')
            }
        }
    }

    Searchwrapper.style.display = 'block'
    Searchwrapper.innerHTML = html
    if (searchValue == '') {
        Searchwrapper.style.display = 'none'
    }
}
