---
id: overview
title: API Reference Overview
sidebar_label: Overview
sidebar_position: 0
---

# API Reference

The Order & Subscription Management API is a RESTful HTTP API served by the Spring Boot backend (`techshare-be`).

**Base URL (local):** `http://localhost:8080/api/v1`

---

## Available Resources

| Resource | Base Path | Description |
|---|---|---|
| Orders | `/api/v1/orders` | Create, query, and manage orders |

---

## Authentication

This service does not require authentication in the demo environment. Production deployments should add a bearer token header:

```http
Authorization: Bearer <token>
```

---

## Request & Response Format

All endpoints accept and return **JSON**. Set the `Content-Type` header on write requests:

```http
Content-Type: application/json
```

Timestamps are returned as **ISO-8601 UTC** strings (e.g. `2024-11-25T10:30:00Z`).

---

## Error Responses

All errors follow a consistent envelope:

```json
{
  "timestamp": "2024-11-25T10:30:00Z",
  "status": 422,
  "error": "Unprocessable Entity",
  "message": "STARTER tier orders cannot exceed 5 seats. Requested: 6"
}
```

| Status | Meaning |
|---|---|
| `400` | Validation error (invalid request body) |
| `404` | Resource not found |
| `422` | Domain rule violation |
| `500` | Unexpected server error |

---

## Domain Rules Summary

| Rule | Condition | Effect |
|---|---|---|
| Enterprise approval | `ENTERPRISE` tier + `totalAmount > $10,000` | Order created with `PENDING_APPROVAL` status |
| Starter seat cap | `STARTER` tier + `seats > 5` | Request rejected with `422` |
| Approve guard | `status != PENDING_APPROVAL` | Approve endpoint returns `422` |
