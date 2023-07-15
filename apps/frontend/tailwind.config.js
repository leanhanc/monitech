const { createGlobPatternsForDependencies } = require("@nx/react/tailwind");
const { join } = require("path");

module.exports = {
	content: [
		join(__dirname, "{src,components,app}/**/*!(*.stories|*.spec).{tsx,html}"),
		...createGlobPatternsForDependencies(__dirname),
	],
	theme: {
		extend: {
			fontFamily: {
				title: ["var(--font-montserrat)"],
				body: ["var(--font-source-sans)"],
			},
		},
	},
	plugins: [],
};
