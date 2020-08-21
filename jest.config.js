module.exports = {
	transform: {
		'^.+\\.ts?$': 'ts-jest'
	},
	// moduleFileExtensions: [ 'ts', 'js' ],
	verbose: true,
	coverageDirectory: 'coverage',
	coveragePathIgnorePatterns: ['<rootDir>/test', '<rootDir>/node_modules'],
	testMatch: ['<rootDir>/test/**/*.test.ts'],
	testEnvironment: 'node',
}
