import { eventbus } from "./eventbus.js"

/* @TODO state machine */
/* @TODO separated 60fps rendering */

class Timer {
  shouldRun = false
  isRunning = false
  time = new Date()
  interval

  constructor() {
    eventbus.on('time/start', () => {
      this.start()
    })
    eventbus.on('time/stop', () => {
      this.stop()
    })
  }

  start() {
    if (this.isRunning) return

    this.shouldRun = true
    this.isRunning = true

    this.interval = setInterval(() => {
      if (!this.shouldRun) {
        clearInterval(this.interval)
        this.isRunning = false
      }

      this.time = new Date()
      console.log(this.time)
      eventbus.emit('time/changed', this.time.toISOString())
    }, 1000)
  }

  stop() {
    this.shouldRun = false
  }
}

export const timer = new Timer()
