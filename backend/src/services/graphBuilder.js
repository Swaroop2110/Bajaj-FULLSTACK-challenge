const buildGraph = (edges) => {
  const adjacencyList = new Map();
  const childToParent = new Map();

  for (const edge of edges) {
    const [parent, child] = edge.split('->');

    if (!adjacencyList.has(parent)) {
      adjacencyList.set(parent, new Set());
    }

    if (!adjacencyList.has(child)) {
      adjacencyList.set(child, new Set());
    }

    if (childToParent.has(child)) {
      continue;
    }

    childToParent.set(child, parent);
    adjacencyList.get(parent).add(child);
  }

  return { adjacencyList, childToParent };
};

const getAllNodes = ({ adjacencyList, childToParent }) => {
  const allNodes = new Set();

  for (const node of adjacencyList.keys()) {
    allNodes.add(node);
  }

  for (const child of childToParent.keys()) {
    allNodes.add(child);
  }

  return allNodes;
};

const findRoots = ({ adjacencyList, childToParent }, allNodes) => {
  const roots = new Set();
  for (const node of allNodes) {
    if (!childToParent.has(node) && adjacencyList.has(node)) {
      roots.add(node);
    }
  }

  if (roots.size === 0) {
    for (const node of allNodes) {
      roots.add(node);
    }
  }

  return roots;
};

module.exports = {
  buildGraph,
  getAllNodes,
  findRoots
};
