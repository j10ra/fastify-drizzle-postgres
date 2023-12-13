const locations = ['config', 'db', 'factory', 'middleware', 'modules', 'routes', 'server', 'types'];
const aliasReducer = (acc, alias) => {
  acc[`^@/${alias}(.*)$`] = `<rootDir>/src/${alias}$1`;
  return acc;
};

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: locations.reduce(aliasReducer, {}),
  testPathIgnorePatterns: ['/node_modules/', '/build/'],
};
