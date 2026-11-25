---
id: create-order
title: Create Order
sidebar_label: Create Order
sidebar_position: 3
---

# Create Order

Creates a new subscription order. Applies domain rules to determine the initial status.

---

## Endpoint

```http
POST /api/v1/orders
```

---

## Request Body

```json
{
  "companyName": "Acme Corp",
  "tier": "ENTERPRISE",
  "seats": 50,
  "totalAmount": 15000.00
}
```

| Field | Type | Required | Constraints | Description |
|---|---|---|---|---|
| `companyName` | string | Yes | Non-blank | The purchasing company name |
| `tier` | enum | Yes | `STARTER`, `PRO`, `ENTERPRISE` | Subscription tier |
| `seats` | integer | Yes | 1–10,000 | Number of licensed seats |
| `totalAmount` | decimal | Yes | > 0 | Order value in USD |

---

## Domain Rules

| Condition | Result |
|---|---|
| `tier=ENTERPRISE` and `totalAmount > 10,000` | Order status set to `PENDING_APPROVAL` |
| Any other combination | Order status set to `DRAFT` |
| `tier=STARTER` and `seats > 5` | Request rejected — `422 Unprocessable Entity` |

---

## Response

**HTTP 201 Created**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "companyName": "Acme Corp",
  "tier": "ENTERPRISE",
  "seats": 50,
  "totalAmount": 15000.00,
  "status": "PENDING_APPROVAL",
  "createdAt": "2024-11-25T09:00:00Z",
  "updatedAt": "2024-11-25T09:00:00Z"
}
```

**HTTP 400 Bad Request** — validation failure

```json
{
  "timestamp": "2024-11-25T09:00:00Z",
  "status": 400,
  "error": "Bad Request",
  "message": "seats: must be at least 1"
}
```

**HTTP 422 Unprocessable Entity** — domain rule violation

```json
{
  "timestamp": "2024-11-25T09:00:00Z",
  "status": 422,
  "error": "Unprocessable Entity",
  "message": "STARTER tier orders cannot exceed 5 seats. Requested: 6"
}
```

---

## Example

```bash
curl -X POST http://localhost:8080/api/v1/orders \
  -H 'Content-Type: application/json' \
  -d '{
    "companyName": "Acme Corp",
    "tier": "ENTERPRISE",
    "seats": 50,
    "totalAmount": 15000.00
  }'
```
