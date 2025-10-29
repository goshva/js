<template>
  <div class="globe-container">
    <GlobeControls
      v-model:selectedGlobe="selectedGlobe"
      v-model:showBackHemisphere="showBackHemisphere"
      :availableGlobes="availableGlobes"
      @load="loadGlobeData"
      @export-svg="exportSVG"
      @export-json="exportJSON"
    />

    <div class="globe-wrapper">
      <svg
        ref="svgEl"
        :width="canvasSize"
        :height="canvasSize"
        @mousedown="onMouseDown"
        @mousemove="onMouseMove"
        @mouseup="onMouseUp"
        @mouseleave="onMouseLeave"
        @click="onClick"
        @touchstart.prevent="onTouchStart"
        @touchmove.prevent="onTouchMove"
        @touchend="onTouchEnd"
      >
        <!-- background -->
        <rect :width="canvasSize" :height="canvasSize" fill="#001220" />

        <!-- sphere -->
        <circle
          :cx="center"
          :cy="center"
          :r="radius"
          fill="#fff"
        />

        <!-- points -->
        <g>
          <GlobePoint
            v-for="(p, idx) in projectedPoints"
            :key="idx"
            :x="p.x"
            :y="p.y"
            :visible="p.visible || showBackHemisphere"
            :type="p.type"
            :size="1.5"
          />
        </g>
      </svg>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, onUnmounted, computed } from 'vue'
import GlobeControls from './GlobeControls.vue'
import GlobePoint from './GlobePoint.vue'

