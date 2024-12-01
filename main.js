import { generateProject } from "./scripts/generate-project.js";

const root = document.querySelector('#root')
const moneyTd = document.createElement('td')
const reputationTd = document.createElement('td')

let money = 0;
function setMoney(newMoney) {
  money = newMoney
  moneyTd.textContent = `:$${money}`
}
setMoney(0)

let reputation = 0;
function setReputation(newReputation) {
  reputation = newReputation
  reputationTd.textContent = `:${reputation}`
}
setReputation(0)

const infoTable = document.createElement('table')
const infoTbody = document.createElement('tbody')
const moneyTr = document.createElement('tr')
const moneyLabelTd = document.createElement('td')
moneyLabelTd.textContent = 'Money'
const moneyAddTd = document.createElement('td')
const moneyAddButton = document.createElement('button')
moneyAddButton.textContent = 'Add'
moneyAddButton.onclick = () => setMoney(money + 1)
moneyAddTd.append(moneyAddButton)

const reputationTr = document.createElement('tr')
const reputationLabelTd = document.createElement('td')
reputationLabelTd.textContent = 'Reputation'
const reputationAddTd = document.createElement('td')
const reputationAddButton = document.createElement('button')
reputationAddButton.textContent = 'Add'
reputationAddButton.onclick = () => setReputation(reputation + 1)
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

let project = generateProject()

const projectDisplay = document.createElement('div')
function renderProject() {
  projectDisplay.innerHTML = `<p>${project.name} | Reward: ${project.reward}</p>`
  const acceptProjectButton = document.createElement('button')
  acceptProjectButton.textContent = 'Accept'
  projectDisplay.append(acceptProjectButton)
  acceptProjectButton.onclick = () => {
    setMoney(money + project.reward)
    setReputation(reputation + 1)
    project = generateProject()
    renderProject()
  }
}
root.append(projectDisplay)
renderProject()
