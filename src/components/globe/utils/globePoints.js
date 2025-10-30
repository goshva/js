import * as THREE from 'three'

export const createPoints = async (scene, theme, landPointsMesh, oceanPointsMesh, disposeMesh) => {
  try {
    const response = await fetch('/static/globe-points.json')
    const data = await response.json()
    
    // Remove previous points
    if (landPointsMesh) disposeMesh(landPointsMesh)
    if (oceanPointsMesh) disposeMesh(oceanPointsMesh)

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
      
      const px = x, py = y,  pz = z
      if (point.type === 'ocean') {
        oceanPositions.push(px, py, pz)
        oceanColors.push(0.1, 0.1, 0.1)
      } else {
        landPositions.push(px, py, pz)
        if (theme.value === 'dark') {
          landColors.push(1, 1, 1) // White for dark theme
        } else {
          landColors.push(0, 0, 0) // Black for light theme
        }
      }
    })

    if (landPositions.length) {
      const landGeometry = new THREE.BufferGeometry()
      landGeometry.setAttribute('position', new THREE.Float32BufferAttribute(landPositions, 3))
      landGeometry.setAttribute('color', new THREE.Float32BufferAttribute(landColors, 3))
      const landMaterial = new THREE.PointsMaterial({
        size: 0.002,
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

    return { landPointsMesh, oceanPointsMesh }
  } catch (error) {
    console.error('Error loading points:', error)
    return { landPointsMesh: null, oceanPointsMesh: null }
  }
}