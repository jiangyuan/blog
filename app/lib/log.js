/**
 * log 代替 console.log
 * @author jero
 * @date 2016-12-13
 */

'use strict'
const logger = require('tracer').colorConsole({
  format: ' {{file}}:{{line}} {{message}}'
})

logger.log('hello')
logger.trace('hello')
logger.debug('hello')

console.log(new Date('2014-06-28').getTime())
console.log(new Date('2016-08-13 16:19:54').getTime())
