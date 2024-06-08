import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: ["src/**/*.{jsx,tsx,mdx}"],
  theme: {
    screens: {
      desktop_lg: { max: "1920px" },
      desktop_md: { max: "1440px" },
      desktop_sm: { max: "1300px" },
      laptop: { max: "1024px" },
      tablet_lg: { max: "900px" },
      tablet_md: { max: "768px" },
      tablet_sm: { max: "640px" },
      mobile_lg: { max: "430px" },
      mobile_md: { max: "380px" },
      mobile_sm: { max: "330px" },
    },
    extend: {
      backgroundImage: {
        "landing":
          "url('/images/Home.png')"
      },
      colors: {
        danger: {
          DEFAULT: "#D00711",
        },
        grey: {
          DEFAULT: "rgb(218,227,234,0.5)"
        },
        whitegrey: {
          DEFAULT: "rgb(230,241,250)"
        }
      },
      fontFamily: {
        jolly_lodger: ["var(--font-jolly_lodger)", ...defaultTheme.fontFamily.sans],
        inter: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
        finger_paint: ["var(--font-finger_paint)", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        // i.e. text-h1 : [fontSize, lineHeight]
        h1: ["62px", "70px"],
        h2: ["48px", "normal"], // normal = 150% = 24px
        h3: ["32px", "normal"],
        h4: ["24px", "32px"],
        h5: ["18px", "32px"],
        lg: ["16px", "24px"],
        md: ["14px", "20px"],
        sm: ["12px", "16px"],
        vs: ["10px", "12px"],
      },
      fontWeight: {
        // i.e. font-100
        100: "100",
        200: "200",
        300: "300",
        400: "400",
        500: "500",
        600: "600",
        700: "700",
        800: "800",
        900: "900",
      },
      boxShadow: {
        'DEFAULT': ' 0px 4px 4px 0px #00000040',
      }
    },
  },
  plugins: [],
};
export default config;
