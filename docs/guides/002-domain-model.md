---
id: domain-model
title: Domain Model
sidebar_label: Domain Model
sidebar_position: 2
---

# Domain Model

The service models a simplified B2B subscription purchase workflow.

---

## Entities

### Order

An `Order` represents a company's intent to purchase a subscription plan.

It captures the **who** (company), **what** (tier + seats), **how much** (total amount), and **where in the lifecycle** (status) the purchase currently sits.

### SubscriptionTier

Three tiers define the product offering:

- **STARTER** — Designed for small teams. Hard capped at **5 seats** to prevent mis-use of the entry-level price point.
- **PRO** — Mid-market. No seat restrictions beyond the global max (10,000).
- **ENTERPRISE** — Full feature set for large organisations. Deals above **$10,000** automatically enter a manual approval workflow to ensure commercial accuracy before fulfilment.

### OrderStatus

The status models a lightweight state machine:

```
                ┌─────────────────┐
   create()     │                 │
  ─────────────►│      DRAFT      │
  (non-enterprise│                 │
   or ≤$10k)   └─────────────────┘

                ┌─────────────────┐    approve()   ┌──────────────┐
   create()     │                 │  ─────────────► │   APPROVED   │
  ─────────────►│PENDING_APPROVAL │                 └──────────────┘
  (enterprise   │                 │
   + >$10k)     └─────────────────┘
```

---

## Business Rules

### Rule 1 — STARTER Seat Cap

```
if tier == STARTER && seats > 5 → DomainRuleException (422)
```

Enforced at creation time in `OrderService.validateBusinessRules()`.

### Rule 2 — Enterprise Approval Threshold

```
if tier == ENTERPRISE && totalAmount > 10,000 → initialStatus = PENDING_APPROVAL
else                                           → initialStatus = DRAFT
```

Enforced in `OrderService.determineInitialStatus()`.

### Rule 3 — Approve Guard

```
if order.status != PENDING_APPROVAL → DomainRuleException (422)
```

Enforced in `OrderService.approve()`.

---

## Where the Rules Live

All business rules are consolidated in `OrderService` (`src/main/java/com/demo/orders/service/OrderService.java`). The controller layer intentionally contains no business logic — it only handles HTTP binding and delegates to the service.
