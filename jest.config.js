const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  preset: 'ts-jest',
  testEnvironment: "jsdom",
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    ...tsJestTransformCfg,
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleDirectories: ['node_modules', 'src'],
  testPathIgnorePatterns: ['/tests/']//['/node_modules/', '/dist/', '/build/'],
};
