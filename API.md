# API
## Users
### Register
```
POST /api/users/register
```
#### Request
```typescript
type UsersRegisterRequest = {
    username: string,
    password: string,
}
```

#### Response
```typescript
type UsersRegisterResponse = {
    ok: boolean,
    errorMessage?: "Username already in use" | "Invalid username" | string,
}
```

### Login
```
POST /api/users/login
```
#### Request
```typescript
type UsersRegisterRequest = {
    username: string,
    password: string,
}
```

#### Response
```typescript
type UsersRegisterResponse = {
    ok: boolean,
    errorMessage?: "Invalid username" | "Invalid password" | string,
}
```