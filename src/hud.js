export class HUD {
  constructor({
    root,
    eventbus
  }) {
    const infoTable = document.createElement('table')
    const infoTbody = document.createElement('tbody')
    const moneyTr = document.createElement('tr')
    const moneyLabelTd = document.createElement('td')
    moneyLabelTd.textContent = 'Money'
    const moneyTd = document.createElement('td')
    const moneyAddTd = document.createElement('td')
    const moneyAddButton = document.createElement('button')
    moneyAddButton.textContent = 'Add'
    moneyAddButton.onclick = () => eventbus.emit('money/add', 1)
    moneyAddTd.append(moneyAddButton)

    const reputationTr = document.createElement('tr')
    const reputationLabelTd = document.createElement('td')
    reputationLabelTd.textContent = 'Reputation'
    const reputationTd = document.createElement('td')
    const reputationAddTd = document.createElement('td')
    const reputationAddButton = document.createElement('button')
    reputationAddButton.textContent = 'Add'
    reputationAddButton.onclick = () => eventbus.emit('reputation/add', 1)
    reputationAddTd.append(reputationAddButton)

    moneyTr.append(moneyLabelTd)
    moneyTr.append(moneyTd)
    moneyTr.append(moneyAddTd)
    reputationTr.append(reputationLabelTd)
    reputationTr.append(reputationTd)
    reputationTr.append(reputationAddTd)
    infoTbody.append(moneyTr)
    infoTbody.append(reputationTr)
    infoTable.append(infoTbody)
    root.append(infoTable)

    eventbus.on('money/changed', (n) => {
      moneyTd.textContent = `$${n}`
    })
    eventbus.on('reputation/changed', (n) => {
      reputationTd.textContent = `${n}`
    })
  }
}
