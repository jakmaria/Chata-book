/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './modules/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        view: "url('../public/main-bg.jpeg')",
      },
      backgroundSize: {
        cover: 'cover',
      },
      backgroundAttachment: {
        fixed: 'fixed',
      },
    },
    fontFamily: {
      gloock: ['Gloock'],
      abril: ['Abril'],
      rajdhani: ['Rajdhani'],
      bodoni: ['Bodoni Moda'],
      julius: ['Julius Sans One'],
      ysabeau: ['Ysabeau SC'],
      rainbow: ['Over the rainbow'],
      nothing: ['Nothing You Could do'],
    },
    fontSize: {
      // 10px
      sm: ['1rem', '1.3rem'],
      // 16px
      base: ['1.8rem', '2rem'],
      // 20px
      lg: ['2rem', '2.5rem'],
      // 25px
      xl: ['2.5rem', '2.8rem'],
      // 30px
      '2xl': ['3rem', '3.2rem'],
      // 36px
      '2.5xl': ['3.5rem', '3.4rem'],
      // 40px
      '3xl': ['4rem', '4.5rem'],
      // 50px
      '4xl': ['5rem', '5.2rem'],
      // 56px
      '4.5xl': ['5.5rem', '5.2rem'],
      //65px
      '4.5xl': ['6rem', '5.2rem'],
      // 75px
      '5xl': ['7.5rem', '7.7rem'],
      '6xl': ['9.5rem', '8.7rem'],
    },
    spacing: {
      0: '0',
      1: '0.5rem',
      2: '1rem',
      3: '1.5rem',
      4: '2rem',
      5: '2.5rem',
      6: '3rem',
      7: '3.5rem',
      8: '4rem',
      9: '4.5rem',
      10: '5rem',
      11: '5.5rem',
      12: '6rem',
      13: '6.5rem',
      14: '7rem',
      15: '7.5rem',
      16: '8rem',
      17: '8.5rem',
      18: '9rem',
      19: '9.5rem',
      20: '10rem',
      21: '10.5rem',
      22: '11rem',
      23: '11.5rem',
      24: '12rem',
      25: '12.5rem',
      26: '13rem',
      27: '13.5rem',
      28: '14rem',
      30: '15rem',
      32: '16rem',
      34: '17rem',
      36: '18rem',
      40: '20rem',
      46: '23rem',
      50: '25rem',
      55: '28rem',
      65: '32.5rem',
      80: '40rem',
      90: '55rem',
      100: '90rem',
    },
  },
  plugins: [],
};
