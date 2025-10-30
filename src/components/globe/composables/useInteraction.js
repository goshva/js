import { ref } from 'vue'

export function useInteraction(rotationX, rotationY) {
  const isDragging = ref(false)
  let lastMouseX = 0, lastMouseY = 0
  let velocityX = 0, velocityY = 0
  const friction = 0.95
  const autoRotationSpeed = 0.001
  const returnToAutoSpeed = 0.02

  // Mouse event handlers
  const onMouseDown = (event) => {
    isDragging.value = true
    lastMouseX = event.clientX
    lastMouseY = event.clientY
    event.preventDefault()
  }

  const onMouseMove = (event) => {
    if (!isDragging.value) return
    
    const deltaX = event.clientX - lastMouseX
    const deltaY = event.clientY - lastMouseY
    
    velocityX = deltaX * 0.01
    velocityY = deltaY * 0.01
    
    lastMouseX = event.clientX
    lastMouseY = event.clientY
    event.preventDefault()
  }

  const onMouseUp = () => {
    isDragging.value = false
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
      isDragging.value = true
      lastMouseX = event.touches[0].clientX
      lastMouseY = event.touches[0].clientY
    }
    event.preventDefault()
  }

  const onTouchMove = (event) => {
    if (!isDragging.value || event.touches.length !== 1) return
    
    const deltaX = event.touches[0].clientX - lastMouseX
    const deltaY = event.touches[0].clientY - lastMouseY
    
    velocityX = deltaX * 0.01
    velocityY = deltaY * 0.01
    
    lastMouseX = event.touches[0].clientX
    lastMouseY = event.touches[0].clientY
    event.preventDefault()
  }

  const onTouchEnd = () => {
    isDragging.value = false
  }

  const setupInteractions = (renderer) => {
    if (!renderer) return

    renderer.domElement.addEventListener('mousedown', onMouseDown)
    renderer.domElement.addEventListener('mousemove', onMouseMove)
    renderer.domElement.addEventListener('mouseup', onMouseUp)
    renderer.domElement.addEventListener('wheel', onWheel)

    renderer.domElement.addEventListener('touchstart', onTouchStart, { passive: false })
    renderer.domElement.addEventListener('touchmove', onTouchMove, { passive: false })
    renderer.domElement.addEventListener('touchend', onTouchEnd)
  }

  const updateRotation = () => {
    if (!isDragging.value) {
      // Apply friction
      velocityX *= friction
      velocityY *= friction
      
      // Gradually return to auto-rotation if velocities are very small
      if (Math.abs(velocityX) < 0.0005 && Math.abs(velocityY) < 0.0005) {
        velocityX += (autoRotationSpeed - velocityX) * returnToAutoSpeed
        velocityY += (0 - velocityY) * returnToAutoSpeed
      }
    }
    
    rotationY.value += velocityX
    rotationX.value += velocityY
    
    // Limit vertical rotation to avoid flipping
    rotationX.value = Math.max(-Math.PI/2, Math.min(Math.PI/2, rotationX.value))
  }

  return {
    setupInteractions,
    updateRotation,
    isDragging,
    velocityX,
    velocityY
  }
}