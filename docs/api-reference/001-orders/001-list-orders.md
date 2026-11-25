---
id: list-orders
title: List Orders
sidebar_label: List Orders
sidebar_position: 1
---

# List Orders

Returns all orders stored in the service.

---

## Endpoint

```http
GET /api/v1/orders
```

---

## Parameters

No query parameters.

---

## Response

**HTTP 200 OK**

Returns an array of [Order objects](./003-order-object.md). The array may be empty.

```json
[
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
]
```

---

## Example

```bash
curl http://localhost:8080/api/v1/orders
```
