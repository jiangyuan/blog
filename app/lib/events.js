/**
 * 事件
 */

const EventsEmitter = require('events')

let BlogEvents = global.BlogEvents

if (!BlogEvents) {
  class Events extends EventsEmitter {}
  global.BlogEvents = BlogEvents = new Events()
}

module.exports = BlogEvents
