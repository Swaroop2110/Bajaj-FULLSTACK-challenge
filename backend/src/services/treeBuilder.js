const buildTree = (node, graph, visited = new Set()) => {
  if (visited.has(node)) {
    return {};
  }

  visited.add(node);
  const children = Array.from(graph.adjacencyList.get(node) || []).sort();
  const tree = {};

  for (const child of children) {
    tree[child] = buildTree(child, graph, visited);
  }

  return tree;
};

module.exports = {
  buildTree
};
