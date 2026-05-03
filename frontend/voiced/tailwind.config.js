/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        cream: '#F7F4EF',
        ink: '#1A1714',
        soft: '#6B6560',
        muted: '#EAE6DF',
        border: '#E2DDD6',
        card: '#FFFFFF',
        accent: {
          DEFAULT: '#2D6A4F',
          light: '#D8F0E5',
          mid: '#52B788',
        },
        warn: {
          DEFAULT: '#E07A5F',
          light: '#FAE8E3',
        },
        yellow: {
          DEFAULT: '#F4A261',
          light: '#FEF3CD',
        },
      },
      borderRadius: {
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
      },
      fontFamily: {
        display: ['Georgia'],
      },
    },
  },
  plugins: [],
}
