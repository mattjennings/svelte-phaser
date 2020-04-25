export function findGameObjectsByName(scene, name) {
  return scene.children.list.filter(child => child.name === name)
}
