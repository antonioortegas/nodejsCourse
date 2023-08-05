const fs = require('node:fs') // Recommended to use node:fs instead of fs

const stats = fs.statSync('./session1/notes1.txt')

console.log('isFile: ', stats.isFile(), '\nisDirectory: ', stats.isDirectory())
