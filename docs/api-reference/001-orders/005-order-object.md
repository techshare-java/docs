---
id: order-object
title: Order Object
sidebar_label: Order Object
sidebar_position: 5
---

# Order Object

The `Order` is the central domain entity of this service.

---

## Schema

| Field | Type | Description |
|---|---|---|
| `id` | UUID | Unique identifier, assigned on creation |
| `companyName` | string | Name of the purchasing company |
| `tier` | `SubscriptionTier` | Subscription plan level |
| `seats` | integer | Number of licensed seats |
| `totalAmount` | decimal | Total order value in USD |
| `status` | `OrderStatus` | Current lifecycle state |
| `createdAt` | ISO-8601 timestamp | When the order was created |
| `updatedAt` | ISO-8601 timestamp | When the order was last modified |

---

## SubscriptionTier

| Value | Description |
|---|---|
| `STARTER` | Entry-level plan, capped at 5 seats |
| `PRO` | Mid-tier plan, standard limits |
| `ENTERPRISE` | Full-featured plan; large deals require approval |

---

## OrderStatus

| Value | Description |
|---|---|
| `DRAFT` | Newly created, no action required |
| `PENDING_APPROVAL` | Awaiting manual review before activation |
| `APPROVED` | Approved and ready for fulfillment |
| `CANCELLED` | Order has been cancelled |

---

## Status Transitions

```
DRAFT ──────────────────────────────► (terminal, no transitions in v1)
PENDING_APPROVAL ──► APPROVED
PENDING_APPROVAL ──► CANCELLED  (future)
```

:::info
In v1 only the `PENDING_APPROVAL → APPROVED` transition is supported via the [Approve Order](./004-approve-order.md) endpoint.
:::
