import { getContext } from 'svelte'

export default function getParentContainer() {
  return getContext('phaser/scene')
}
