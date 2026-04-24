# HierarchyAPI — Hierarchical Node Relationship Processor

## Overview

HierarchyAPI is a full stack application that processes hierarchical relationships in the form of parent-child edges. It validates edges, detects invalid entries and duplicates, constructs nested trees, detects cycles, and generates summary metadata.

## Backend

- `backend/app.js` — Express app with CORS, JSON parsing, and error middleware.
- `backend/server.js` — Launches the server using environment configuration.
- `backend/src/routes/bfhl.route.js` — Defines the `/bfhl` endpoint.
- `backend/src/controllers/bfhl.controller.js` — Orchestrates validation, graph building, cycle detection, tree rendering, and summary.
- `backend/src/services/` — Modular service layer for validation, duplicate detection, graph construction, cycle detection, tree building, depth calculation, and summary creation.
- `backend/src/utils/` — Contains constants and logger utilities.
- `backend/.env.example` — Example environment file.

## Frontend

- `frontend/public/index.html` — Single page application shell.
- `frontend/src/css/style.css` — Modern responsive styling.
- `frontend/src/js/app.js` — UI interactions and form submission.
- `frontend/src/js/api.js` — Fetch wrapper for the backend API.
- `frontend/src/js/renderer.js` — Result rendering into cards and lists.
- `frontend/src/js/treeRenderer.js` — Recursive tree markup builder.
- `frontend/src/assets/loader.gif` — Placeholder asset included for deployment requirements.

## Setup

### Backend

```bash
cd backend
npm install
cp .env.example .env
npm start
```

### Frontend

Open `frontend/public/index.html` in a browser or deploy the frontend to Vercel and point `API_BASE_URL` in `frontend/src/js/api.js` at your deployed backend.

## Deployment

- Backend: deploy `backend/` to Render or any Node.js host.
- Frontend: deploy `frontend/public` to Vercel as a static site.

## Example Request

```json
{
  "data": ["A->B", "A->C", "B->D"]
}
```

## Example Response

```json
{
  "user_id": "swaroopgupta_21102005",
  "email_id": "sg6360@srmist.edu.in",
  "college_roll_number": "RA2311003011066",
  "hierarchies": [
    {
      "root": "A",
      "tree": {
        "A": {
          "B": { "D": {} },
          "C": {}
        }
      },
      "depth": 3
    }
  ],
  "invalid_entries": [],
  "duplicate_edges": [],
  "summary": {
    "total_trees": 1,
    "total_cycles": 0,
    "largest_tree_root": "A"
  }
}
```

## Test Cases

- Valid tree: `["A->B", "A->C", "B->D"]`
- Cycle: `["A->B", "B->C", "C->A"]`
- Invalid entries: `["hello", "A-A", "A->A"]`
- Duplicate edges: `["A->B", "A->B"]`
- Mixed input: `["A->B", "A->B", "B->C", "C->A", "hello"]`
