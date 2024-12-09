import { add, getProjects, setProjects } from "./project.js"

export class Inbox {
  constructor({ root, eventbus }) {
    const inboxDisplay = document.createElement('div')
    inboxDisplay.classList.add('inbox-display')
    inboxDisplay.innerHTML = '<h2>Inbox</h2>'

    const generateProjectButton = document.createElement('button')
    generateProjectButton.textContent = 'Generate Project'
    generateProjectButton.onclick = () => {
      add()
      renderProjects()
    }
    inboxDisplay.append(generateProjectButton)

    const projectTable = document.createElement('table')
    const projectTbody = document.createElement('tbody')

    projectTable.append(projectTbody)
    inboxDisplay.append(projectTable)

    function renderProjects() {
      projectTbody.innerHTML = ''

      const projects = getProjects()

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
          eventbus.emit('inbox/accept', project)

          setProjects(projects.filter(p => p.id != project.id))
          renderProjects()
        }
        projectTr.append(projectAcceptButtonTd)
      }
    }

    renderProjects()

    root.append(inboxDisplay)

    eventbus.on('project-generator/added', () => {
      renderProjects()
    })
  }
}
