const { USER_ID, EMAIL_ID, ROLL_NUMBER } = require('../config/env');
const { validateEdges } = require('../services/validator');
const { extractDuplicateEdges } = require('../services/duplicateHandler');
const { buildGraph, findRoots, getAllNodes } = require('../services/graphBuilder');
const { detectCycles } = require('../services/cycleDetector');
const { buildTree } = require('../services/treeBuilder');
const { calculateDepth } = require('../services/depthCalculator');
const { generateSummary } = require('../services/summaryGenerator');

const buildHierarchyObjects = (roots, graph, visitedNodes) => {
  const hierarchies = [];

  for (const root of roots) {
    if (visitedNodes.has(root)) continue;

    const cycleResult = detectCycles(root, graph, visitedNodes);
    if (cycleResult.hasCycle) {
      hierarchies.push({
        root,
        tree: {},
        has_cycle: true
      });
      continue;
    }

    const tree = buildTree(root, graph);
    const depth = calculateDepth(tree);

    hierarchies.push({
      root,
      tree: {
        [root]: tree
      },
      depth
    });
  }

  return hierarchies;
};

const processHierarchy = (req, res, next) => {
  try {
    const payload = req.body || {};
    const rawEdges = Array.isArray(payload.data) ? payload.data : [];

    const { validEdges, invalidEntries } = validateEdges(rawEdges);
    const { uniqueEdges, duplicateEdges } = extractDuplicateEdges(validEdges);
    const graph = buildGraph(uniqueEdges);
    const allNodes = getAllNodes(graph);
    const roots = findRoots(graph, allNodes);
    const sortedRoots = Array.from(roots).sort();

    const visitedNodes = new Set();
    const hierarchies = buildHierarchyObjects(sortedRoots, graph, visitedNodes);
    const summary = generateSummary(hierarchies);

    return res.json({
      user_id: USER_ID,
      email_id: EMAIL_ID,
      college_roll_number: ROLL_NUMBER,
      hierarchies,
      invalid_entries: invalidEntries,
      duplicate_edges: duplicateEdges,
      summary
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  processHierarchy
};
