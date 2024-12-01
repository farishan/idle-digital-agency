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

let projects = [generateProject()]

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

const inboxDisplay = document.createElement('div')
inboxDisplay.classList.add('inbox-display')
inboxDisplay.innerHTML = '<h2>Inbox</h2>'

const generateProjectButton = document.createElement('button')
generateProjectButton.textContent = 'Generate Project'
generateProjectButton.onclick = () => {
  projects.push(generateProject())
  renderProjects()
}
inboxDisplay.append(generateProjectButton)

const projectTable = document.createElement('table')
const projectTbody = document.createElement('tbody')

projectTable.append(projectTbody)
inboxDisplay.append(projectTable)

function renderProjects() {
  projectTbody.innerHTML = ''

  for (let index = 0; index < projects.length; index++) {
    const project = projects[index];
    const projectTr = document.createElement('tr')

    const projectNameTd = document.createElement('td')
    projectNameTd.textContent = project.name
    projectTr.append(projectNameTd)
    projectTbody.append(projectTr)

    const projectRewardTd = document.createElement('td')
    projectRewardTd.textContent = `$${project.reward}`
    projectTr.append(projectRewardTd)
    projectTbody.append(projectTr)

    const projectAcceptButtonTd = document.createElement('td')
    const acceptProjectButton = document.createElement('button')
    acceptProjectButton.textContent = 'Accept'
    projectAcceptButtonTd.append(acceptProjectButton)
    acceptProjectButton.onclick = () => {
      setMoney(money + project.reward)
      setReputation(reputation + 1)
      projects = projects.filter(p => p.id != project.id)
      renderProjects()
    }
    projectTr.append(projectAcceptButtonTd)
  }
}

renderProjects()

root.append(inboxDisplay)
