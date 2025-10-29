<template>
  <div class="globe-container" :class="theme">
    <div class="controls">
      <button @click="toggleTheme" class="theme-btn">
        {{ theme === 'dark' ? '☀️' : '🌙' }}
      </button>
    </div>
    <div class="globe-wrapper" ref="container"></div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

export default {
  name: 'GlobeThree',
  setup() {
    const container = ref(null)
    let scene, camera, renderer, globe, landPointsMesh, oceanPointsMesh
    let animationId = null
    let isDragging = false
    let lastMouseX = 0, lastMouseY = 0
    let rotationX = 0, rotationY = 0
    let velocityX = 0, velocityY = 0
    const friction = 0.95

    const theme = ref('dark')
    const toggleTheme = () => {
      theme.value = theme.value === 'dark' ? 'light' : 'dark'
      updateTheme()
    }

    const updateTheme = () => {
      if (!scene) return
      scene.background = new THREE.Color(theme.value === 'dark' ? '#0a0a0a' : '#f5f5f5')
      
      if (globe) {
        globe.material.color = new THREE.Color(theme.value === 'dark' ? '#1a1a1a' : '#e0e0e0')
      }
      // rebuild points to switch land color for theme
      createPoints()
    }

    const createGlobe = () => {
      // Scene
      scene = new THREE.Scene()
      scene.background = new THREE.Color(theme.value === 'dark' ? '#0a0a0a' : '#f5f5f5')

      // Use 70vh of display height (square)
      const size = Math.round(window.innerHeight * 0.7)

      // Camera
      camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
      camera.position.z = 3

      // Renderer
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setSize(size, size)
      renderer.setPixelRatio(window.devicePixelRatio)
      container.value.appendChild(renderer.domElement)

      // Globe sphere
      const geometry = new THREE.SphereGeometry(1, 64, 64)
      const material = new THREE.MeshBasicMaterial({ 
        color: theme.value === 'dark' ? '#1a1a1a' : '#e0e0e0',
        transparent: true,
        opacity: 0.8
      })
      globe = new THREE.Mesh(geometry, material)
      scene.add(globe)

      // Points
      createPoints()

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
      scene.add(ambientLight)

      // Event listeners
      renderer.domElement.addEventListener('mousedown', onMouseDown)
      renderer.domElement.addEventListener('mousemove', onMouseMove)
      renderer.domElement.addEventListener('mouseup', onMouseUp)
      renderer.domElement.addEventListener('wheel', onWheel)
    }

    const disposeMesh = (mesh) => {
      if (!mesh) return
      scene.remove(mesh)
      if (mesh.geometry) mesh.geometry.dispose()
      if (mesh.material) mesh.material.dispose()
    }

    const createPoints = async () => {
      try {
        const response = await fetch('/static/globe-points.json')
        const data = await response.json()
        // remove previous
        disposeMesh(landPointsMesh)
        disposeMesh(oceanPointsMesh)

        const landPositions = []
        const landColors = []
        const oceanPositions = []
        const oceanColors = []

        data.points.forEach(point => {
          const lon = point.lon
          const lat = point.lat
          
          // Convert to 3D coordinates
          const phi = (90 - lat) * Math.PI / 180
          const theta = (lon + 180) * Math.PI / 180
          
          const x = Math.sin(phi) * Math.cos(theta)
          const y = Math.cos(phi)
          const z = Math.sin(phi) * Math.sin(theta)
          
          const px = x * 1.01, py = y * 1.01, pz = z * 1.01
          if (point.type === 'ocean') {
            oceanPositions.push(px, py, pz)
            oceanColors.push(0.5, 0.5, 0.5)
          } else {
            landPositions.push(px, py, pz)
            if (theme.value === 'dark') {
              landColors.push(1, 1, 1)
            } else {
              landColors.push(0, 0, 0)
            }
          }
        })

        if (landPositions.length) {
          const landGeometry = new THREE.BufferGeometry()
          landGeometry.setAttribute('position', new THREE.Float32BufferAttribute(landPositions, 3))
          landGeometry.setAttribute('color', new THREE.Float32BufferAttribute(landColors, 3))
          const landMaterial = new THREE.PointsMaterial({
            size: 0.01,
            vertexColors: true,
            transparent: true,
            opacity: 0.8
          })
          landPointsMesh = new THREE.Points(landGeometry, landMaterial)
          scene.add(landPointsMesh)
        }

        if (oceanPositions.length) {
          const oceanGeometry = new THREE.BufferGeometry()
          oceanGeometry.setAttribute('position', new THREE.Float32BufferAttribute(oceanPositions, 3))
          oceanGeometry.setAttribute('color', new THREE.Float32BufferAttribute(oceanColors, 3))
          const oceanMaterial = new THREE.PointsMaterial({
            size: 0.01,
            vertexColors: true,
            transparent: true,
            opacity: 0.3
          })
          oceanPointsMesh = new THREE.Points(oceanGeometry, oceanMaterial)
          scene.add(oceanPointsMesh)
        }
      } catch (error) {
        console.error('Error loading points:', error)
      }
    }

    const onMouseDown = (event) => {
      isDragging = true
      lastMouseX = event.clientX
      lastMouseY = event.clientY
    }

    const onMouseMove = (event) => {
      if (!isDragging) return
      
      const deltaX = event.clientX - lastMouseX
      const deltaY = event.clientY - lastMouseY
      
      velocityX = deltaX * 0.01
      velocityY = deltaY * 0.01
      
      lastMouseX = event.clientX
      lastMouseY = event.clientY
    }

    const onMouseUp = () => {
      isDragging = false
    }

    const onWheel = (event) => {
      const factor = event.deltaY > 0 ? 0.9 : 1.1
      velocityX *= factor
      velocityY *= factor
    }

    const animate = () => {
      if (!isDragging) {
        velocityX *= friction
        velocityY *= friction
      }
      
      rotationY += velocityX
      rotationX += velocityY
      
      if (globe) {
        globe.rotation.x = rotationX
        globe.rotation.y = rotationY
      }
      
      if (landPointsMesh) {
        landPointsMesh.rotation.x = rotationX
        landPointsMesh.rotation.y = rotationY
      }
      if (oceanPointsMesh) {
        oceanPointsMesh.rotation.x = rotationX
        oceanPointsMesh.rotation.y = rotationY
      }
      
      renderer.render(scene, camera)
      animationId = requestAnimationFrame(animate)
    }

    const handleResize = () => {
      if (!renderer || !camera) return
      
      const size = Math.round(window.innerHeight * 0.7)
      renderer.setSize(size, size)
      camera.aspect = 1
      camera.updateProjectionMatrix()
    }

    onMounted(() => {
      createGlobe()
      animate()
      window.addEventListener('resize', handleResize)
    })

    onUnmounted(() => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
      if (renderer) {
        renderer.dispose()
      }
      window.removeEventListener('resize', handleResize)
    })

    return {
      container,
      theme,
      toggleTheme
    }
  }
}
</script>

<style scoped>
.globe-container {
  width: 70vh;
  height: 70vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.globe-container.dark {
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
}

.globe-container.light {
  background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
}

.controls {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;
}

.theme-btn {
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  cursor: pointer;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.theme-btn:hover {
  transform: scale(1.1);
  background: rgba(255, 255, 255, 0.2);
}

.globe-wrapper {
  width: 100%;
  height: 100%;
  cursor: grab;
}

.globe-wrapper:active {
  cursor: grabbing;
}
</style>