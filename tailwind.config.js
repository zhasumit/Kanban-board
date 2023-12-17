/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				mainBackgroundColor: "#OD1117",
				coloumnBackgroundColor: "#161C22",
			},
		},
	},
	plugins: [],
};
