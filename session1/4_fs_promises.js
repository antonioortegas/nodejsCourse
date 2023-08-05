const fs = require('node:fs/promises')

// Using promises instead of callbacks
fs.readFile('./session1/file1.txt', 'utf-8')
    .then((text1) => {
        console.log(text1) // This is executed after the file is read
    })
    .catch((err) => {
        console.log(err)
    })

console.log('Instruction between the two readFile calls') // This is executed before the file1 is done reading

fs.readFile('./session1/file2.txt', 'utf-8')
    .then((text2) => {
        console.log(text2) // This is executed after the file is read
    })
    .catch((err) => {
        console.log(err)
    })

// You can convert a callback function to a promise using util.promisify if promises are not supported by the function
// const util = require('node:util');
// const readFilePromise = util.promisify(fs.readFile);
