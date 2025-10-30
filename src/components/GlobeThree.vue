<template>
  <div class="globe-container" :class="theme">
    <div class="controls-panel">
      <button @click="toggleTheme" class="theme-btn">
        {{ theme === 'dark' ? '☀️' : '🌙' }}
      </button>
      <button @click="toggleSettings" class="settings-btn">
        ⚙️
      </button>
      
      <div v-if="showSettings" class="settings-panel">
        <h3>Настройки визуализации</h3>
        
        <div class="settings-group">
          <h4>Океанские течения</h4>
          <div class="slider-container">
            <label>Количество частиц: {{ settings.oceanParticlesCount }}</label>
            <input 
              type="range" 
              min="500" 
              max="3000" 
              step="100"
              v-model="settings.oceanParticlesCount"
              @change="updateSettings"
            >
          </div>
          
          <div class="slider-container">
            <label>Скорость течений: {{ (settings.particleSpeed * 1000).toFixed(1) }}</label>
            <input 
              type="range" 
              min="0.1" 
              max="1.0" 
              step="0.1"
              :value="settings.particleSpeed * 1000"
              @input="settings.particleSpeed = $event.target.value / 1000; updateSettings()"
            >
          </div>
          
          <div class="slider-container">
            <label>Расстояние от суши: {{ (settings.minDistanceFromLand * 100).toFixed(1) }}%</label>
            <input 
              type="range" 
              min="1" 
              max="5" 
              step="0.5"
              :value="settings.minDistanceFromLand * 100"
              @input="settings.minDistanceFromLand = $event.target.value / 100; updateSettings()"
            >
          </div>
        </div>
        
        <div class="settings-group">
          <h4>Внешний вид</h4>
          <div class="slider-container">
            <label>Размер точек суши: {{ (settings.landPointSize * 100).toFixed(1) }}%</label>
            <input 
              type="range" 
              min="1" 
              max="3" 
              step="0.1"
              :value="settings.landPointSize * 100"
              @input="settings.landPointSize = $event.target.value / 100; updateSettings()"
            >
          </div>
          
          <div class="slider-container">
            <label>Размер городов: {{ (settings.citySize * 100).toFixed(1) }}%</label>
            <input 
              type="range" 
              min="50" 
              max="150" 
              step="10"
              :value="settings.citySize * 100"
              @input="settings.citySize = $event.target.value / 100; updateSettings()"
            >
          </div>
          
          <div class="slider-container">
            <label>Непрозрачность океана: {{ (settings.oceanOpacity * 100).toFixed(0) }}%</label>
            <input 
              type="range" 
              min="10" 
              max="100" 
              step="5"
              :value="settings.oceanOpacity * 100"
              @input="settings.oceanOpacity = $event.target.value / 100; updateSettings()"
            >
          </div>
        </div>
        
        <div class="settings-group">
          <h4>Анимация</h4>
          <div class="slider-container">
            <label>Скорость вращения: {{ settings.autoRotationSpeed.toFixed(1) }}</label>
            <input 
              type="range" 
              min="0.1" 
              max="10.0" 
              step="0.1"
              v-model="settings.autoRotationSpeed"
              @input="updateSettings"
            >
          </div>
          
          <div class="checkbox-container">
            <label>
              <input 
                type="checkbox" 
                v-model="settings.showOceanCurrents"
                @change="updateSettings"
              >
              Показывать течения
            </label>
          </div>
          
          <div class="checkbox-container">
            <label>
              <input 
                type="checkbox" 
                v-model="settings.showCities"
                @change="updateSettings"
              >
              Показывать города
            </label>
          </div>
          
          <div class="checkbox-container">
            <label>
              <input 
                type="checkbox" 
                v-model="settings.showLand"
                @change="updateSettings"
              >
              Показывать сушу
            </label>
          </div>
        </div>
        
        <div class="settings-actions">
          <button @click="resetSettings" class="reset-btn">Сбросить</button>
          <button @click="toggleSettings" class="close-btn">Закрыть</button>
        </div>
      </div>
    </div>
    
    <div class="globe-wrapper" ref="container"></div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, reactive } from 'vue'
