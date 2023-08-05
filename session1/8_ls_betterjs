const fs = require('node:fs/promises')
const path = require('node:path')
const pc = require('picocolors') // this comes from the node_modules folder, so we don't need to specify the path

const folder = process.argv[2] ?? './' // if no argument is passed, use the current directory

async function ls (folder) {
    let files
    try {
        files = await fs.readdir(folder) // Using await to make an async call, but synchronously (wait for the result before continuing)
    } catch {
        console.error(pc.red('Error reading directory: ', `${folder}`))
        process.exit(1)
    }

    const filesPromises = files.map(async (file) => {
    // Reading all files CAN be done in parallel, so we can use map async combined with Promise.all. Map works in parallel.
        const filePath = path.join(folder, file)
        let stats
        try {
            stats = await fs.stat(filePath)
        } catch (err) {
            console.error('Error reading file: '`${filePath}`)
            process.exit(1)
        }
        const isDirectory = stats.isDirectory()
        const fileType = isDirectory ? 'd' : 'f'

        return `${fileType} - ${pc.green(file.padEnd(20))}`
    })

    const filesInfo = await Promise.all(filesPromises)
    filesInfo.forEach((fileInfo) => console.log(fileInfo))
}

ls(folder)
