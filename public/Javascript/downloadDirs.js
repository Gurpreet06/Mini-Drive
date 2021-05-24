function get_Name(innerName) {
    let dir = ''
    let currentName = document.getElementById('tileidH3')
    let currentFile = document.getElementById('tileidH3')

    if (currentName.innerHTML != 'YOUR FOLDERS' && currentFile.innerHTML != 'YOUR FILES') {
        dir = `${currentName.innerHTML}/${innerName}`;
    } else {
        dir = `${innerName}`;
    }

    downloadFiles(dir)
    // location.reload()
}

async function downloadFiles(dirname) {
    let serverData = undefined

    let obj1 = {
        type: 'fileList',
        names: dirname,
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