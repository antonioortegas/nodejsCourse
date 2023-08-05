const path = require('path')

// joining paths
// depending on the OS, the path separator is different (Windows uses \ and Linux uses / for example)
console.log(path.sep) // prints the path separator for the current OS
// path.join() takes care of this for you

const filePath = path.join('content', 'subfolder', 'test.txt')
console.log(filePath)

const base = path.basename(filePath) // returns the last part of the path
console.log(base)
console.log(path.basename(filePath, '.txt')) // returns the last part of the path without the extension
console.log(path.extname(filePath)) // returns the extension of the file
