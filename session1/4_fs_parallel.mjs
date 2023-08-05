import  {readFile} from 'fs/promises';

Promise.all([
    readFile('./session1/file1.txt', 'utf-8'),
    readFile('./session1/file2.txt', 'utf-8')
]).then(([text1, text2]) => {
    console.log(text1);
    console.log(text2);
})