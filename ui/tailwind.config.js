/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'mountain-meadow': {
          DEFAULT: '#20AF8E',
          50: '#9AEDDA',
          100: '#89E9D3',
          200: '#66E3C6',
          300: '#44DDB9',
          400: '#26D1AA',
          500: '#20AF8E',
          600: '#178068',
          700: '#0F5041',
          800: '#06211B',
          900: '#000000',
          950: '#000000'
        },
        'turquoise': {
          DEFAULT: '#3DD6BF',
          50: '#D5F6F1',
          100: '#C4F2EB',
          200: '#A2EBE0',
          300: '#80E4D5',
          400: '#5FDDCA',
          500: '#3DD6BF',
          600: '#26B59F',
          700: '#1C8676',
          800: '#13584E',
          900: '#092A25',
          950: '#041310'
        },
        'harp': {
          DEFAULT: '#F0F7F4',
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#FFFFFF',
          300: '#FFFFFF',
          400: '#FFFFFF',
          500: '#F0F7F4',
          600: '#CBE3D9',
          700: '#A7D0BE',
          800: '#82BCA4',
          900: '#5EA989',
          950: '#52997A'
        },
        'thunder': {
          DEFAULT: '#32292F',
          50: '#957E8D',
          100: '#8C7383',
          200: '#75606E',
          300: '#5F4E59',
          400: '#483B44',
          500: '#32292F',
          600: '#131012',
          700: '#000000',
          800: '#000000',
          900: '#000000',
          950: '#000000'
        },
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}

