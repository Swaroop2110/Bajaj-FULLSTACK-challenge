const { REGEX, MAX_EDGES } = require('../utils/constants');

const validateEdges = (entries) => {
  const invalidEntries = [];
  const validEdges = [];

  if (!Array.isArray(entries)) {
    return { validEdges, invalidEntries: ['Invalid payload: data must be an array'] };
  }

  for (const raw of entries) {
    const value = typeof raw === 'string' ? raw.trim() : '';

    if (!REGEX.test(value)) {
      invalidEntries.push(raw);
      continue;
    }

    const [parent, child] = value.split('->');
    if (parent === child) {
      invalidEntries.push(raw);
      continue;
    }

    validEdges.push(value);
  }

  if (validEdges.length > MAX_EDGES) {
    const extra = validEdges.splice(MAX_EDGES);
    invalidEntries.push(...extra);
  }

  return { validEdges, invalidEntries };
};

module.exports = {
  validateEdges
};
