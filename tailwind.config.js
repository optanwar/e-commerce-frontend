/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 🎨 Colors
      colors: {
        primary: '#FF6B6B',      // CTA - Buy Now, Add to Cart
        secondary: '#FFA726',    // Accent - badges, highlights
        accent: '#BA68C8',       // Fun titles, promos
        trust: '#4FC3F7',        // Safe & clean background
        health: '#A5D6A7',       // Natural vibes
        lightBg: '#F5F5F5',      // Section backgrounds
        darkText: '#333333',     // Body text
        white: '#ffffff',
      },

      // 🖋️ Fonts
      fontFamily: {
        heading: ['Baloo 2', 'cursive'],        // Playful, friendly
        body: ['Quicksand', 'sans-serif'],      // Soft, readable
        sans: ['Poppins', 'sans-serif'],        // Clean, modern
      },

      // 🌟 Shadows (Best options)
      boxShadow: {
        soft: '0 4px 8px rgba(0, 0, 0, 0.08)',         // Use on product cards
        hoverCard: '0 8px 24px rgba(0, 0, 0, 0.12)',   // On hover or popups
        cta: '0 6px 12px rgba(255, 107, 107, 0.4)',     // Red CTA glow
        promo: '0 0 0 4px rgba(186, 104, 200, 0.3)',    // Purple outline (promo badge)
      },

      // 🧩 Spacing
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        36: '9rem',
        72: '18rem',
      },

      // 📦 Container
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '6rem',
        },
      },

      keyframes: {
  fadeIn: {
    '0%': { opacity: 0 },
    '100%': { opacity: 1 },
  },
  float: {
    '0%, 100%': { transform: 'translateY(0)' },
    '50%': { transform: 'translateY(-10px)' },
  },
  fadeInOut: {
    '0%': { opacity: 0, transform: 'translateY(-10px)' },
    '20%': { opacity: 1, transform: 'translateY(0)' },
    '80%': { opacity: 1, transform: 'translateY(0)' },
    '100%': { opacity: 0, transform: 'translateY(-10px)' },
  },
},

animation: {
  fadeIn: 'fadeIn 1s ease-in-out',
  float: 'float 3s ease-in-out infinite',
  fadeInOut: 'fadeInOut 2s ease-in-out', // 👈 New animation
},

      // 🌄 Background image (optional)
      backgroundImage: {
        gummiesPattern: "url('/src/assets/gummies-bg.png')",
      },
    },
  },
  plugins: [],
};
