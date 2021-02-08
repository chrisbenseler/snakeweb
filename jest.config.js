module.exports = {
  verbose: true,
  testMatch: ['**/?(*.)+(spec|test).js'],
  roots: ["<rootDir>/"],
  collectCoverage: true,
  moduleFileExtensions: ["js", "mjs"],
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.mjs$": "babel-jest",
  },
};
