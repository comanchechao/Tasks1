/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      lineHeight: {
        base: "2",
      },

      // Set the base font size for the document.
      fontSize: {
        base: ["18px", "2"],
      },

      gridTemplateRows: {
        "[auto,auto,1fr]": "auto auto 1fr",
      },
      height: {
        rem22: "22rem",

        rem26: "26rem",
        rem28: "28rem",
        rem30: "30rem",
        dialog: "32rem",
        rem33: "33rem",
        rem34: "34rem",
        rem35: "35rem",
        rem40: "40rem",
        rem45: "45rem",
        rem77: "77rem",
        carousel: "38rem",
        rem50: "99rem",
      },
      width: {
        rem28: "28rem",
        rem38: "38rem",
        carousel: "50rem",
        textArea: "66rem",
        blog: "30rem",
      },
      fontFamily: {
        mainFont: ["IranSans"],
        SultanFont: ["SultanFont"],
      },
    },

    screens: {
      xs: { max: "767px" },
      sm: { min: "768px", max: "991px" },
      md: { min: "768px", max: "1199px" },
      lg: { min: "1200px" },
    },
    colors: {
      // Build your palette here
      mainWhite: "#ffffff",
      transparent: "transparent",
      current: "currentColor",
      mainPurple: "#3F008D",
      darkPurple: "#150531",
      mainBlack: "#171717",
      mainRed: "#ff1654",
      mainBlue: "#3602f2",
      // mainBrown: "#170800",
      mainYellow: "#fdbe39",
      mainOrange: "#fb6107",
      mainPink: "#f72585",
      mainGreen: "#53db7c",

      // darkPurple: "#240046",
      goldie: "#ff9e00",
      white: colors.white,
      black: colors.black,
      gray: colors.neutral,
      LightBlue: colors.sky,
      red: colors.red,
      blue: colors.blue,
      yellow: colors.yellow,
      blueGray: colors.slate,
      Lime: colors.lime,
      CoolGray: colors.gray,
      Fuchsia: colors.fuchsia,
      purple: colors.purple,
      green: colors.green,
      pink: colors.pink,
      Rose: colors.rose,
      Indigo: colors.indigo,
      Amber: colors.amber,
      Cyan: colors.cyan,
      Emerald: colors.emerald,
      Sky: colors.sky,
    },
  },
  plugins: [require("daisyui")],
};
