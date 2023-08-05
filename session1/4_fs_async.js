const fs = require('node:fs/promises');

/*
const text1 = await fs.readFile('./session1/file1.txt', 'utf-8')
console.log(text1); //This is executed after the file is read

console.log('Instruction between the two readFile calls'); //This is executed before the file1 is done reading

const text2 = await fs.readFile('./session1/file2.txt', 'utf-8')
console.log(text2); //This is executed after the file is read
*/

// THIS IS NOT ALLOWED because await can only be used inside an async function (top level await is not supported) by commonJS
// Change the file extension to .mjs to use top level await using ES modules
// Another way to use top level await is to use the IIFE pattern, encapsulating the code inside an async function

(async () => {
    const text1 = await fs.readFile('./session1/file1.txt', 'utf-8')
    console.log(text1) // This is executed after the file is read

    console.log('Instruction between the two readFile calls') // This is executed before the file1 is done reading

    const text2 = await fs.readFile('./session1/file2.txt', 'utf-8')
    console.log(text2) // This is executed after the file is read
})()

// This is the same as
/*
function main() {
    code
}
main()
*/
// It executes the function immediately after it is defined
