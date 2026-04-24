export const API_BASE_URL = 'http://localhost:3000';

export const sendHierarchyRequest = async (data) => {
  const response = await fetch(`${API_BASE_URL}/bfhl`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ data })
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.error || 'Unable to process hierarchy request');
  }

  return response.json();
};
