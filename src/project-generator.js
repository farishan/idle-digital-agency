import { add } from "./project.js"

export class ProjectGenerator {
  constructor({
    root,
    eventbus
  }) {
    eventbus.on('time/changed', (n) => {
      const rand = Math.random()
      if (rand < 0.5) {
        add()
        eventbus.emit('project-generator/added')
      }
    })
  }
}
