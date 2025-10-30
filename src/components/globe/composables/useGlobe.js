import { ref } from 'vue'
import * as THREE from 'three'
import { createPoints } from '../utils/globePoints'

export function useGlobe(container, theme) {
  const scene = ref(null)
  const camera = ref(null)
  const renderer = ref(null)
  const globe = ref(null)
  let landPointsMesh = null
  let oceanPointsMesh = null
  let animationId = null
  const rotationX = ref(0)
  const rotationY = ref(0)

  const disposeMesh = (mesh) => {
    if (!mesh) return
    if (mesh.parent) {
      mesh.parent.remove(mesh)
    }
    if (mesh.geometry) mesh.geometry.dispose()
    if (mesh.material) mesh.material.dispose()
  }

  const createGlobe = () => {
    // Scene
    scene.value = new THREE.Scene()
    scene.value.background = new THREE.Color(theme.value === 'dark' ? '#0a0a0a' : '#ffffff')

    // Use 70vh of display height (square)
    const size = Math.round(window.innerHeight * 0.7)

    // Camera
    camera.value = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    camera.value.position.z = 3

    // Renderer
    renderer.value = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.value.setSize(size, size)
    renderer.value.setPixelRatio(window.devicePixelRatio)
    container.value.appendChild(renderer.value.domElement)

    // Globe sphere
    const geometry = new THREE.SphereGeometry(1, 64, 64)
    const material = new THREE.MeshBasicMaterial({ 
      color: theme.value === 'dark' ? '#000000' : '#ffffff',
      transparent: false,
      opacity: 1
    })
    globe.value = new THREE.Mesh(geometry, material)
    scene.value.add(globe.value)

    // Points
    createPoints(scene.value, theme, landPointsMesh, oceanPointsMesh, disposeMesh)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1)
    scene.value.add(ambientLight)
  }

  const updateTheme = () => {
    if (!scene.value) return
    scene.value.background = new THREE.Color(theme.value === 'dark' ? '#0a0a0a' : '#ffffff')
    
    if (globe.value) {
      globe.value.material.color = new THREE.Color(theme.value === 'dark' ? '#000000' : '#ffffff')
    }
    
    // Recreate points with new theme
    createPoints(scene.value, theme, landPointsMesh, oceanPointsMesh, disposeMesh)
  }

  const animate = (updateRotation) => {
    const render = () => {
      if (updateRotation) {
        updateRotation()
      }
      
      if (globe.value) {
        globe.value.rotation.x = rotationX.value
        globe.value.rotation.y = rotationY.value
      }
      
      if (landPointsMesh) {
        landPointsMesh.rotation.x = rotationX.value
        landPointsMesh.rotation.y = rotationY.value
      }
      if (oceanPointsMesh) {
        oceanPointsMesh.rotation.x = rotationX.value
        oceanPointsMesh.rotation.y = rotationY.value
      }
      
      renderer.value.render(scene.value, camera.value)
      animationId = requestAnimationFrame(render)
    }
    render()
  }

  const handleResize = () => {
    if (!renderer.value || !camera.value) return
    
    const size = Math.round(window.innerHeight * 0.7)
    renderer.value.setSize(size, size)
    camera.value.aspect = 1
    camera.value.updateProjectionMatrix()
  }

  const cleanup = () => {
    if (animationId) {
      cancelAnimationFrame(animationId)
    }
    if (renderer.value) {
      renderer.value.dispose()
    }
    window.removeEventListener('resize', handleResize)
  }

  // Initialize resize listener
  window.addEventListener('resize', handleResize)

  return {
    createGlobe,
    animate,
    cleanup,
    updateTheme,
    scene,
    camera,
    renderer,
    globe,
    rotationX,
    rotationY
  }
}