/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#A83232', // Aksen / Tombol / Highlight
          maroon: '#4A0404', // Elemen Utama / Section
        },
        dark: {
          900: '#0D0D0D', // Background Utama (Charcoal)
          800: '#121212', // Hitam keabuan lembut
          700: '#1A1A1A', 
        },
        text: {
          main: '#E0E0E0', // Soft White (Teks Utama)
          light: '#F5F5F5', // Putih Tulang (Heading)
          muted: '#8A8D93', // Abu-abu Metalik (Ikon / Border / Teks sekunder)
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
