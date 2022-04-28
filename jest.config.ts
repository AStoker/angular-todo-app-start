import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    preset: "jest-preset-angular",
    setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
    globalSetup: 'jest-preset-angular/global-setup',

    // Automatically clear mock calls, instances and results before every test
    clearMocks: true,

    // Indicates whether the coverage information should be collected while executing the test
    collectCoverage: true,

    // An array of glob patterns indicating a set of files for which coverage information should be collected
    collectCoverageFrom: [
        "src/**/*.ts"
    ],

    // The directory where Jest should output its coverage files
    coverageDirectory: "./coverage",

    // Indicates which provider should be used to instrument code for coverage
    coverageProvider: "v8",

    // A list of reporter names that Jest uses when writing coverage reports
    coverageReporters: [
        "cobertura",
        "json",
        "text",
        "lcov",
        "clover"
    ],

    // Use this configuration option to add custom reporters to Jest
    reporters: [ "default", "jest-junit" ],

    // The test environment that will be used for testing
    testEnvironment: "jest-environment-jsdom",
};

export default config;