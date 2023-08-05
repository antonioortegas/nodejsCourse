const fs = require('node:fs')

//Read directory (ls command) 
fs.readdir('./session1', (err, files) => { //Always have to manage errors
    if (err) {
        console.log(err)
        return
    }

    files.forEach(file => {
        console.log(file)
    })
})