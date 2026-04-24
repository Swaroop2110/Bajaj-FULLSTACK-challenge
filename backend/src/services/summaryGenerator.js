const generateSummary = (hierarchies) => {
  const total_cycles = hierarchies.filter((item) => item.has_cycle).length;
  const validTrees = hierarchies.filter((item) => !item.has_cycle);
  const total_trees = validTrees.length;

  const largest_tree_root = validTrees
    .sort((a, b) => {
      if (b.depth !== a.depth) {
        return b.depth - a.depth;
      }
      return a.root.localeCompare(b.root);
    })
    .map((item) => item.root)[0] || '';

  return {
    total_trees,
    total_cycles,
    largest_tree_root
  };
};

module.exports = {
  generateSummary
};
