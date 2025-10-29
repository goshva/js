<template>
  <div class="globe-container">
    <div class="controls">
      <select v-model="selectedGlobe" @change="loadGlobeData">
        <option value="">— Select Globe —</option>
        <option v-for="globe in availableGlobes" :key="globe.path" :value="globe.path">
          {{ globe.name }}
        </option>
      </select>
      
      <label>
        <input type="checkbox" v-model="showBackHemisphere" />
        Show Back Hemisphere
      </label>
      
      <button @click="exportSVG" class="export-btn">Export SVG</button>
      <button @click="exportJSON" class="export-btn">Export JSON</button>
    </div>
    <div class="globe-wrapper">
      <canvas 
        ref="canvas"
        :width="canvasSize"
        :height="canvasSize"
        @mousedown="onMouseDown"
        @mousemove="onMouseMove"
        @mouseup="onMouseUp"
        @mouseleave="onMouseLeave"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
      ></canvas>
    </div>
  </div>
</template>

<script>
import { onMounted, onUnmounted, ref, reactive } from 'vue'

export default {
  name: 'InteractiveGlobe',
  setup() {
    // Refs
    const canvas = ref(null)
    const ctx = ref(null)
    const canvasSize = ref(800)
    
    // State
    const selectedGlobe = ref('')
    const showBackHemisphere = ref(true)
    const availableGlobes = ref([])
    
    // Globe data
    const globeData = reactive({
      points: [],
      projection: null,
      rotation: [0, 0, 0],
      isDragging: false,
      lastMousePos: { x: 0, y: 0 },
      animationId: null
    })
    // Projection functions (simplified)
    const createProjection = () => {
      return {
        scale: 360,
        translate: [canvasSize.value / 2, canvasSize.value / 2],
        rotate: [0, 0, 0],
        clipAngle: null
      }
    }
    const projectPoint = (lon, lat, projection) => {
      // Simplified projection - in real implementation use proper geographic projection
      const scale = projection.scale
      const [translateX, translateY] = projection.translate
      const [rotateX, rotateY] = projection.rotate
      
      const x = (lon + rotateX) * scale / 360 + translateX
      const y = (lat + rotateY) * scale / 180 + translateY
      
      return [x, y]
    }
    // Load globe data
    const loadGlobeData = async () => {
      if (!selectedGlobe.value) return
      
      try {
        const response = await fetch(selectedGlobe.value)
        const data = await response.json()
        
        globeData.points = data.points.map(point => ({
          ...point,
          offsetX: 0,
          offsetY: 0,
          randomPhase: point.randomPhase || Math.random() * Math.PI * 2
        }))
        
        globeData.projection = createProjection()
        startAnimation()
      } catch (error) {
        console.error('Error loading globe data:', error)
      }
    }
    // Animation loop
    const startAnimation = () => {
      const animate = () => {
        if (!ctx.value || !globeData.projection) return
        
        renderGlobe()
        globeData.animationId = requestAnimationFrame(animate)
      }
      animate()
    }
    const renderGlobe = () => {
      const { ctx: context, canvas: canvasEl } = getCanvasContext()
      if (!context || !canvasEl) return
      
      // Clear canvas
      context.clearRect(0, 0, canvasEl.width, canvasEl.height)
      
      // Draw background
      context.fillStyle = '#001220'
      context.fillRect(0, 0, canvasEl.width, canvasEl.height)
      
      // Draw globe base (simplified circle)
      context.fillStyle = '#fff'
      context.beginPath()
      context.arc(
        canvasEl.width / 2,
        canvasEl.height / 2,
        globeData.projection.scale / 2,
        0,
        Math.PI * 2
      )
      context.fill()
      
      // Draw points
      globeData.points.forEach(point => {
        const [x, y] = projectPoint(
          point.lon,
          point.lat,
          globeData.projection
        )
        
        // Simple visibility check
        const isVisible = true // Implement proper visibility logic
        
        if (!isVisible && !showBackHemisphere.value) return
        
        const size = 1.5
        const opacity = isVisible ? 1 : 0.3
        const color = point.type === 'land' ? '#000' : '#00000025'
        
        context.globalAlpha = opacity
        context.fillStyle = color
        context.beginPath()
        context.arc(
          x + point.offsetX,
          y + point.offsetY,
          size,
          0,
          Math.PI * 2
        )
        context.fill()
        
        // Gradually reset offsets
        point.offsetX *= 0.98
        point.offsetY *= 0.98
      })
      
      context.globalAlpha = 1
    }
    // Mouse/touch handlers
    const onMouseDown = (event) => {
      globeData.isDragging = true
      const rect = canvas.value.getBoundingClientRect()
      globeData.lastMousePos = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      }
    }
    const onMouseMove = (event) => {
      if (!globeData.isDragging || !globeData.projection) return
      
      const rect = canvas.value.getBoundingClientRect()
      const currentX = event.clientX - rect.left
      const currentY = event.clientY - rect.top
      
      const deltaX = currentX - globeData.lastMousePos.x
      const deltaY = currentY - globeData.lastMousePos.y
      
      // Update rotation
      globeData.projection.rotate[0] += deltaX * 0.5
      globeData.projection.rotate[1] -= deltaY * 0.5
      
      globeData.lastMousePos = { x: currentX, y: currentY }
    }
    const onMouseUp = () => {
      globeData.isDragging = false
    }
    const onMouseLeave = () => {
      globeData.isDragging = false
    }
    const onTouchStart = (event) => {
      event.preventDefault()
      if (event.touches.length === 1) {
        globeData.isDragging = true
        const rect = canvas.value.getBoundingClientRect()
        globeData.lastMousePos = {
          x: event.touches[0].clientX - rect.left,
          y: event.touches[0].clientY - rect.top
        }
      }
    }
    const onTouchMove = (event) => {
      event.preventDefault()
      if (globeData.isDragging && event.touches.length === 1) {
        const rect = canvas.value.getBoundingClientRect()
        const currentX = event.touches[0].clientX - rect.left
        const currentY = event.touches[0].clientY - rect.top
        
        const deltaX = currentX - globeData.lastMousePos.x
        const deltaY = currentY - globeData.lastMousePos.y
        
        globeData.projection.rotate[0] += deltaX * 0.8
        globeData.projection.rotate[1] -= deltaY * 0.8
        
        globeData.lastMousePos = { x: currentX, y: currentY }
      }
    }
    const onTouchEnd = () => {
      globeData.isDragging = false
    }
    // Export functions
    const exportSVG = () => {
      // Implement SVG export logic
      console.log('Export SVG functionality')
    }
    const exportJSON = () => {
      // Implement JSON export logic
      console.log('Export JSON functionality')
    }
    // Utility functions
    const getCanvasContext = () => {
      if (!canvas.value) return { ctx: null, canvas: null }
      
      const context = canvas.value.getContext('2d')
      return { ctx: context, canvas: canvas.value }
    }
    const loadAvailableGlobes = async () => {
      try {
        const response = await fetch('/data/globes/index.json')
        availableGlobes.value = await response.json()
      } catch (error) {
        console.error('Error loading globe list:', error)
      }
    }
    // Lifecycle
    onMounted(() => {
      ctx.value = canvas.value?.getContext('2d')
      loadAvailableGlobes()
    })
    onUnmounted(() => {
      if (globeData.animationId) {
        cancelAnimationFrame(globeData.animationId)
      }
    })
    return {
      canvas,
      canvasSize,
      selectedGlobe,
      showBackHemisphere,
      availableGlobes,
      loadGlobeData,
      onMouseDown,
      onMouseMove,
      onMouseUp,
      onMouseLeave,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      exportSVG,
      exportJSON
    }
  }
}
</script>

<style scoped>
.globe-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: #1a202c;
  color: white;
  min-height: 100vh;
}
.controls {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.controls select,
.controls button {
  padding: 8px 16px;
  border: 1px solid #4a5568;
  border-radius: 6px;
  background: #2d3748;
  color: white;
  cursor: pointer;
}
.controls button:hover {
  background: #4a5568;
}
.controls label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}
.globe-wrapper {
  border: 2px solid #4a5568;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}
canvas {
  display: block;
  cursor: grab;
  touch-action: none;
}
canvas:active {
  cursor: grabbing;
}
.export-btn {
  background: #3182ce !important;
  border-color: #3182ce !important;
}
.export-btn:hover {
  background: #2c5aa0 !important;
}
@media (max-width: 768px) {
  .controls {
    flex-direction: column;
    align-items: stretch;
  }
  
  .canvas-size {
    width: 100%;
    max-width: 400px;
    height: auto;
  }
}
</style>




