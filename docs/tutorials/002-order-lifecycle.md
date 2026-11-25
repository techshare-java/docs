---
id: order-lifecycle
title: Order Lifecycle Walkthrough
sidebar_label: Order Lifecycle
sidebar_position: 2
---

# Order Lifecycle Walkthrough

This tutorial demonstrates every status transition using `curl` commands against the running backend.

---

## 1. Create a DRAFT order

A `PRO` order below the enterprise threshold starts as `DRAFT`:

```bash
curl -s -X POST http://localhost:8080/api/v1/orders \
  -H 'Content-Type: application/json' \
  -d '{
    "companyName": "Small Biz Ltd",
    "tier": "PRO",
    "seats": 10,
    "totalAmount": 2500.00
  }' | jq .
```

```json
{
  "id": "...",
  "companyName": "Small Biz Ltd",
  "tier": "PRO",
  "seats": 10,
  "totalAmount": 2500.00,
  "status": "DRAFT",
  "createdAt": "...",
  "updatedAt": "..."
}
```

---

## 2. Create a PENDING_APPROVAL order

An `ENTERPRISE` order over $10,000 triggers the approval workflow:

```bash
curl -s -X POST http://localhost:8080/api/v1/orders \
  -H 'Content-Type: application/json' \
  -d '{
    "companyName": "BigCo Inc",
    "tier": "ENTERPRISE",
    "seats": 200,
    "totalAmount": 48000.00
  }' | jq .
```

```json
{
  "id": "abc123...",
  "status": "PENDING_APPROVAL",
  ...
}
```

---

## 3. Approve the order

Copy the `id` from the previous response:

```bash
ORDER_ID="abc123..."

curl -s -X PATCH http://localhost:8080/api/v1/orders/$ORDER_ID/approve | jq .
```

```json
{
  "id": "abc123...",
  "status": "APPROVED",
  ...
}
```

---

## 4. Try to approve a DRAFT order (expect 422)

Attempting to approve a `DRAFT` order violates the approve guard:

```bash
DRAFT_ID="..."  # id from step 1

curl -s -X PATCH http://localhost:8080/api/v1/orders/$DRAFT_ID/approve | jq .
```

```json
{
  "status": 422,
  "error": "Unprocessable Entity",
  "message": "Only orders in PENDING_APPROVAL status can be approved. Current status: DRAFT"
}
```

---

## 5. Trigger the STARTER seat cap (expect 422)

```bash
curl -s -X POST http://localhost:8080/api/v1/orders \
  -H 'Content-Type: application/json' \
  -d '{
    "companyName": "Tiny Team",
    "tier": "STARTER",
    "seats": 6,
    "totalAmount": 99.00
  }' | jq .
```

```json
{
  "status": 422,
  "error": "Unprocessable Entity",
  "message": "STARTER tier orders cannot exceed 5 seats. Requested: 6"
}
```
