const net = require('node:net')

const desiredPort = process.env.PORT ?? 3000 // to use the process.env.PORT variable execute the script with PORT=X node session1/10_look_for_free_port.js

function findFreePort (desiredPort) {
    return new Promise((resolve, reject) => {
        const server = net.createServer()

        server.listen(desiredPort, () => {
            const port = server.address().port
            server.close(() => {
                resolve(port)
            })
        })

        server.on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                resolve(findFreePort(0))
            } else {
                reject(err)
            }
        })
    })
}

findFreePort(desiredPort).then((port) => {
    console.log(`Free port found: ${port}`)
})
