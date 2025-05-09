// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss({
      content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
      ],
      darkMode: 'class',
      theme: {
        extend: {
          // You can add custom theme colors here if needed
          // e.g., colors: { 'brand-blue-dark': '#3b82f6', }
        },
      },
      plugins: [],
    }),
  ],
})