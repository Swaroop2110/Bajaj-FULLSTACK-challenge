const extractDuplicateEdges = (edges) => {
  const seen = new Set();
  const duplicateEdges = new Set();
  const uniqueEdges = [];

  for (const edge of edges) {
    if (seen.has(edge)) {
      duplicateEdges.add(edge);
      continue;
    }

    seen.add(edge);
    uniqueEdges.push(edge);
  }

  return {
    uniqueEdges,
    duplicateEdges: Array.from(duplicateEdges).sort()
  };
};

module.exports = {
  extractDuplicateEdges
};
