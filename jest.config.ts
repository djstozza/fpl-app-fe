export default {
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js"
  },
  modulePaths: [
    "<rootDir>/src"
  ],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        diagnostics: {
          ignoreCodes: [1343]
        },
        astTransformers: {
          before: [
            {
              path: 'node_modules/ts-jest-mock-import-meta',  // or, alternatively, 'ts-jest-mock-import-meta' directly, without node_modules.
              options: { metaObjectReplacement: { url: 'https://www.url.com', env: { "VITE_API_URL": 'https://www.url.com' } } }
            }
          ]
        }
      }
    ]
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
}

// "jest": {
//   "preset": "ts-jest/presets/js-with-ts",
//   "testEnvironment": "jest-environment-jsdom",
//   "moduleNameMapper": {
//     "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
//     "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js"
//   },
//   "modulePaths": [
//     "<rootDir>/src"
//   ],
//   "collectCoverageFrom": [
//     "src/**/*.{js,jsx,ts,tsx}",
//     "!<rootDir>/node_modules/",
//     "!<rootDir>/path/to/dir/"
//   ],
//   "coverageThreshold": {
//     "global": {
//       "branches": 97.56,
//       "functions": 98.83,
//       "lines": 98.56,
//       "statements": 98.49
//     }
//   },
//   "coverageReporters": [
//     "text"
//   ]
// },