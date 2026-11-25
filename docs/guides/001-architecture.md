---
id: architecture
title: Architecture Overview
sidebar_label: Architecture
sidebar_position: 1
---

# Architecture Overview

TechShare is a simple two-tier B2B SaaS demo consisting of a Spring Boot backend and a React frontend.

```
┌─────────────────────────────────────────────────────┐
│  Browser                                            │
│  techshare-fe  (React 19 + Vite + Tailwind)        │
└──────────────────────┬──────────────────────────────┘
                       │  HTTP  /api/v1/*
                       │  (Vite proxy in dev)
┌──────────────────────▼──────────────────────────────┐
│  techshare-be  (Spring Boot 3.4 / Java 21)          │
│                                                     │
│  OrderController  →  OrderService  →  ConcurrentHashMap │
│  GlobalExceptionHandler                             │
└─────────────────────────────────────────────────────┘
```

---

## Backend (`techshare-be`)

| Layer | Class | Responsibility |
|---|---|---|
| Controller | `OrderController` | HTTP routing, request binding, response mapping |
| Service | `OrderService` | Business rules, state transitions |
| Domain | `Order`, `OrderStatus`, `SubscriptionTier` | Core entities |
| DTO | `CreateOrderRequest`, `OrderResponse` | API contract, validation |
| Exception | `GlobalExceptionHandler`, `DomainRuleException` | Consistent error envelope |

**Storage:** In-memory `ConcurrentHashMap<UUID, Order>` — no database required. Data resets on restart.

---

## Frontend (`techshare-fe`)

| File | Responsibility |
|---|---|
| `src/api/ordersApi.ts` | Fetch client targeting `/api/v1/orders` |
| `src/components/OrderForm.tsx` | Create-order form with client-side rule hints |
| `src/components/OrderList.tsx` | Orders table with status badges and approve action |
| `src/App.tsx` | State orchestration, error banner |

**Mock mode:** Set `VITE_USE_MOCK=true` in `.env.local` to run the frontend without the backend. The mock replicates the same domain rules in memory.

---

## Communication

The Vite dev server proxies `/api` to `http://localhost:8080`, so the frontend never hardcodes the backend host.

In production, an nginx reverse-proxy or API gateway would handle the routing.