import * as THREE from 'three'
import './globe/styles/globe.css'

export default {
  name: 'GlobeThree',
  setup() {
    const container = ref(null)
    const theme = ref('dark')
    const showSettings = ref(false)
    
    // Three.js variables
    let scene, camera, renderer, globe
    let animationId = null
    let isDragging = false
    let lastMouseX = 0, lastMouseY = 0
    let rotationX = 0, rotationY = 0
    let velocityX = 0, velocityY = 0
    
    // Data containers
    let landPoints = []
    let cityGroups = []
    let oceanParticles = []
    let landMesh = null
    let oceanMesh = null
    
    // Настройки по умолчанию
    const defaultSettings = {
      // Океанские течения
      oceanParticlesCount: 1500,
      particleSpeed: 0.0003,
      minDistanceFromLand: 0.02,
      chaosFactor: 0.8,
      
      // Внешний вид
      landPointSize: 1.0,
      citySize: 0.7, // 30% уменьшение от базового
      oceanOpacity: 0.7,
      
      // Анимация - скорость вращения 3.0 по умолчанию
      autoRotationSpeed: 3.0,
      showOceanCurrents: true,
      showCities: true,
      showLand: true
    }
    
    const settings = reactive({...defaultSettings})
    
    const constants = {
      friction: 0.95,
      returnToAutoSpeed: 0.02
    }

    // Event handlers
    const handlePointerStart = (x, y) => {
      isDragging = true
      lastMouseX = x
      lastMouseY = y
    }

    const handlePointerMove = (x, y) => {
      if (!isDragging) return
      velocityX = (x - lastMouseX) * 0.01
      velocityY = (y - lastMouseY) * 0.01
      lastMouseX = x
      lastMouseY = y
    }

    const handlePointerEnd = () => {
      isDragging = false
    }

    const setupInteractions = () => {
      if (!renderer?.domElement) return
      
      const canvas = renderer.domElement
      const events = [
        ['mousedown', (e) => handlePointerStart(e.clientX, e.clientY)],
        ['mousemove', (e) => handlePointerMove(e.clientX, e.clientY)],
        ['mouseup', handlePointerEnd],
        ['wheel', (e) => {
          const factor = e.deltaY > 0 ? 0.9 : 1.1
          velocityX *= factor
          velocityY *= factor
          e.preventDefault()
        }],
        ['touchstart', (e) => {
          if (e.touches.length === 1) {
            handlePointerStart(e.touches[0].clientX, e.touches[0].clientY)
          }
          e.preventDefault()
        }],
        ['touchmove', (e) => {
          if (e.touches.length === 1) {
            handlePointerMove(e.touches[0].clientX, e.touches[0].clientY)
          }
          e.preventDefault()
        }],
        ['touchend', handlePointerEnd]
      ]

      events.forEach(([event, handler]) => {
        canvas.addEventListener(event, handler)
      })
    }

    const toggleTheme = () => {
      theme.value = theme.value === 'dark' ? 'light' : 'dark'
      updateTheme()
    }

    const toggleSettings = () => {
      showSettings.value = !showSettings.value
    }

    const updateTheme = () => {
      if (!scene) return
      
      const colors = theme.value === 'dark' 
        ? { background: '#0a0a0a', globe: '#000000' }
        : { background: '#ffffff', globe: '#000000' }
      
      scene.background = new THREE.Color(colors.background)
      if (globe) globe.material.color = new THREE.Color(colors.globe)
    }

    const updateSettings = () => {
      // Обновляем видимость элементов
      if (landMesh) {
        landMesh.visible = settings.showLand
      }
      
      if (oceanMesh) {
        oceanMesh.visible = settings.showOceanCurrents
        if (oceanMesh.material) {
          oceanMesh.material.opacity = settings.oceanOpacity
        }
      }
      
      // Обновляем размеры точек
      if (landMesh && landMesh.material) {
        landMesh.material.size = 0.02 * settings.landPointSize
        landMesh.material.needsUpdate = true
      }
      
      // Обновляем города
      cityGroups.forEach(city => {
        if (city.group) {
          city.group.visible = settings.showCities
        }
        if (city.light) {
          const baseSize = 0.04 * settings.citySize
          city.light.geometry.dispose()
          city.light.geometry = new THREE.CircleGeometry(baseSize, 12)
        }
      })
      
      // Если изменилось количество частиц, пересоздаем океан
      if (settings.oceanParticlesCount !== oceanParticles.length && settings.showOceanCurrents) {
        recreateOceanParticles()
      }
    }

    const resetSettings = () => {
      Object.assign(settings, defaultSettings)
      updateSettings()
    }

    const loadPointsData = async () => {
      try {
        const response = await fetch('/static/globe-points.json')
        if (!response.ok) throw new Error('Network error')
        const data = await response.json()
        
        return {
          land: data.points.filter(point => point.type === 'land'),
          city: data.points.filter(point => point.type === 'city')
        }
      } catch (error) {
        console.error('Error loading points data:', error)
        return {
          land: generateFallbackLandPoints(),
          city: generateFallbackCityPoints()
        }
      }
    }

    const generateFallbackLandPoints = () => {
      const points = []
      const regions = [
        { latRange: [30, 70], lonRange: [-140, -50], count: 80 },
        { latRange: [35, 70], lonRange: [-10, 40], count: 70 },
        { latRange: [20, 70], lonRange: [40, 180], count: 100 },
        { latRange: [0, 35], lonRange: [-20, 50], count: 60 },
        { latRange: [-55, 15], lonRange: [-80, -35], count: 60 },
        { latRange: [-35, 0], lonRange: [-20, 50], count: 50 },
        { latRange: [-45, -10], lonRange: [110, 155], count: 40 }
      ]
      
      regions.forEach(region => {
        for (let i = 0; i < region.count; i++) {
          const lat = region.latRange[0] + Math.random() * (region.latRange[1] - region.latRange[0])
          const lon = region.lonRange[0] + Math.random() * (region.lonRange[1] - region.lonRange[0])
          points.push({ type: 'land', lat, lon })
        }
      })
      
      return points
    }

    const generateFallbackCityPoints = () => [
      { type: 'city', name: "Tokyo", lat: 35.6762, lon: 139.6503 },
      { type: 'city', name: "New York", lat: 40.7128, lon: -74.0060 },
      { type: 'city', name: "London", lat: 51.5074, lon: -0.1278 },
      { type: 'city', name: "Moscow", lat: 55.7558, lon: 37.6173 },
      { type: 'city', name: "Paris", lat: 48.8566, lon: 2.3522 },
      { type: 'city', name: "Beijing", lat: 39.9042, lon: 116.4074 },
      { type: 'city', name: "Sydney", lat: -33.8688, lon: 151.2093 },
      { type: 'city', name: "Rio de Janeiro", lat: -22.9068, lon: -43.1729 }
    ]

    const createGlobe = async () => {
      const pointsData = await loadPointsData()
      
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
      
      if (container.value) {
        container.value.appendChild(renderer.domElement)
      }

      globe = new THREE.Mesh(
        new THREE.SphereGeometry(1, 64, 64),
        new THREE.MeshBasicMaterial({ color: 0x000000 })
      )
      scene.add(globe)

      createLandPoints(pointsData.land)
      createCities(pointsData.city)
      createOceanParticles(pointsData.land)
      setupInteractions()
    }

    const latLonToXYZ = (lat, lon, radius = 1) => {
      const latRad = lat * Math.PI / 180
      const lonRad = -lon * Math.PI / 180
      return new THREE.Vector3(
        Math.cos(latRad) * Math.cos(lonRad) * radius,
        Math.sin(latRad) * radius,
        Math.cos(latRad) * Math.sin(lonRad) * radius
      )
    }

    const createLandPoints = (landData) => {
      if (landData.length === 0) return
      
      const positions = new Float32Array(landData.length * 3)
      const colors = new Float32Array(landData.length * 3)
      
      landData.forEach((point, i) => {
        const pos = latLonToXYZ(point.lat, point.lon)
        positions[i * 3] = pos.x
        positions[i * 3 + 1] = pos.y
        positions[i * 3 + 2] = pos.z
        
        const brightness = 0.7 + Math.random() * 0.3
        colors[i * 3] = brightness
        colors[i * 3 + 1] = brightness
        colors[i * 3 + 2] = brightness
        
        landPoints.push(pos)
      })
      
      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
      
      const material = new THREE.PointsMaterial({
        size: 0.02 * settings.landPointSize,
        vertexColors: true,
        transparent: true,
        opacity: 0.9
      })
      
      landMesh = new THREE.Points(geometry, material)
      landMesh.visible = settings.showLand
      scene.add(landMesh)
    }

    const createCities = (cityData) => {
      cityGroups = []
      
      cityData.forEach((city, index) => {
        const position = latLonToXYZ(city.lat, city.lon, 1.01)
        
        const cityGroup = new THREE.Group()
        cityGroup.position.copy(position)
        cityGroup.visible = settings.showCities
        
        const direction = position.clone().negate().normalize()
        cityGroup.lookAt(direction)
        
        const lightSize = (0.04 + (index < 3 ? 0.02 : 0)) * settings.citySize
        const lightGeometry = new THREE.CircleGeometry(lightSize, 12)
        const lightMaterial = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.7,
          side: THREE.DoubleSide
        })
        
        const lightMesh = new THREE.Mesh(lightGeometry, lightMaterial)
        lightMesh.position.z = 0.005
        
        const pointGeometry = new THREE.BufferGeometry()
        pointGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array([0, 0, 0.01]), 3))
        pointGeometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array([1, 1, 1]), 3))
        
        const pointMaterial = new THREE.PointsMaterial({
          size: 0.025,
          vertexColors: true,
          transparent: true,
          opacity: 0.9
        })
        
        const cityPoint = new THREE.Points(pointGeometry, pointMaterial)
        
        cityGroup.add(lightMesh)
        cityGroup.add(cityPoint)
        scene.add(cityGroup)
        
        cityGroups.push({
          group: cityGroup,
          light: lightMesh,
          data: city
        })
      })
    }

    const getMinDistanceToLand = (position) => {
      let minDistance = Infinity
      for (const landPoint of landPoints) {
        const distance = position.distanceTo(landPoint)
        if (distance < minDistance) minDistance = distance
      }
      return minDistance
    }

    const createOceanParticles = (landData) => {
      oceanParticles = []
      
      const positions = new Float32Array(settings.oceanParticlesCount * 3)
      const colors = new Float32Array(settings.oceanParticlesCount * 3)
      
      let created = 0
      const gridSize = Math.ceil(Math.sqrt(settings.oceanParticlesCount * 0.6))
      
      // Равномерное распределение
      for (let i = 0; i < gridSize && created < settings.oceanParticlesCount * 0.6; i++) {
        for (let j = 0; j < gridSize && created < settings.oceanParticlesCount * 0.6; j++) {
          const u = (i + 0.5) / gridSize
          const v = (j + 0.5) / gridSize
          
          const theta = Math.acos(2 * u - 1)
          const phi = 2 * Math.PI * v
          
          const position = new THREE.Vector3(
            Math.sin(theta) * Math.cos(phi),
            Math.cos(theta),
            Math.sin(theta) * Math.sin(phi)
          )
          
          const distanceToLand = getMinDistanceToLand(position)
          if (distanceToLand >= settings.minDistanceFromLand) {
            positions[created * 3] = position.x
            positions[created * 3 + 1] = position.y
            positions[created * 3 + 2] = position.z
            
            const brightness = 0.4 + Math.random() * 0.4
            colors[created * 3] = brightness
            colors[created * 3 + 1] = brightness
            colors[created * 3 + 2] = brightness
            
            oceanParticles.push({
              position: position.clone(),
              velocity: new THREE.Vector3()
            })
            
            created++
          }
        }
      }
      
      // Хаотичное распределение
      for (let i = created; i < settings.oceanParticlesCount; i++) {
        const theta = Math.acos(2 * Math.random() - 1)
        const phi = 2 * Math.PI * Math.random()
        
        const position = new THREE.Vector3(
          Math.sin(theta) * Math.cos(phi),
          Math.cos(theta),
          Math.sin(theta) * Math.sin(phi)
        )
        
        const chaos = new THREE.Vector3(
          (Math.random() - 0.5) * settings.chaosFactor * 0.1,
          (Math.random() - 0.5) * settings.chaosFactor * 0.1,
          (Math.random() - 0.5) * settings.chaosFactor * 0.1
        )
        position.add(chaos).normalize()
        
        const distanceToLand = getMinDistanceToLand(position)
        if (distanceToLand >= settings.minDistanceFromLand) {
          positions[i * 3] = position.x
          positions[i * 3 + 1] = position.y
          positions[i * 3 + 2] = position.z
          
          const brightness = 0.3 + Math.random() * 0.5
          colors[i * 3] = brightness
          colors[i * 3 + 1] = brightness
          colors[i * 3 + 2] = brightness
          
          oceanParticles.push({
            position: position.clone(),
            velocity: new THREE.Vector3()
          })
        }
      }
      
      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
      
      const material = new THREE.PointsMaterial({
        size: 0.01,
        vertexColors: true,
        transparent: true,
        opacity: settings.oceanOpacity
      })
      
      oceanMesh = new THREE.Points(geometry, material)
      oceanMesh.visible = settings.showOceanCurrents
      scene.add(oceanMesh)
      
      oceanParticles.mesh = oceanMesh
    }

    const recreateOceanParticles = () => {
      if (oceanMesh) {
        scene.remove(oceanMesh)
        oceanMesh.geometry.dispose()
        oceanMesh.material.dispose()
      }
      createOceanParticles([])
    }

    const getOceanCurrent = (position, time) => {
      const normalizedPos = position.clone().normalize()
      const lat = Math.asin(normalizedPos.y)
      const lon = Math.atan2(normalizedPos.z, normalizedPos.x)
      
      const distanceToLand = getMinDistanceToLand(position)
      if (distanceToLand < settings.minDistanceFromLand * 1.5) {
        let repelForce = new THREE.Vector3()
        for (const landPoint of landPoints) {
          const toLand = position.clone().sub(landPoint)
          const distance = toLand.length()
          if (distance < settings.minDistanceFromLand * 2) {
            const force = (settings.minDistanceFromLand * 2 - distance) / (settings.minDistanceFromLand * 2)
            repelForce.add(toLand.normalize().multiplyScalar(force * 0.1))
          }
        }
        return repelForce
      }
      
      let velocity = new THREE.Vector3()
      
      if (Math.abs(lat) < 0.4) {
        velocity.x = -Math.sin(lon) * 1.5
        velocity.z = Math.cos(lon) * 1.5
      } else if (Math.abs(lat) > 0.6 && Math.abs(lat) < 1.1) {
        const direction = lat > 0 ? 1 : -1
        const angle = lon + time * 0.05 * direction
        velocity.x = -Math.sin(angle) * 0.8
        velocity.z = Math.cos(angle) * 0.8
      }
      
      const turbulence = new THREE.Vector3(
        Math.sin(position.x * 8 + time) * 0.2,
        Math.sin(position.y * 6 + time * 0.8) * 0.1,
        Math.sin(position.z * 10 + time * 1.2) * 0.2
      )
      
      velocity.add(turbulence)
      
      const tangent = velocity.clone()
      const radial = normalizedPos.clone().multiplyScalar(tangent.dot(normalizedPos))
      tangent.sub(radial)
      
      return tangent.normalize().multiplyScalar(settings.particleSpeed)
    }

    const updateOceanParticles = (time) => {
      if (!oceanParticles.mesh || !settings.showOceanCurrents) return
      
      const positions = oceanParticles.mesh.geometry.attributes.position.array
      
      for (let i = 0; i < oceanParticles.length; i++) {
        const particle = oceanParticles[i]
        const current = getOceanCurrent(particle.position, time)
        particle.velocity.lerp(current, 0.05)
        particle.position.add(particle.velocity)
        particle.position.normalize()
        
        positions[i * 3] = particle.position.x
        positions[i * 3 + 1] = particle.position.y
        positions[i * 3 + 2] = particle.position.z
      }
      
      oceanParticles.mesh.geometry.attributes.position.needsUpdate = true
    }

    const updateCityLights = (time) => {
      if (!settings.showCities) return
      
      cityGroups.forEach((city, index) => {
        if (city.light) {
          city.light.material.opacity = 0.5 + 0.3 * Math.sin(time * 1.5 + index)
        }
      })
    }

    const updateRotation = () => {
      if (!isDragging) {
        velocityX *= constants.friction
        velocityY *= constants.friction
        if (Math.abs(velocityX) < 0.0001 && Math.abs(velocityY) < 0.0001) {
          // Применяем скорость вращения из настроек ко всем объектам
          velocityX += (settings.autoRotationSpeed - velocityX) * constants.returnToAutoSpeed
        }
      }
      rotationY += velocityX
      rotationX += velocityY
      rotationX = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, rotationX))
    }

    const animate = (time) => {
      if (!renderer || !scene || !camera) {
        animationId = requestAnimationFrame(animate)
        return
      }
      
      updateRotation()
      const currentTime = time * 0.001

      updateOceanParticles(currentTime)
      updateCityLights(currentTime)

      // Вращаем всю сцену целиком с примененной скоростью вращения
      scene.rotation.set(rotationX, rotationY, 0)
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
      renderer?.dispose()
      window.removeEventListener('resize', handleResize)
    }

    onMounted(() => {
      createGlobe().then(() => {
        animate(0)
        window.addEventListener('resize', handleResize)
      }).catch(error => {
        console.error('Error initializing globe:', error)
      })
    })

    onUnmounted(cleanup)

    return { 
      container, 
      theme, 
      showSettings,
      settings,
      toggleTheme, 
      toggleSettings,
      updateSettings,
      resetSettings
    }
  }
}
</script>

