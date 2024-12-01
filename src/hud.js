export class HUD {
  constructor({
    root,
    eventbus
  }) {
    const infoTable = document.createElement('table')
    const infoTbody = document.createElement('tbody')

    const timeTr = document.createElement('tr')
    const timeLabelTd = document.createElement('td')
    timeLabelTd.textContent = 'Time'
    const timeTd = document.createElement('td')
    timeTd.textContent = `${new Date().toISOString()}`
    const timeActionTd = document.createElement('td')
    const timeStartButton = document.createElement('button')
    timeStartButton.textContent = 'Start'
    timeStartButton.onclick = () => eventbus.emit('time/start')
    timeActionTd.append(timeStartButton)
    const timeStopButton = document.createElement('button')
    timeStopButton.textContent = 'Stop'
    timeStopButton.onclick = () => eventbus.emit('time/stop')
    timeActionTd.append(timeStopButton)

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

    timeTr.append(timeLabelTd)
    timeTr.append(timeTd)
    timeTr.append(timeActionTd)
    infoTbody.append(timeTr)
    moneyTr.append(moneyLabelTd)
    moneyTr.append(moneyTd)
    moneyTr.append(moneyAddTd)
    infoTbody.append(moneyTr)
    reputationTr.append(reputationLabelTd)
    reputationTr.append(reputationTd)
    reputationTr.append(reputationAddTd)
    infoTbody.append(reputationTr)
    infoTable.append(infoTbody)
    root.append(infoTable)

    eventbus.on('time/changed', (n) => {
      timeTd.textContent = `${n}`
    })
    eventbus.on('money/changed', (n) => {
      moneyTd.textContent = `$${n}`
    })
    eventbus.on('reputation/changed', (n) => {
      reputationTd.textContent = `${n}`
    })
  }
}
