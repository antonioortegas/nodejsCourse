//Using commonJS module system (not recommended, almost deprecated)
//const sum = require('./sum') //This only works if we use module.exports = sum;, not module.exports = { sum }
const { sum } = require('./sum') //This only works if we use module.exports = { sum }
console.log(sum(1, 2))