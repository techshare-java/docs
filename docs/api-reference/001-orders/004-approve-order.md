---
id: approve-order
title: Approve Order
sidebar_label: Approve Order
sidebar_position: 4
---

# Approve Order

Transitions a `PENDING_APPROVAL` order to `APPROVED` status.

---

## Endpoint

```http
PATCH /api/v1/orders/{id}/approve
```

---

## Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | UUID | Yes | The unique identifier of the order to approve |

---

## Domain Rules

Only orders in `PENDING_APPROVAL` status can be approved. Attempting to approve an order in any other status returns `422`.

---

## Response

**HTTP 200 OK**

Returns the updated order with `status: "APPROVED"`.

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "companyName": "Acme Corp",
  "tier": "ENTERPRISE",
  "seats": 50,
  "totalAmount": 15000.00,
  "status": "APPROVED",
  "createdAt": "2024-11-25T09:00:00Z",
  "updatedAt": "2024-11-25T09:15:00Z"
}
```

**HTTP 422 Unprocessable Entity** — wrong status

```json
{
  "timestamp": "2024-11-25T09:15:00Z",
  "status": 422,
  "error": "Unprocessable Entity",
  "message": "Only orders in PENDING_APPROVAL status can be approved. Current status: DRAFT"
}
```

**HTTP 404 Not Found** — unknown order ID

---

## Example

```bash
curl -X PATCH http://localhost:8080/api/v1/orders/3fa85f64-5717-4562-b3fc-2c963f66afa6/approve
```
