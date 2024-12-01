export function generateProject() {
  const id = Math.random().toString(36).slice(2, 9).toUpperCase()

  return {
    id,
    name: `Project ${id}`,
    reward: Math.floor(Math.random() * 10)
  }
}