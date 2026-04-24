import { renderTree } from './treeRenderer.js';

const createSection = (title, content) => {
  const wrapper = document.createElement('div');
  wrapper.className = 'data-card';
  wrapper.innerHTML = `<strong>${title}</strong>${content}`;
  return wrapper;
};

export const renderSummary = (summary) => {
  const summaryContainer = document.getElementById('summaryContainer');
  summaryContainer.innerHTML = '';

  const items = [
    { label: 'Total Trees', value: summary.total_trees },
    { label: 'Total Cycles', value: summary.total_cycles },
    { label: 'Largest Tree Root', value: summary.largest_tree_root || 'N/A' }
  ];

  for (const item of items) {
    const card = document.createElement('div');
    card.className = 'summary-card';
    card.innerHTML = `<strong>${item.label}</strong><span>${item.value}</span>`;
    summaryContainer.appendChild(card);
  }
};

export const renderHierarchies = (hierarchies) => {
  const container = document.getElementById('hierarchiesContainer');
  container.innerHTML = '';

  if (hierarchies.length === 0) {
    container.appendChild(createSection('Hierarchies', '<p>No hierarchy trees found.</p>'));
    return;
  }

  for (const hierarchy of hierarchies) {
    const treeHtml = hierarchy.has_cycle
      ? '<p class="error-text">Cycle detected — unable to build tree.</p>'
      : `<ul class="tree-list">${renderTree(hierarchy.tree)}</ul>`;

    const content = `
      <p><strong>Root:</strong> ${hierarchy.root}</p>
      ${treeHtml}
      ${hierarchy.has_cycle ? '<p><strong>Status:</strong> Cycle detected</p>' : `<p><strong>Depth:</strong> ${hierarchy.depth}</p>`}
    `;

    container.appendChild(createSection('Hierarchy', content));
  }
};

const renderList = (items) => {
  if (items.length === 0) {
    return '<p>None</p>';
  }

  return `<ul>${items.map((item) => `<li>${item}</li>`).join('')}</ul>`;
};

export const renderInvalidEntries = (invalidEntries) => {
  const container = document.getElementById('invalidContainer');
  container.innerHTML = '';
  container.appendChild(createSection('Invalid Entries', renderList(invalidEntries)));
};

export const renderDuplicateEdges = (duplicateEdges) => {
  const container = document.getElementById('duplicatesContainer');
  container.innerHTML = '';
  container.appendChild(createSection('Duplicate Edges', renderList(duplicateEdges)));
};

export const renderError = (message) => {
  const errorElement = document.getElementById('errorMessage');
  errorElement.textContent = message;
};
