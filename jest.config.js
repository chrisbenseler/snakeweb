module.exports = {
  verbose: true,
  testMatch: ["**/+(*.)+(spec).js?(x)"],
  roots: ["<rootDir>/"],
  collectCoverage: true,
  moduleFileExtensions: ["js", "mjs"],
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.mjs$": "babel-jest",
  },
};
