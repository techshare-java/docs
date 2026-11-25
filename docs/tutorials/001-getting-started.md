---
id: getting-started
title: Getting Started
sidebar_label: Getting Started
sidebar_position: 1
---

# Getting Started

This tutorial walks you through running the full TechShare stack locally in under 5 minutes.

---

## Prerequisites

| Tool | Version | Notes |
|---|---|---|
| Java | 21+ | `java --version` |
| Maven | 3.9+ | `mvn --version` |
| Node.js | 20+ | `node --version` |
| npm | 9+ | `npm --version` |

---

## Step 1 — Clone the repositories

```bash
git clone https://github.com/techshare-java/techshare-be.git
git clone https://github.com/techshare-java/techshare-fe.git
```

---

## Step 2 — Start the backend

```bash
cd techshare-be
mvn spring-boot:run
```

The backend starts on **port 8080**. You should see:

```
Started OrdersApplication in 1.8 seconds
```

---

## Step 3 — Start the frontend

Open a second terminal:

```bash
cd techshare-fe
npm install
npm run dev
```

The frontend starts on **http://localhost:5173**.

The Vite dev server proxies `/api` requests to the backend at `http://localhost:8080` automatically.

---

## Step 4 — Create your first order

Open http://localhost:5173 in your browser.

Fill in the form:
- **Company Name:** `Acme Corp`
- **Tier:** `ENTERPRISE`
- **Seats:** `50`
- **Total:** `15000`

Click **Create Order**. Because the total exceeds $10,000 on an ENTERPRISE tier, the order appears in the list with status **PENDING APPROVAL**.

Click the **Approve** button to transition it to **APPROVED**.

---

## Running without the backend (mock mode)

If you don't want to run the backend, enable mock mode in the frontend:

1. Create a file `techshare-fe/.env.local`:

```bash
VITE_USE_MOCK=true
```

2. Restart `npm run dev`.

The UI now uses an in-memory mock that replicates the same domain rules, with two pre-seeded orders.
