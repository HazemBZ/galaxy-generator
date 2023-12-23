import * as THREE from 'three'


class BasicParticles {
    constructor() {
        this.particlesGeometry = new THREE.BufferGeometry()
        this.particleCount = 300000
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

        this.particlesMaterial = new THREE.PointsMaterial({
            size: 0.02,
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

}

export { BasicParticles }