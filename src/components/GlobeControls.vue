<template>
  <div class="controls">
    <select v-model="modelSelectedGlobe" @change="$emit('load')">
      <option value="">— Select Globe —</option>
      <option v-for="globe in availableGlobes" :key="globe.path" :value="globe.path">
        {{ globe.name }}
      </option>
    </select>
    <label>
      <input type="checkbox" v-model="modelShowBackHemisphere" />
      Show Back Hemisphere
    </label>
    <button @click="$emit('export-svg')" class="export-btn">Export SVG</button>
    <button @click="$emit('export-json')" class="export-btn">Export JSON</button>
  </div>
</template>

<script>
export default {
  name: 'GlobeControls',
  props: {
    selectedGlobe: { type: String, default: '' },
    showBackHemisphere: { type: Boolean, default: true },
    availableGlobes: { type: Array, default: () => [] }
  },
  emits: ['update:selectedGlobe', 'update:showBackHemisphere', 'load', 'export-svg', 'export-json'],
  computed: {
    modelSelectedGlobe: {
      get() { return this.selectedGlobe },
      set(v) { this.$emit('update:selectedGlobe', v) }
    },
    modelShowBackHemisphere: {
      get() { return this.showBackHemisphere },
      set(v) { this.$emit('update:showBackHemisphere', v) }
    }
  }
}
</script>

<style scoped>
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
.controls button:hover { background: #4a5568; }
.controls label { display: flex; align-items: center; gap: 8px; cursor: pointer; }
.export-btn { background: #3182ce !important; border-color: #3182ce !important; }
.export-btn:hover { background: #2c5aa0 !important; }
</style>



