---
id: get-order
title: Get Order
sidebar_label: Get Order
sidebar_position: 2
---

# Get Order

Returns a single order by its UUID.

---

## Endpoint

```http
GET /api/v1/orders/{id}
```

---

## Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | UUID | Yes | The unique identifier of the order |

---

## Response

**HTTP 200 OK**

Returns a single [Order object](./003-order-object.md).

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

**HTTP 404 Not Found**

```json
{
  "timestamp": "2024-11-25T10:00:00Z",
  "status": 404,
  "error": "Not Found",
  "message": "Order not found: 3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

---

## Example

```bash
curl http://localhost:8080/api/v1/orders/3fa85f64-5717-4562-b3fc-2c963f66afa6
```
