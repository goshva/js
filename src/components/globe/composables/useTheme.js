import { ref } from 'vue'

export function useTheme() {
  const theme = ref('dark')

  const toggleTheme = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }

  return {
    theme,
    toggleTheme
  }
}