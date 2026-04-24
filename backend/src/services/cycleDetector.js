const detectCycles = (startNode, graph, visitedNodes) => {
  const recursionStack = new Set();
  let hasCycle = false;

  const traverse = (node) => {
    if (recursionStack.has(node)) {
      hasCycle = true;
      return;
    }

    if (visitedNodes.has(node) || hasCycle) {
      return;
    }

    visitedNodes.add(node);
    recursionStack.add(node);

    const children = graph.adjacencyList.get(node) || new Set();
    for (const child of children) {
      traverse(child);
      if (hasCycle) {
        return;
      }
    }

    recursionStack.delete(node);
  };

  traverse(startNode);
  return { hasCycle };
};

module.exports = {
  detectCycles
};
