---
id: error-handling
title: Error Handling
sidebar_label: Error Handling
sidebar_position: 3
---

# Error Handling

All errors are returned as a consistent JSON envelope regardless of the error type.

---

## Error Envelope

```json
{
  "timestamp": "2024-11-25T10:00:00Z",
  "status": 422,
  "error": "Unprocessable Entity",
  "message": "STARTER tier orders cannot exceed 5 seats. Requested: 6"
}
```

| Field | Type | Description |
|---|---|---|
| `timestamp` | ISO-8601 | When the error occurred |
| `status` | integer | HTTP status code |
| `error` | string | HTTP reason phrase |
| `message` | string | Human-readable description |

---

## Error Types

### 400 Bad Request

Returned when the request body fails Bean Validation (`@NotBlank`, `@Min`, `@Max`, etc.).

```json
{
  "timestamp": "2024-11-25T10:00:00Z",
  "status": 400,
  "error": "Bad Request",
  "message": "companyName: Company name is required; seats: must be at least 1"
}
```

Multiple validation failures are concatenated with `; `.

### 404 Not Found

Returned when an order with the given UUID does not exist.

```json
{
  "timestamp": "2024-11-25T10:00:00Z",
  "status": 404,
  "error": "Not Found",
  "message": "Order not found: 3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

### 422 Unprocessable Entity

Returned when the request is structurally valid but violates a business rule.

```json
{
  "timestamp": "2024-11-25T10:00:00Z",
  "status": 422,
  "error": "Unprocessable Entity",
  "message": "Only orders in PENDING_APPROVAL status can be approved. Current status: DRAFT"
}
```

---

## Implementation

Errors are handled centrally in `GlobalExceptionHandler` (`exception/GlobalExceptionHandler.java`), annotated with `@RestControllerAdvice`. Adding a new error type means adding a single `@ExceptionHandler` method there — no changes to controllers or services.

```java
@ExceptionHandler(DomainRuleException.class)
public ResponseEntity<Map<String, Object>> handleDomainRule(DomainRuleException ex) {
    return errorResponse(HttpStatus.UNPROCESSABLE_ENTITY, ex.getMessage());
}
```

---

## Frontend Handling

The React frontend displays backend error messages directly in an error banner (`App.tsx`) and inline in `OrderForm.tsx`. The `ordersApi.ts` client extracts the `message` field from the error envelope and throws it as a standard `Error`.
