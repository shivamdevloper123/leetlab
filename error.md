
## 🌐 HTTP Status Codes for Web Development

### ✅ 1xx - Informational

| Code | Meaning                | Usage                                      |
|------|------------------------|--------------------------------------------|
| 100  | Continue               | Initial part of request received           |
| 101  | Switching Protocols    | Protocol upgrade (e.g., WebSockets)        |

---

### ✅ 2xx - Success

| Code | Meaning                | Usage                                      |
|------|------------------------|--------------------------------------------|
| 200  | OK                     | Successful GET/POST/PUT/DELETE request     |
| 201  | Created                | Resource successfully created              |
| 204  | No Content             | Success, but no content to return          |

---

### ✅ 3xx - Redirection

| Code | Meaning                | Usage                                      |
|------|------------------------|--------------------------------------------|
| 301  | Moved Permanently      | Resource permanently moved (SEO friendly)  |
| 302  | Found                  | Temporary redirect                         |
| 304  | Not Modified           | Use cached version                         |

---

### ❌ 4xx - Client Error

| Code | Meaning                | Usage                                      |
|------|------------------------|--------------------------------------------|
| 400  | Bad Request            | Invalid request syntax or parameters       |
| 401  | Unauthorized           | Missing or invalid authentication token    |
| 403  | Forbidden              | Authenticated but no permission            |
| 404  | Not Found              | Resource/page not found                    |
| 405  | Method Not Allowed     | HTTP method not allowed                    |
| 409  | Conflict               | Resource conflict (e.g., duplicate entry)  |
| 422  | Unprocessable Entity   | Semantic validation failed                 |

---

### 🚨 5xx - Server Error

| Code | Meaning                | Usage                                      |
|------|------------------------|--------------------------------------------|
| 500  | Internal Server Error  | Generic server error (e.g., exceptions)    |
| 501  | Not Implemented        | Unsupported HTTP method                    |
| 502  | Bad Gateway            | Invalid response from upstream server      |
| 503  | Service Unavailable    | Server down/overloaded (e.g., maintenance) |
| 504  | Gateway Timeout        | Server timeout from another server         |



















































































































