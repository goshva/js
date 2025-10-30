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
import './globe/styles/globe.css'

export default {
  name: 'GlobeThree',
  setup() {
    const container = ref(null)
    const theme = ref('dark')
    
    // Three.js variables
    let scene, camera, renderer, globe, landPointsMesh, oceanPointsMesh, cityPointsMesh
    let animationId = null
    let isDragging = false
    let lastMouseX = 0, lastMouseY = 0
    let rotationX = 0, rotationY = 0
    let velocityX = 0, velocityY = 0
    const friction = 0.95
    const autoRotationSpeed = 0.001
    const returnToAutoSpeed = 0.02

    // Mouse event handlers
    const onMouseDown = (event) => {
      isDragging = true
      lastMouseX = event.clientX
      lastMouseY = event.clientY
      event.preventDefault()
    }

    const onMouseMove = (event) => {
      if (!isDragging) return
      
      const deltaX = event.clientX - lastMouseX
      const deltaY = event.clientY - lastMouseY
      
      velocityX = deltaX * 0.01
      velocityY = deltaY * 0.01
      
      lastMouseX = event.clientX
      lastMouseY = event.clientY
      event.preventDefault()
    }

    const onMouseUp = () => {
      isDragging = false
    }

    const onWheel = (event) => {
      const factor = event.deltaY > 0 ? 0.9 : 1.1
      velocityX *= factor
      velocityY *= factor
      event.preventDefault()
    }

    // Touch event handlers
    const onTouchStart = (event) => {
      if (event.touches.length === 1) {
        isDragging = true
        lastMouseX = event.touches[0].clientX
        lastMouseY = event.touches[0].clientY
      }
      event.preventDefault()
    }

    const onTouchMove = (event) => {
      if (!isDragging || event.touches.length !== 1) return
      
      const deltaX = event.touches[0].clientX - lastMouseX
      const deltaY = event.touches[0].clientY - lastMouseY
      
      velocityX = deltaX * 0.01
      velocityY = deltaY * 0.01
      
      lastMouseX = event.touches[0].clientX
      lastMouseY = event.touches[0].clientY
      event.preventDefault()
    }

    const onTouchEnd = () => {
      isDragging = false
    }

    const setupInteractions = () => {
      if (!renderer) return

      renderer.domElement.addEventListener('mousedown', onMouseDown)
      renderer.domElement.addEventListener('mousemove', onMouseMove)
      renderer.domElement.addEventListener('mouseup', onMouseUp)
      renderer.domElement.addEventListener('wheel', onWheel)

      renderer.domElement.addEventListener('touchstart', onTouchStart, { passive: false })
      renderer.domElement.addEventListener('touchmove', onTouchMove, { passive: false })
      renderer.domElement.addEventListener('touchend', onTouchEnd)
    }

    const toggleTheme = () => {
      theme.value = theme.value === 'dark' ? 'light' : 'dark'
      updateTheme()
    }

    const updateTheme = () => {
      if (!scene) return
      
      if (theme.value === 'dark') {
        scene.background = new THREE.Color('#0a0a0a')
        if (globe) {
          globe.material.color = new THREE.Color('#1a1a1a')
        }
      } else {
        scene.background = new THREE.Color('#f5f5f5')
        if (globe) {
          globe.material.color = new THREE.Color('#ffffff')
        }
      }
      
      createPoints()
    }

    const createGlobe = () => {
      scene = new THREE.Scene()
      scene.background = new THREE.Color('#0a0a0a')

      const size = Math.round(window.innerHeight * 0.7)

      camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
      camera.position.z = 3

      renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true,
        powerPreference: "high-performance"
      })
      renderer.setSize(size, size)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      container.value.appendChild(renderer.domElement)

      const geometry = new THREE.SphereGeometry(1, 64, 64)
      const material = new THREE.MeshBasicMaterial({ 
        color: '#1a1a1a'
      })
      globe = new THREE.Mesh(geometry, material)
      scene.add(globe)

      createPoints()
      setupInteractions()
    }

    const disposeMesh = (mesh) => {
      if (!mesh) return
      scene.remove(mesh)
      if (mesh.geometry) mesh.geometry.dispose()
      if (mesh.material) {
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach(material => material.dispose())
        } else {
          mesh.material.dispose()
        }
      }
    }

    const createPoints = async () => {
      try {
        // Remove previous points
        if (landPointsMesh) disposeMesh(landPointsMesh)
        if (oceanPointsMesh) disposeMesh(oceanPointsMesh)
        if (cityPointsMesh) disposeMesh(cityPointsMesh)

        // ГАРАНТИРОВАННО создаем города
        const pointsData = await getPointsDataWithCities()
        createPointsFromData(pointsData)

      } catch (error) {
        console.error('Error creating points:', error)
        // Все равно создаем города
        const pointsData = generateDemoPointsWithCities()
        createPointsFromData(pointsData)
      }
    }

    const getPointsDataWithCities = async () => {
      try {
        const response = await fetch('/static/globe-points.json')
        if (!response.ok) throw new Error('Network error')
        const data = await response.json()
        
        // Проверяем есть ли города, если нет - добавляем
        const hasCities = data.points.some(point => point.type === 'city')
        if (!hasCities) {
          console.log('No cities found in JSON, adding cities...')
          const cities = generateCities()
          data.points = [...cities, ...data.points]
        }
        
        return data.points
      } catch (error) {
        console.log('Using demo cities data')
        return generateDemoPointsWithCities()
      }
    }

    const generateCities = () => {
      return [
        { type: 'city', name: "Tokyo", lat: 35.6762, lon: 139.6503, population: 37400000 },
        { type: 'city', name: "Delhi", lat: 28.6139, lon: 77.2090, population: 28514000 },
        { type: 'city', name: "Shanghai", lat: 31.2304, lon: 121.4737, population: 25582000 },
        { type: 'city', name: "São Paulo", lat: -23.5505, lon: -46.6333, population: 21650000 },
        { type: 'city', name: "Mexico City", lat: 19.4326, lon: -99.1332, population: 21581000 },
        { type: 'city', name: "New York", lat: 40.7128, lon: -74.0060, population: 18713220 },
        { type: 'city', name: "London", lat: 51.5074, lon: -0.1278, population: 9304000 },
        { type: 'city', name: "Paris", lat: 48.8566, lon: 2.3522, population: 11020000 },
        { type: 'city', name: "Moscow", lat: 55.7558, lon: 37.6173, population: 12111000 }
      ]
    }

    const generateDemoPointsWithCities = () => {
      const cities = generateCities()
      
      // Добавляем немного land и ocean точек для контекста
      const otherPoints = []
      for (let i = 0; i < 100; i++) {
        const lat = (Math.random() - 0.5) * 180
        const lon = (Math.random() - 0.5) * 360
        otherPoints.push({
          type: Math.random() > 0.7 ? 'ocean' : 'land',
          lat: lat,
          lon: lon
        })
      }
      
      return [...cities, ...otherPoints]
    }

    const createPointsFromData = (pointsData) => {
      const landPositions = []
      const landColors = []
      const oceanPositions = []
      const oceanColors = []
      const cityPositions = []
      const cityColors = []
      const citySizes = []

      pointsData.forEach(point => {
        const lon = point.lon
        const lat = point.lat
        
        // Инвертируем широту
        const invertedLat = -lat
        const invertedLon = -lon
        const latRad = lat * Math.PI / 180
        const lonRad = invertedLon * Math.PI / 180
        
        const x = Math.cos(latRad) * Math.cos(lonRad)
        const y = Math.sin(latRad)
        const z = Math.cos(latRad) * Math.sin(lonRad)
        
        if (point.type === 'city') {
          cityPositions.push(x, y, z)
          cityColors.push(1.0, 0.9, 0.3) // Яркий желтый
          const baseSize = 0.04 // Фиксированный размер для городов
          citySizes.push(baseSize)
        } else if (point.type === 'ocean') {
          oceanPositions.push(x, y, z)
          oceanColors.push(0.3, 0.4, 0.6) // Синий
        } else {
          landPositions.push(x, y, z)
          landColors.push(0.5, 0.5, 0.5) // Серый
        }
      })

      console.log(`Creating: ${landPositions.length/3} land, ${oceanPositions.length/3} ocean, ${cityPositions.length/3} city points`)

      // Create land points
      if (landPositions.length) {
        const landGeometry = new THREE.BufferGeometry()
        landGeometry.setAttribute('position', new THREE.Float32BufferAttribute(landPositions, 3))
        landGeometry.setAttribute('color', new THREE.Float32BufferAttribute(landColors, 3))
        const landMaterial = new THREE.PointsMaterial({
          size: 0.005,
          vertexColors: true,
          transparent: true,
          opacity: 0.9,
          sizeAttenuation: false
        })
        landPointsMesh = new THREE.Points(landGeometry, landMaterial)
        scene.add(landPointsMesh)
      }

      // Create ocean points
      if (oceanPositions.length) {
        const oceanGeometry = new THREE.BufferGeometry()
        oceanGeometry.setAttribute('position', new THREE.Float32BufferAttribute(oceanPositions, 3))
        oceanGeometry.setAttribute('color', new THREE.Float32BufferAttribute(oceanColors, 3))
        const oceanMaterial = new THREE.PointsMaterial({
          size: 0.004,
          vertexColors: true,
          transparent: true,
          opacity: 0.5,
          sizeAttenuation: false
        })
        oceanPointsMesh = new THREE.Points(oceanGeometry, oceanMaterial)
        scene.add(oceanPointsMesh)
      }

      // Create city points with glow effect
      if (cityPositions.length) {
        const cityGeometry = new THREE.BufferGeometry()
        cityGeometry.setAttribute('position', new THREE.Float32BufferAttribute(cityPositions, 3))
        cityGeometry.setAttribute('color', new THREE.Float32BufferAttribute(cityColors, 3))
        cityGeometry.setAttribute('size', new THREE.Float32BufferAttribute(citySizes, 1))
        
        const cityMaterial = new THREE.ShaderMaterial({
          uniforms: { time: { value: 0 } },
          vertexShader: `
            attribute float size;
            attribute vec3 color;
            varying vec3 vColor;
            void main() {
              vColor = color;
              vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
              gl_PointSize = size * (500.0 / -mvPosition.z);
              gl_Position = projectionMatrix * mvPosition;
            }
          `,
          fragmentShader: `
            varying vec3 vColor;
            void main() {
              vec2 coord = gl_PointCoord - vec2(0.5);
              float distance = length(coord);
              if (distance > 0.5) discard;
              float core = 1.0 - smoothstep(0.0, 0.1, distance);
              float glow = 1.0 - smoothstep(0.1, 0.8, distance);
              vec3 finalColor = vColor * (core * 2.0 + glow * 1.5);
              float alpha = (core * 1.5 + glow * 0.8);
              gl_FragColor = vec4(finalColor, alpha);
            }
          `,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          depthTest: false
        })
        
        cityPointsMesh = new THREE.Points(cityGeometry, cityMaterial)
        scene.add(cityPointsMesh)
      }
    }

    const updateRotation = () => {
      if (!isDragging) {
        velocityX *= friction
        velocityY *= friction
        
        if (Math.abs(velocityX) < 0.0005 && Math.abs(velocityY) < 0.0005) {
          velocityX += (autoRotationSpeed - velocityX) * returnToAutoSpeed
          velocityY += (0 - velocityY) * returnToAutoSpeed
        }
      }
      
      rotationY += velocityX
      rotationX += velocityY
      rotationX = Math.max(-Math.PI/2, Math.min(Math.PI/2, rotationX))
    }

    const animate = () => {
      updateRotation()
      
      if (cityPointsMesh && cityPointsMesh.material.uniforms) {
        cityPointsMesh.material.uniforms.time.value = performance.now() * 0.001
      }
      
      if (globe) globe.rotation.x = rotationX
      if (globe) globe.rotation.y = rotationY
      if (landPointsMesh) landPointsMesh.rotation.x = rotationX
      if (landPointsMesh) landPointsMesh.rotation.y = rotationY
      if (oceanPointsMesh) oceanPointsMesh.rotation.x = rotationX
      if (oceanPointsMesh) oceanPointsMesh.rotation.y = rotationY
      if (cityPointsMesh) cityPointsMesh.rotation.x = rotationX
      if (cityPointsMesh) cityPointsMesh.rotation.y = rotationY
      
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

    const cleanup = () => {
      if (animationId) cancelAnimationFrame(animationId)
      if (renderer) renderer.dispose()
      
      const meshes = [globe, landPointsMesh, oceanPointsMesh, cityPointsMesh]
      meshes.forEach(mesh => {
        if (mesh) {
          if (scene && mesh.parent) scene.remove(mesh)
          if (mesh.geometry) mesh.geometry.dispose()
          if (mesh.material) {
            if (Array.isArray(mesh.material)) {
              mesh.material.forEach(material => material.dispose())
            } else {
              mesh.material.dispose()
            }
          }
        }
      })
      
      window.removeEventListener('resize', handleResize)
    }

    onMounted(() => {
      createGlobe()
      animate()
      window.addEventListener('resize', handleResize)
    })

    onUnmounted(() => {
      cleanup()
    })

    return {
      container,
      theme,
      toggleTheme
    }
  }
}
</script>