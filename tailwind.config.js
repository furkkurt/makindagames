/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html, js}", "./components/*.js"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px"
    },
    extend: {
      backgroundImage: {
        'tp1': "url('/assets/bg.jpg')",
        'newspaper': "url('/assets/newspaper.png')",
      },
      colors: {
        brightRed: " #f6866a",
        brightRedLight: " #fdece7",
        darkBlue: "#242d52",
        tpRed: "#e74f4f",
        tpBlue: "#74bdb7",
        tpGrey: "#332f2f",
        tpGreen: "#47a54e",
        tpPink: "	#f9e9e9",
        smokeyWhite: "#f5f5f5",
        honeyGold: " #FDF1DF",
        logoBlue: "#00ADEF"
      },
      fontFamily: {
        custom1: ["Rowdies"],
        custom2: ["IBM Plex Mono"]
      },
      rotate: {
        270: "-90deg"
      },
      spacing: {
        '96': '24rem',
        '112': '28rem',
        '128': '32rem',
        '192': '48rem',
        '256': '64rem',
      },
      animation: {
        'infinite-scroll': 'infinite-scroll 12s linear infinite',
      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        }
      }
    },
  },
  plugins: [],
}

