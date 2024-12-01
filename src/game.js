import { eventbus } from './engine/eventbus.js'
import { HUD } from './hud.js'
import { Inbox } from './inbox.js'

class Game {
  root = document.querySelector('#root')

  money = 0
  reputation = 0

  constructor({ modules }) {
    eventbus.on('inbox/accept', (project) => {
      this.setMoney(this.money + project.reward)
      this.setReputation(this.reputation + 1)
    })

    eventbus.on('money/add', (amount) => {
      this.setMoney(this.money + amount)
    })
    eventbus.on('reputation/add', (amount) => {
      this.setReputation(this.reputation + amount)
    })

    for (let index = 0; index < modules.length; index++) {
      const module = modules[index];
      new module({
        root: this.root,
        eventbus,
      })
    }
  }

  setMoney(newMoney) {
    this.money = newMoney
    eventbus.emit('money/changed', this.money)
  }

  setReputation(newReputation) {
    this.reputation = newReputation
    eventbus.emit('reputation/changed', this.reputation)
  }

  start() {
    this.setMoney(0)
    this.setReputation(0)
  }
}

const game = new Game({
  /* @TODO fix UI layout regardless how modules inited */
  modules: [
    HUD,
    Inbox
  ]
})

export { game }
