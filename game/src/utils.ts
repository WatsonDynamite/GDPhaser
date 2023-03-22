import { Object3D, Vector2, Vector3 } from 'three'

type modelTypes =
  | 'mesh'
  | 'material'
  | 'extrude'
  | 'existing'
  | 'plane'
  | 'ground'
  | 'box'
  | 'sphere'
  | 'cylinder'
  | 'cone'
  | 'torus'

export function getScreenPositionFromWorldSpace(
  position: Vector3,
  camera: THREE.PerspectiveCamera | THREE.OrthographicCamera,
  canvas: HTMLCanvasElement
): Vector2 {
  const positionCpy = new Vector3(position.x, position.y, position.z)
  const vector = positionCpy.project(camera)

  vector.x = Math.round((0.5 + vector.x / 2) * window.innerWidth)
  vector.y = Math.round((0.5 - vector.y / 2) * window.innerHeight)

  const xPercent = (vector.x / window.innerWidth) * 100
  const yPercent = (vector.y / window.innerHeight) * 100

  return new Vector2(xPercent, yPercent)
}
