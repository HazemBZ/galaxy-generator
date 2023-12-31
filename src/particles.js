import * as THREE from 'three'
import { degToRad, radToDeg } from 'three/src/math/MathUtils'


class BasicParticles {
    constructor(gui) {
        this.particlesGeometry = new THREE.BufferGeometry()
        this.particleCount = 10000
        this.size = 0.02
        this.particlePositions = new Float32Array(this.particleCount * 3)
        this.particleColors = new Float32Array(this.particleCount * 3)
        // this.gui = gui


        for (let i = 0; i < this.particleCount * 3; i++) {
            this.particlePositions[i] = (Math.random() - .5) * 10  // - 0.5 to center round 0,0,0
            this.particleColors[i] = Math.random()
        }

        this.particlesGeometry.setAttribute(
            'position',
            new THREE.BufferAttribute(this.particlePositions, 3)
        )

        this.particlesGeometry.setAttribute(
            'color',
            new THREE.BufferAttribute(this.particleColors, 3)
        )

        this.particlesMaterial = new THREE.PointsMaterial({
            size: this.size,
            sizeAttenuation: true,
        })

        this.particles = new THREE.Points(
            this.particlesGeometry,
            this.particlesMaterial
        )



        /**
         * Updates
         */
        const textureLoader = new THREE.TextureLoader()
        const particleTexture = textureLoader.load('/textures/particles/2.png')
        // this.particlesMaterial.color = new THREE.Color("#44ffab")
        // this.particlesMaterial.map = particleTexture
        this.particlesMaterial.transparent = true
        this.particlesMaterial.alphaMap = particleTexture
        // this.particlesMaterial.alphaTest = 0.001
        // this.particlesMaterial.depthTest = false
        this.particlesMaterial.depthWrite = false
        this.particlesMaterial.blending = THREE.AdditiveBlending

        this.particlesMaterial.vertexColors = true


    }

    updateCount() {

    }

    randomize() {

        for (let i = 0; i < this.particleCount * 3; i++) {
            this.particlePositions[i] = (Math.random() - .5) * 10  // - 0.5 to center round 0,0,0
        }

        this.particlesGeometry.setAttribute(
            'position',
            new THREE.BufferAttribute(this.particlePositions, 3)
        )
    }

    tick(elapsedTime) {
        this.waveAnimate(elapsedTime)
    }


    waveAnimate(elapsedTime) {
        for (let i = 0; i < this.particleCount; i++) {
            const i3 = i * 3
            const x = this.particlesGeometry.attributes.position.array[i3]
            this.particlesGeometry.attributes.position.array[i3 + 1] = Math.sin(elapsedTime + x)
            // this.particlesGeometry.attributes.position.array[i * 3 + 1] = Math.cos(elapsedTime)

        }
        this.particlesGeometry.attributes.position.needsUpdate = true
    }



    buildUI(gui) {

        gui.add(this, 'particleCount')
            .min(100)
            .max(10000).onFinishChange(this.regenerateGeometry)
        gui.add(this, 'size').min(0).max(2).step(2 / 10000).onFinishChange(this.regenerateGeometry)


    }

    signaUpdte() {
        this.regenerateGeometry()
    }

    regenerateGeometry() {
        this.particlePositions = new Float32Array(this.particleCount * 3)
        this.particleColors = new Float32Array(this.particleCount * 3)


        for (let i = 0; i < this.particleCount * 3; i++) {
            this.particlePositions[i] = (Math.random() - .5) * 10  // - 0.5 to center round 0,0,0
            this.particleColors[i] = Math.random()
        }

        this.particlesGeometry.setAttribute(
            'position',
            new THREE.BufferAttribute(this.particlePositions, 3)
        )

        this.particlesGeometry.setAttribute(
            'color',
            new THREE.BufferAttribute(this.particleColors, 3)
        )

        this.particlesMaterial =
            new THREE.PointsMaterial({
                size: this.size,
                sizeAttenuation: true,
            })

        this.particles = new THREE.Points(this.particlesGeometry, this.particlesMaterial)
    }
}


// TODO: Revery BasicParticles to normal and move new  changes here 
class GalaxyParticles extends BasicParticles {
    constructor(gui, scene) {

        super(gui)
        this.particleCount = 10000
        this.particlesMaterial.alphaMap = null
        this.size = 0.05
        this.radius = 4.22
        this.spin = 1
        this.branches = 3
        this.randomness = 0.2988
        this.randomnessPower = 4.44
        this.insideColor = '#ff6030'
        this.outsideColor = '#1b3984'
        this.scene = scene
        this.importedSettings = ''
        this.gui = gui
        this.direction = 1

        this.regenerateGeometry(
        )


        const configs = {
            normal: () => {
                this.size = 0.05
                this.radius = 4.22
                this.randomness = 0.2988
                this.branches = 3
                this.randomnessPower = 4.44
                this.spin = 1

            },
            weird: () => {
                this.branches = 4
                this.spin = 0.22
                this.randomnessPower = 0
            },
            weird2: () => {
                this.branches = 4
                this.spin = 0.22
                this.randomness = 0.756
                this.randomnessPower = 0
            },
            weird3: () => {
                this.size = 0.05
                this.radius = 0.69
                this.randomness = 1.0264
                this.randomnessPower = 0
                this.spin = 10
                this.branches = 4
            }

        }

        configs.normal()


    }



