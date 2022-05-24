module.exports = {
    roots: [
        '<rootDir>',
    ],
    collectCoverageFrom: [
        '**/*.{js,ts,jsx,tsx}',
        '!**/node_modules/**',
    ],
    transform: {
        '^.+\\.(js|ts|jsx|tsx)?$': 'babel-jest',
    },
    moduleNameMapper: {
        'd3-shape': '<rootDir>/node_modules/d3-shape/dist/d3-shape.js',
    },
    transformIgnorePatterns: [
        '.*/node_modules/(?!d3|d3-shape)',
    ],
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|js|tsx|jsx)?$',
    moduleFileExtensions: [
        'ts',
        'js',
        'tsx',
        'jsx',
        'json',
    ],
};
