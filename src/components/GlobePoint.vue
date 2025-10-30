<template>
  <circle
    :cx="x"
    :cy="y"
    :r="size"
    :fill="color"
    :opacity="opacity"
  />
</template>

<script>
export default {
  name: 'GlobePoint',
  props: {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    visible: { type: Boolean, default: true },
    type: { type: String, default: 'land' },
    size: { type: Number, default: 1 }
  },
  computed: {
    opacity() { return this.visible ? 1 : 0.3 },
    color() { return this.type === 'land' ? '#000' : '#00000025' }
  }
}
</script>



