import { sendHierarchyRequest } from './api.js';
import { renderSummary, renderHierarchies, renderInvalidEntries, renderDuplicateEdges, renderError } from './renderer.js';

const edgeInput = document.getElementById('edgeInput');
const submitButton = document.getElementById('submitButton');
const loadingSpinner = document.getElementById('loadingSpinner');

const setLoading = (isLoading) => {
  if (isLoading) {
    loadingSpinner.classList.remove('hidden');
    submitButton.disabled = true;
    submitButton.textContent = 'Processing...';
  } else {
    loadingSpinner.classList.add('hidden');
    submitButton.disabled = false;
    submitButton.textContent = 'Process Hierarchy';
  }
};

const parseInput = () => {
  const value = edgeInput.value.trim();
  if (!value) {
    return [];
  }

  return value
    .split(/\r?\n|,/)    
    .map((entry) => entry.trim())
    .filter((entry) => entry.length > 0);
};

const clearResults = () => {
  renderSummary({ total_trees: 0, total_cycles: 0, largest_tree_root: '' });
  renderHierarchies([]);
  renderInvalidEntries([]);
  renderDuplicateEdges([]);
  renderError('');
};

const handleSubmit = async () => {
  renderError('');
  const edges = parseInput();

  if (edges.length === 0) {
    renderError('Please enter at least one relationship in the format A->B.');
    return;
  }

  setLoading(true);

  try {
    const result = await sendHierarchyRequest(edges);
    renderSummary(result.summary);
    renderHierarchies(result.hierarchies);
    renderInvalidEntries(result.invalid_entries || []);
    renderDuplicateEdges(result.duplicate_edges || []);
  } catch (error) {
    clearResults();
    renderError(error.message);
  } finally {
    setLoading(false);
  }
};

submitButton.addEventListener('click', handleSubmit);