export default {
  name: 'GlobeSvg',
  components: { GlobeControls, GlobePoint },
  setup() {
    const svgEl = ref(null)
    const canvasSize = ref(800)
    const center = computed(() => canvasSize.value / 2)
    const radius = computed(() => projection.value.scale / 2)

    const selectedGlobe = ref('')
    const showBackHemisphere = ref(true)
    const availableGlobes = ref([])

    const state = reactive({
      isDragging: false,
      lastMousePos: { x: 0, y: 0 },
      animationId: null,
      dragMoved: false
    })

    const projection = ref({
      scale: 360,
      translate: [canvasSize.value / 2, canvasSize.value / 2],
      rotate: [0, 0, 0]
    })

    const points = ref([])

    const toRadians = (deg) => deg * Math.PI / 180
    const toDegrees = (rad) => rad * 180 / Math.PI

    const createProjection = () => ({
      scale: 360,
      translate: [canvasSize.value / 2, canvasSize.value / 2],
      rotate: [...projection.value.rotate]
    })

    const projectPoint = (lon, lat) => {
      const proj = projection.value
      const [tx, ty] = proj.translate
      const [rotLon, rotLat] = proj.rotate
      const x = (lon + rotLon) * proj.scale / 360 + tx
      const y = (lat + rotLat) * proj.scale / 180 + ty
      return [x, y]
    }

    // visibility: point is on front hemisphere if angle between
    // rotated center and point <= 90 degrees. Approx with longitudes.
    const isFrontHemisphere = (lon) => {
      const [rotLon] = projection.value.rotate
      let d = ((lon + rotLon + 540) % 360) - 180 // [-180, 180]
      return Math.abs(d) <= 90
    }

    const projectedPoints = computed(() => {
      return points.value.map(p => {
        const [x, y] = projectPoint(p.lon, p.lat)
        const visible = isFrontHemisphere(p.lon)
        return { ...p, x, y, visible }
      })
    })

    const loadGlobeData = async () => {
      if (!selectedGlobe.value) return
      try {
        const res = await fetch(selectedGlobe.value)
        const data = await res.json()
        points.value = data.points || []
        projection.value = createProjection()
        startAnimation()
      } catch (e) {
        console.error('Error loading globe data:', e)
      }
    }

    const loadAvailableGlobes = async () => {
      try {
        const res = await fetch('/data/globes/index.json')
        availableGlobes.value = await res.json()
      } catch (e) {
        console.error('Error loading globe list:', e)
      }
    }

    const startAnimation = () => {
      let lastTime = performance.now()
      const tick = () => {
        const now = performance.now()
        const dt = Math.max(0.001, (now - lastTime) / 1000)
        lastTime = now
        // Update rotation from angular velocity (deg/sec)
        if (!state.isDragging) {
          projection.value.rotate[0] += angularVelocity.lon * dt
          projection.value.rotate[1] += angularVelocity.lat * dt
          // friction
          const f = Math.pow(frictionPerSecond, dt)
          angularVelocity.lon *= f
          angularVelocity.lat *= f
        }
        // Clamp latitude tilt to avoid flipping
        projection.value.rotate[1] = Math.max(-80, Math.min(80, projection.value.rotate[1]))
        state.animationId = requestAnimationFrame(tick)
      }
      if (!state.animationId) tick()
    }

    // interactions
    // inertial spin state
    const angularVelocity = reactive({ lon: 0, lat: 0 }) // deg/sec
    const dragGainMouse = 60 * 0.5 // px -> deg/sec scale
    const dragGainTouch = 60 * 0.8
    const frictionPerSecond = 0.92 // higher -> longer spin

    const onMouseDown = (e) => {
      state.isDragging = true
      const rect = svgEl.value.getBoundingClientRect()
      state.lastMousePos = { x: e.clientX - rect.left, y: e.clientY - rect.top }
      state.dragMoved = false
    }
    const onMouseMove = (e) => {
      if (!state.isDragging) return
      const rect = svgEl.value.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const dx = x - state.lastMousePos.x
      const dy = y - state.lastMousePos.y
      projection.value.rotate[0] += dx * 0.5
      projection.value.rotate[1] -= dy * 0.5
      // set spin based on drag direction/speed
      angularVelocity.lon = dx * dragGainMouse
      angularVelocity.lat = -dy * dragGainMouse
      state.lastMousePos = { x, y }
      if (Math.abs(dx) + Math.abs(dy) > 2) state.dragMoved = true
    }
    const onMouseUp = () => { state.isDragging = false }
    const onMouseLeave = () => { state.isDragging = false }

    const onTouchStart = (e) => {
      if (e.touches.length !== 1) return
      state.isDragging = true
      const rect = svgEl.value.getBoundingClientRect()
      state.lastMousePos = { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top }
      state.dragMoved = false
    }
    const onTouchMove = (e) => {
      if (!state.isDragging || e.touches.length !== 1) return
      const rect = svgEl.value.getBoundingClientRect()
      const x = e.touches[0].clientX - rect.left
      const y = e.touches[0].clientY - rect.top
      const dx = x - state.lastMousePos.x
      const dy = y - state.lastMousePos.y
      projection.value.rotate[0] += dx * 0.8
      projection.value.rotate[1] -= dy * 0.8
      angularVelocity.lon = dx * dragGainTouch
      angularVelocity.lat = -dy * dragGainTouch
      state.lastMousePos = { x, y }
      if (Math.abs(dx) + Math.abs(dy) > 2) state.dragMoved = true
    }
    const onTouchEnd = () => { state.isDragging = false }

    const onClick = () => {
      // If not a drag, start/boost default spin
      if (state.dragMoved) return
      if (Math.abs(angularVelocity.lon) < 5 && Math.abs(angularVelocity.lat) < 5) {
        angularVelocity.lon = 40 // default gentle spin
        angularVelocity.lat = 0
      } else {
        // boost existing
        angularVelocity.lon *= 1.2
        angularVelocity.lat *= 1.2
      }
    }

    const exportSVG = () => {
      const svg = svgEl.value
      const serializer = new XMLSerializer()
      const source = serializer.serializeToString(svg)
      const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'globe.svg'
      a.click()
      URL.revokeObjectURL(url)
    }
    const exportJSON = () => {
      const data = JSON.stringify({ points: points.value }, null, 2)
      const blob = new Blob([data], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'globe.json'
      a.click()
      URL.revokeObjectURL(url)
    }

    onMounted(() => { loadAvailableGlobes() })
    onUnmounted(() => { if (state.animationId) cancelAnimationFrame(state.animationId) })

    return {
      svgEl,
      canvasSize,
      center,
      radius,
      selectedGlobe,
      showBackHemisphere,
      availableGlobes,
      projectedPoints,
      loadGlobeData,
      exportSVG,
      exportJSON,
      onMouseDown,
      onMouseMove,
      onMouseUp,
      onMouseLeave,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      onClick
    }
  }
}
</script>

<style scoped>
.globe-container { display: flex; flex-direction: column; align-items: center; padding: 20px; background: #1a202c; color: white; min-height: 100vh; }
.globe-wrapper { border: 2px solid #4a5568; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3); }
svg { display: block; cursor: grab; touch-action: none; }
svg:active { cursor: grabbing; }
</style>


