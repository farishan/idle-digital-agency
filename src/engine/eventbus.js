class Eventbus {
  functionsByKey = {}

  constructor() {

  }

  on(key, fn) {
    if (!this.functionsByKey[key]) this.functionsByKey[key] = []

    this.functionsByKey[key].push(fn)
  }

  off(key) {
    delete this.functionsByKey[key]
  }

  emit(key, payload) {
    if (!this.functionsByKey[key]) this.functionsByKey[key] = []

    for (let index = 0; index < this.functionsByKey[key].length; index++) {
      const fn = this.functionsByKey[key][index];
      fn(payload)
    }
  }
}

export const eventbus = new Eventbus()