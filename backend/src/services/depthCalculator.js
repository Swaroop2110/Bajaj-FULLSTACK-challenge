const calculateDepth = (tree) => {
  if (!tree || Object.keys(tree).length === 0) {
    return 1;
  }

  const childDepths = Object.values(tree).map((childTree) => calculateDepth(childTree));
  return 1 + Math.max(...childDepths);
};

module.exports = {
  calculateDepth
};
