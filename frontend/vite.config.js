import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Exponer en todas las interfaces de red
    port: 5173 // Puerto predeterminado de Vite
  },
  build: {
    outDir: 'dist', // Asegúrate de que la salida sea en la carpeta 'dist'
  }
})
