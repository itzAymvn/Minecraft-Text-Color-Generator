/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin")

export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				mc_black: "#000000",
				mc_dark_blue: "#0000AA",
				mc_dark_green: "#00AA00",
				mc_dark_aqua: "#00AAAA",
				mc_dark_red: "#AA0000",
				mc_dark_purple: "#AA00AA",
				mc_gold: "#FFAA00",
				mc_gray: "#AAAAAA",
				mc_dark_gray: "#555555",
				mc_blue: "#5555FF",
				mc_green: "#55FF55",
				mc_aqua: "#55FFFF",
				mc_red: "#FF5555",
				mc_light_purple: "#FF55FF",
				mc_yellow: "#FFFF55",
				mc_white: "#FFFFFF",
			},
			backgroundImage: {
				chat: "url('/images/chat.png')",
			},
			textShadow: {
				sm: "0 1px 2px var(--tw-shadow-color)",
				DEFAULT: "0 2px 4px var(--tw-shadow-color)",
				lg: "0 8px 16px var(--tw-shadow-color)",
			},
			fontFamily: {
				minecraft: ["minecraft", "sans-serif"],
			},
		},
	},
	plugins: [
		plugin(function ({ matchUtilities, theme }) {
			matchUtilities(
				{
					"text-shadow": (value) => ({
						textShadow: value,
					}),
				},
				{ values: theme("textShadow") }
			)
		}),
	],
}
