/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coy: {
          primary: '#7138E8',       // Deep Purple
          'primary-dark': '#5B21D6',
          'primary-light': '#8A58F5',
          secondary: '#A78BFA',     // Lavender
          'secondary-light': '#EDE9FE',
          bg: '#FAF8FF',            // Soft Lavender-White
          card: '#FFFFFF',
          text: '#19152B',          // Deep rich slate/navy
          muted: '#6B7280',
          accent: '#FF6FAE',        // Vibrant Rose Pink
          'accent-light': '#FCE7F3',
          pass: '#64748B',          // Slate for pass button
          'pass-bg': '#F1F5F9',
        }
      },
      boxShadow: {
        'card': '0 20px 40px -15px rgba(113, 56, 232, 0.12), 0 8px 16px -8px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 25px 50px -12px rgba(113, 56, 232, 0.2)',
        'btn': '0 10px 25px -5px rgba(113, 56, 232, 0.35)',
        'btn-like': '0 10px 25px -5px rgba(255, 111, 174, 0.45)',
        'btn-pass': '0 8px 20px -4px rgba(100, 116, 139, 0.25)',
        'nav': '0 -10px 30px rgba(113, 56, 232, 0.06)',
      },
      borderRadius: {
        '3xl': '1.75rem',
        '4xl': '2.25rem',
      }
    },
  },
  plugins: [],
}
