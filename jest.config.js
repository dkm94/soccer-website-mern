module.exports = {
	verbose: true,
	testEnvironment: 'jsdom',
	transform: { '^.+\\.[jt]sx?$': 'babel-jest' },
	roots: [ '<rootDir>/src', '<rootDir>/__tests__' ],
	moduleDirectories: [ 'node_modules', 'src',' __tests__' ],
 	transformIgnorePatterns: [],
	moduleNameMapper: {
		'\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
		'\\.(scss|sass|css)$': 'identity-obj-proxy',
	},
	moduleFileExtensions: [ 'ts', 'tsx', 'js', 'jsx' ],
	extensionsToTreatAsEsm: [ '.jsx' ],
	setupFiles: [ '<rootDir>/test-setup.js' ],
	setupFilesAfterEnv: [ '<rootDir>/setupTests.js' ],
	testPathIgnorePatterns: [ '__utils__' ],
};