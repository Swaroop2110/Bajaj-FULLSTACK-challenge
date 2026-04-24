export const renderTree = (tree) => {
  return Object.entries(tree)
    .map(([node, children]) => {
      const subtree = Object.keys(children).length ? `<ul class="tree-list">${renderTree(children)}</ul>` : '';
      return `<li><span class="tree-label">${node}</span>${subtree}</li>`;
    })
    .join('');
};
