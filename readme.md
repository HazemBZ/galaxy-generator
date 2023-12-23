# Particles

## First Particles

### Geometries
You can use any of the basic Three.js geometries.
Nontheless It's preferable to use BufferGeometries.
(Each vertex of the geometry will become a particle). 


### PointsMaterial
has multiple properties specific to particles like the size to control all particles size and the sizeAttenuation to specify if distant particles should be smaller than close particles:

```sh
// Material
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,
    sizeAttenuation: true
})
```

### Points
Instead of using a Mash object we create a Points object

```sh
// Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles)
```

### Color, map and alpha map


**alphaMap**
(Case texture procudes glaring edges)
We need to activate transparency with transparent and use the texture on the alphaMap property instead of the map:

```
// particlesMaterial.map = particleTexture
particlesMaterial.transparent = true
particlesMaterial.alphaMap = particleTexture
```


(Case back objects render bypass frontal object)
> That is because the particles are drawn in the same order as they are created, and WebGL doesn't really know which one is in front of the other.

There are multiple ways of fixing this.

**using alphaTest**

The alphaTest is a value between 0 and 1 that enables the WebGL to know when not to render the pixel according to that pixel's transparency.

```
particlesMaterial.alphaTest = 0.001
```


**using depthTest**
When drawing, the WebGL tests if what's being drawn is closer than what's already drawn. That is called depth testing and can be deactivated (you can comment the alphaTest):

```
// particlesMaterial.alphaTest = 0.001
particlesMaterial.depthTest = false
```

--> all objects with different colors overlap 


**using depthWrite**
(skips comparing how's first and just draws the current object)
As we said, the WebGL is testing if what's being drawn is closer than what's already drawn. The depth of what's being drawn is stored in what we call a depth buffer. Instead of not testing if the particle is closer than what's in this depth buffer, we can tell the WebGL not to write particles in that depth buffer (you can comment the depthTest):

```
// particlesMaterial.alphaTest = 0.001
// particlesMaterial.depthTest = false
particlesMaterial.depthWrite = false
```