    regenerateGeometry = (elapsedTime, animate = false) => {
        // super.regenerateGeometry()
        this.particlePositions = new Float32Array(this.particleCount * 3)
        this.particleColors = new Float32Array(this.particleCount * 3)




        console.log('regen')
        for (let i = 0; i < this.particleCount; i++) {
            // this.particleColors[i] = 1

            const i3 = i * 3

            const radius = Math.random() * this.radius
            const branchAngle = (i % this.branches) / this.branches * Math.PI * 2
            const spinAngle = radius * this.spin
            const varianceX = Math.pow(Math.random(), this.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * this.randomness * radius
            const varianceY = Math.pow(Math.random(), this.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * this.randomness * radius
            const varianceZ = Math.pow(Math.random(), this.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * this.randomness * radius

            const timeFactor = (elapsedTime && animate ? elapsedTime : 0)

            const shapes = {
                circle: () => {
                    this.particlePositions[i3] = radius * Math.cos(branchAngle + i)
                    this.particlePositions[i3 + 1] = 0
                    this.particlePositions[i3 + 2] = radius * Math.sin(branchAngle + i)


                },
                branches: () => {
                    this.particlePositions[i3] = (radius * (Math.cos((branchAngle + spinAngle + timeFactor) * this.direction)) + varianceX)
                    this.particlePositions[i3 + 1] = (0 + varianceY)
                    this.particlePositions[i3 + 2] = (radius * (Math.sin((branchAngle + spinAngle + timeFactor) * this.direction)) + varianceZ)

                }

            }

            shapes.branches()


            /**
             * Colors
             */
            const colorInside = new THREE.Color(this.insideColor)
            const colorOutside = new THREE.Color(this.outsideColor)

            const mixedColor = colorInside.clone()
            mixedColor.lerp(colorOutside, radius / this.radius)

            this.particleColors[i3] = mixedColor.r
            this.particleColors[i3 + 1] = mixedColor.g
            this.particleColors[i3 + 2] = mixedColor.b


            this.particlesGeometry.setAttribute(
                'position',
                new THREE.BufferAttribute(this.particlePositions, 3)
            )

            this.particlesGeometry.setAttribute(
                'color',
                new THREE.BufferAttribute(this.particleColors, 3)
            )

            this.particles = new THREE.Points(this.particlesGeometry, this.particlesMaterial)

        }
    }

    spinAnimate(elapsedTime) {
        // this.regenerateGeometry()
        console.log('spin ' + elapsedTime)

    }

    async exportSettings() {
        console.log('Gui save',)
        const settings = this.gui.save()
        await navigator.clipboard.writeText(JSON.stringify(settings))
        alert("Settings copied to clipboard")
    }

    importSettings = () => {
        try {
            const importedSettings = JSON.parse(this.importedSettings)

            this.gui.load(importedSettings)

            this.regenerateGeometry()

            console.log(importedSettings)


            // alert('imported settings ', importedSettings)

        } catch (error) {
            alert('error importing settings')
        }

    }

    changeDirection() {
        this.direction *= -1
    }

    buildUI(gui) {
        super.buildUI(gui)
        this.gui = gui
        gui.add(this, 'radius')
            .min(0.01).max(20).step(0.01).onFinishChange(() => { console.log('change'); this.regenerateGeometry() })
        gui.add(this, 'randomness')
            .min(0).max(2).step(2 / 10000).onFinishChange(this.regenerateGeometry)
        gui.add(this, 'branches')
            .min(1).max(4).step(1).onFinishChange(this.regenerateGeometry)
        gui.add(this, 'randomnessPower')
            .min(0).max(10).onFinishChange(this.regenerateGeometry)
        gui.add(this, 'spin')
            .min(0).max(10).onFinishChange(this.regenerateGeometry)
        gui.add(this, 'changeDirection')
        gui.add(this, 'importSettings')
        gui.add(this, 'importedSettings').name('settings')
        gui.add(this, 'exportSettings')



    }


    tick(elapsedTime) {
        this.regenerateGeometry(elapsedTime, true)
    }
}


export { BasicParticles, GalaxyParticles }