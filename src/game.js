import { Inbox } from './inbox.js'

class Game {
  root = document.querySelector('#root')

  money = 0
  moneyTd = document.createElement('td')
  reputation = 0
  reputationTd = document.createElement('td')

  constructor({ modules }) {
    this.init()

    for (let index = 0; index < modules.length; index++) {
      const module = modules[index];
      new module({
        /* TODO fix onAccept. not all modules have that */
        root: this.root, onAccept: (project) => {
          this.setMoney(this.money + project.reward)
          this.setReputation(this.reputation + 1)
        }
      })
    }
  }

  setMoney(newMoney) {
    this.money = newMoney
    this.moneyTd.textContent = `:$${this.money}`
  }

  setReputation(newReputation) {
    this.reputation = newReputation
    this.reputationTd.textContent = `:${this.reputation}`
  }

  init() {
    const root = this.root

    this.setMoney(0)
    this.setReputation(0)

    const infoTable = document.createElement('table')
    const infoTbody = document.createElement('tbody')
    const moneyTr = document.createElement('tr')
    const moneyLabelTd = document.createElement('td')
    moneyLabelTd.textContent = 'Money'
    const moneyAddTd = document.createElement('td')
    const moneyAddButton = document.createElement('button')
    moneyAddButton.textContent = 'Add'
    moneyAddButton.onclick = () => this.setMoney(this.money + 1)
    moneyAddTd.append(moneyAddButton)

    const reputationTr = document.createElement('tr')
    const reputationLabelTd = document.createElement('td')
    reputationLabelTd.textContent = 'Reputation'
    const reputationAddTd = document.createElement('td')
    const reputationAddButton = document.createElement('button')
    reputationAddButton.textContent = 'Add'
    reputationAddButton.onclick = () => this.setReputation(this.reputation + 1)
    reputationAddTd.append(reputationAddButton)

    moneyTr.append(moneyLabelTd)
    moneyTr.append(this.moneyTd)
    moneyTr.append(moneyAddTd)
    reputationTr.append(reputationLabelTd)
    reputationTr.append(this.reputationTd)
    reputationTr.append(reputationAddTd)
    infoTbody.append(moneyTr)
    infoTbody.append(reputationTr)
    infoTable.append(infoTbody)
    root.append(infoTable)
  }

  start() {

  }
}

const game = new Game({
  /* TODO HUD module? */
  modules: [Inbox]
})

export { game }
