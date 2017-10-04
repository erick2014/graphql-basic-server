const base = process.cwd();
const path = require('path');
const {
	fileLoader,
  mergeTypes
} = require('merge-graphql-schemas');

const types = fileLoader(path.join(base, '/schema/types'));

module.exports = mergeTypes(types);
