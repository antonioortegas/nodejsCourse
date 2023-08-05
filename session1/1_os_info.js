// import os from 'node:os'
import {
    userInfo,
    type,
    platform,
    homedir,
    arch,
    release,
    cpus,
    freemem,
    totalmem,
    uptime
} from 'node:os'

console.log('Operating system info:')
console.log(userInfo())
console.log(type())
console.log(platform())
console.log(homedir())
console.log(arch())
console.log(release())
console.log('CPU info:')
console.log(cpus())
console.log('Free memory:')
console.log(freemem() / 1024 / 1024)
console.log('Total memory:')
console.log(totalmem() / 1024 / 1024)
const osUptime = uptime()
// Format the uptime to a nicer looking time
const osUptimeHours = Math.floor(osUptime / 3600)
const osUptimeMinutes = Math.floor((osUptime - osUptimeHours * 3600) / 60)
const osUptimeSeconds = Math.floor(
    osUptime - osUptimeHours * 3600 - osUptimeMinutes * 60
)
console.log(
    `The system uptime is ${osUptimeHours} hours, ${osUptimeMinutes} minutes and ${osUptimeSeconds} seconds.`
)
