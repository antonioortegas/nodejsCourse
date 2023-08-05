function sum (a, b) {
    return a + b;
}

//module.exports = sum;
module.exports = { // Forcing the name of the exported function to be "sum"
    sum
}