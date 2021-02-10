export function findGameObjectsByName<T extends Phaser.GameObjects.GameObject>(
  scene: Phaser.Scene,
  name: string
) {
  return scene.children.list.filter((child: T) => child.name === name)
}
