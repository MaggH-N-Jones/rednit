# API
## Users
### Register
```
POST /api/users/register
```
#### Request body
```typescript
type UsersRegisterRequest = {
    username: string,
    password: string,
    name: string,
    age: int,
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
#### Request body
```typescript
type UsersLoginRequest = {
    username: string,
    password: string,
}
```

#### Response
```typescript
type UsersLoginResponse = {
    ok: boolean,
    errorMessage?: "Invalid username" | "Invalid password" | string,
    token?: string;
}
```

## Swiper
### Candidate
```
GET /api/swiper/candidate
```
#### Request query parameters
```typescript
type SwiperCandidateRequest = {
    token: string;
}
```
#### Response
```typescript
type Candidate = {
    id: int,
    picture: string,
    name: string,
    age: int;
}
type SwiperCandidateResponse = {
    ok: boolean,
    errorMessage?: "No Valid Candidates" | "Unauthorized" | string,
    candidate?: Candidate;
}
```
### Match
```
POST /api/swiper/match
```
#### Request body
```typescript
type SwiperMatchRequest = {
    token: string,
    swiped: int; //userID
}
```

#### Response
```typescript
type SwiperMatchResponse = {
    ok: boolean,
    errorMessage?: "Unauthorized" | "Invalid request" | "Unknown user" | string,
}
```
