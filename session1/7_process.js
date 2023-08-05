//Global object process
//console.log(process.argv) 
//prints the arguments passed to the script
//run 
//node 7_process.js firstArg secondArg
//in the terminal to see the output

//process.exit(0) 
//exits the process with the code 0 (success)

process.on('exit', () => { //runs when the process exits
    console.log(`EXIT`)
    //console.clear()
})

console.log(process.cwd()) //prints the current working directory