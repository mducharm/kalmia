module.exports = {
	globDirectory: 'build/',
	globPatterns: [
		'**/*.{css,js,png,json,ico,svg,html,txt,webmanifest}'
	],
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	],
	swDest: 'public/sw.js'
};