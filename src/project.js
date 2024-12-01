let projects = [generate()]

export function getProjects() {
  return projects
}

export function setProjects(newProjects) {
  projects = newProjects
}

export function add() {
  projects.push(generate())
}

function generate() {
  const id = Math.random().toString(36).slice(2, 9).toUpperCase()

  return {
    id,
    name: `Project ${id}`,
    reward: Math.floor(Math.random() * 10)
  }
}