<style scoped>
.controls-panel {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.theme-btn, .settings-btn {
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  cursor: pointer;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.theme-btn:hover, .settings-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

.settings-panel {
  position: fixed;
  top: 70px;
  right: 0;
  width: 320px;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(20px);
  border-radius: 15px;
  padding: 20px;
  color: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.settings-panel h3 {
  margin: 0 0 20px 0;
  text-align: center;
  font-size: 18px;
}

.settings-panel h4 {
  margin: 15px 0 10px 0;
  font-size: 14px;
  color: #ccc;
}

.settings-group {
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.slider-container {
  margin-bottom: 15px;
}

.slider-container label {
  display: block;
  margin-bottom: 5px;
  font-size: 12px;
  color: #aaa;
}

.slider-container input {
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.2);
  outline: none;
  -webkit-appearance: none;
}

.slider-container input::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #fff;
  cursor: pointer;
}

.checkbox-container {
  margin-bottom: 10px;
}

.checkbox-container label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  cursor: pointer;
}

.checkbox-container input {
  margin: 0;
}

.settings-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.reset-btn, .close-btn {
  flex: 1;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.3s ease;
}

.reset-btn {
  background: rgba(255, 100, 100, 0.3);
  color: #ff6b6b;
}

.reset-btn:hover {
  background: rgba(255, 100, 100, 0.5);
}

.close-btn {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

@media (max-width: 768px) {
  .settings-panel {
    width: 280px;
    right: -10px;
  }
  
  .controls-panel {
    right: 10px;
    top: 10px;
  }
}
</style>