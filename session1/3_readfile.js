const fs = require('node:fs'); //Recommended to use node:fs instead of fs

console.log("Synchronous version of readFileSync:\n")

//const text = fs.readFileSync('./session1/file1.txt'); //This returns a buffer
const text1 = fs.readFileSync('./session1/file1.txt', 'utf-8');
console.log(text1);

console.log('Instruction between the two readFileSync calls'); //WE CANT DO SOMETHING ELSE WHILE THE FILE IS BEING READ

const text2 = fs.readFileSync('./session1/file2.txt', 'utf-8');
console.log(text2);



console.log("----------------------------------------")
console.log("Asynchronous version of readFileSync:\n")



//This is the asynchronous version of readFileSync using callbacks (they are executed after the file is read)
fs.readFile('./session1/file1.txt', 'utf-8', (err, text1) => {
    if(err) throw err;
    console.log(text1); //This is executed after the file is read
});

console.log('Instruction between the two readFile calls'); //This is executed before the file1 is done reading

fs.readFile('./session1/file2.txt', 'utf-8', (err, text2) => {
    if(err) throw err;
    console.log(text2); //This is executed after the file is read
});