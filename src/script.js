import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { BasicParticles, GalaxyParticles } from './particles'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

/**
 * Particles
 */

// const particlesGeometry = new THREE.SphereGeometry(
//     1, 20, 20
// )
// const particlesGeometry = new THREE.BufferGeometry()
// const count = 300
// const positions = new Float32Array(count * 3)

// for (let i=0; i < count * 3; i++) {
//     positions[i] = (Math.random() - 0.5) * 10
// }

// particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))


// const particles = new THREE.Points(
//      particlesGeometry,
//     new THREE.PointsMaterial({size: 0.02, sizeAttenuation: true})
// )

// scene.add(particles)


const particles = new GalaxyParticles(gui, scene)
particles.buildUI(gui)

scene.add(particles.particles)

// const cube = new THREE.Mesh(
//     new THREE.BoxGeometry(),
//     new THREE.MeshBasicMaterial()
// )
// scene.add(cube)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
camera.position.y = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

let timeTicks = clock.getElapsedTime()
const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    // particles.randomize()
    // Update controls
    particles.tick(elapsedTime)
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()


// gui.add(globals, 'particleCount').min(100).max(40000).onChange(() => {
// })




