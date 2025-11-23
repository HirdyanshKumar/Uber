# User Routes (Authentication)

This document describes the routes implemented in `backend/routes/user.routes.js`.

Assumption: the router is mounted by the app under a base path (commonly `/users`). If your app uses a different mount point (e.g. `/api/users`), prepend that base path to the example URLs below.

- **Base (example)**: `http://localhost:3000/users`

---

## POST /register

Register a new user.

Request body (JSON):

{
  "fullname": { "firstname": "John", "lastname": "Doe" },
  "email": "john@example.com",
  "password": "secret123"
}

Validation rules:
- `fullname.firstname`: required, minimum 3 characters
- `fullname.lastname`: optional, if provided minimum 3 characters
- `email`: must be a valid email
- `password`: minimum 6 characters

Curl example:

```bash
BASE_URL="http://localhost:3000"
curl -X POST "$BASE_URL/users/register" \
  -H "Content-Type: application/json" \
  -d '{"fullname": {"firstname":"John","lastname":"Doe"}, "email":"john@example.com","password":"secret123"}'
```

Successful response (201):

{
  "user": { /* created user document */ },
  "token": "<jwt_token>"
}

Notes:
- The password is hashed server-side before saving.
- A JWT token is returned in the response body.

---

## POST /login

Authenticate a user and obtain a token.

Request body (JSON):

{
  "email": "john@example.com",
  "password": "secret123"
}

Curl example:

```bash
BASE_URL="http://localhost:3000"
curl -X POST "$BASE_URL/users/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"secret123"}' \
  -i
```

Behavior & response:
- On success, the response sets a cookie named `token` (server uses `res.cookie('token', token)`) and also returns JSON with `{ user, token }`.
- Status: `200` with the user (password is not returned) and token.

Failure responses commonly: `400` (validation errors), `401` (invalid credentials).

---

## GET /profile

Get the logged-in user's profile. This route is protected by `authUser` middleware.

Authentication:
- Provide the JWT either as a cookie (`token`) or in the `Authorization` header as `Bearer <token>`.

Curl examples:

Using `Authorization` header:

```bash
BASE_URL="http://localhost:3000"
curl -X GET "$BASE_URL/users/profile" \
  -H "Authorization: Bearer <jwt_token>"
```

Using cookie (simplified):

```bash
curl -X GET "$BASE_URL/users/profile" \
  -b "token=<jwt_token>"
```

Success response (200): the middleware attaches `req.user` and the controller returns it.

---

## GET /logout

Log the user out by clearing the cookie and blacklisting the token.

Authentication:
- Same as `/profile` — provide token via cookie or `Authorization` header.

Curl example:

```bash
BASE_URL="http://localhost:3000"
curl -X GET "$BASE_URL/users/logout" \
  -H "Authorization: Bearer <jwt_token>" \
  -i
```

Behavior & response:
- The server clears the `token` cookie (calls `res.clearCookie('token')`) and stores the token in a blacklist collection. The blacklisted token prevents reuse until it expires.
- Success response: `200` and `{ "message": "Logged out successfully" }`.

---

## Notes & Environment

- Validation is implemented with `express-validator`; validation errors result in a `400` with `errors` array.
- JWTs are signed using the `JWT_SECRET` environment variable and expire after 1 day (see `user.model.js`). Ensure `JWT_SECRET` is set in your environment.
- The application uses a MongoDB connection specified by `DB_CONNECT` environment variable.
- Blacklist tokens are stored in `blacklistToken` collection; entries expire after 24 hours (see `blacklistToken.modal.js`).

## Troubleshooting

- If auth middleware returns `Invalid token.`: confirm `JWT_SECRET` matches the one used to sign the token, and that the token was sent correctly.
- If you get `Unauthorized` from middleware: the token may be blacklisted (logged out) or missing.

---

If you'd like, I can also:
- Add example Postman collection or JSON file.
- Add small README to repo root linking to this file.
