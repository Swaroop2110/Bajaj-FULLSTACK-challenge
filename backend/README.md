# HierarchyAPI — Hierarchical Node Relationship Processor

## Project Overview

HierarchyAPI is a production-ready full stack application that processes hierarchical node relationships expressed as parent-child edges. It validates input, detects duplicates, prevents multi-parent assignment, detects cycles, builds nested tree models, computes depth, and provides a comprehensive summary response.

## API Documentation

### POST /bfhl

Request body:

```json
{
  "data": ["A->B", "A->C", "B->D"]
}
```

Response:

```json
{
  "user_id": "yourname_ddmmyyyy",
  "email_id": "yourcollege@email.com",
  "college_roll_number": "YOUR_ROLL",
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

## Folder Structure

```
backend/
├── src/
│   ├── config/
│   │   └── env.js
│   ├── controllers/
│   │   └── bfhl.controller.js
│   ├── routes/
│   │   └── bfhl.route.js
│   ├── services/
│   │   ├── validator.js
│   │   ├── duplicateHandler.js
│   │   ├── graphBuilder.js
│   │   ├── cycleDetector.js
│   │   ├── treeBuilder.js
│   │   ├── depthCalculator.js
│   │   └── summaryGenerator.js
│   └── utils/
│       ├── constants.js
│       └── logger.js
├── app.js
├── server.js
├── package.json
├── .env.example
└── README.md
```

## Setup Steps

1. Copy `.env.example` to `.env`
2. Install dependencies:

```bash
cd backend
npm install
```

3. Start the server:

```bash
npm start
```

4. Open `http://localhost:3000` and send POST requests to `/bfhl`.

## Deployment Guide

- Deploy backend to Render or any Node.js hosting provider.
- Configure `PORT` in environment variables.
- Expose `/bfhl` for frontend consumption.

## Example Test Data

- Valid tree: `["A->B", "A->C", "B->D"]`
- Duplicates: `["A->B", "A->B"]`
- Invalid entries: `["hello", "A-A", "A->A"]`
- Cycle: `["A->B", "B->C", "C->A"]`
- Multi-parent filtered: `["A->D", "B->D"]`
