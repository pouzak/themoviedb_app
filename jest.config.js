module.exports = {
  verbose: true,
  setupTestFrameworkScriptFile: "<rootDir>tests/setupEnzyme.js",
  transform: {
    "^.+\\.(js|jsx)?$": "<rootDir>/node_modules/babel-jest"
  },
  moduleNameMapper: {
    "\\.(css)$": "<rootDir>/tests/styleMock.js",
    "\\.(gif|ttf|eot|svg)$": "<rootDir>/tests/fileMock.js"
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/"]
};

// module.exports = {
//   moduleFileExtensions: ["js", "jsx", "json", "vue"],
//   transform: {
//     "^.+\\.vue$": "vue-jest",
//     ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$":
//       "jest-transform-stub",
//     "^.+\\.js$": "babel-jest"
//   },
//   moduleNameMapper: {
//     "^@/(.*)$": "<rootDir>/src/$1"
//   },
//   snapshotSerializers: ["jest-serializer-vue"],
//   testMatch: [
//     "<rootDir>/(tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx))"
//   ],
//   transformIgnorePatterns: ["<rootDir>/node_modules/"]
// };
